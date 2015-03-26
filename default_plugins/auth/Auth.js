var logger = require('tracer').console();
var crypto = require('crypto');
var express = require('express');
var FieldVal = require('fieldval');
var errors = require('../../errors');

var cookie = require('cookie');


var User = require('../../MinoDB/core/models/User');
var Session = require('./models/Session');

function Auth(options) {
	var auth = this;
	options = options || {};

	auth.user_path = options.user_path;
	if (!auth.user_path) {
		throw "Plugin requires user_path to be specified in options"
	}

	auth.session_path = options.session_path;
	if (!auth.session_path) {
		throw "Plugin requires session_path to be specified in options"
	}

	auth.cookie_name = options.cookie_name;
	if (!auth.cookie_name) {
		throw "Plugin requires cookie_name to be specified in options"
	}

	auth.username = options.username;
	if (!auth.cookie_name) {
		throw "Plugin requires username to be specified in options"
	}

	auth.name = options.name || "auth";
	auth.display_name = options.display_name || "Auth";

	auth.config_server = express();
	auth.config_server.get("/", function(req, res) {
		res.send(auth.display_name + " config server");
	})
}

Auth.prototype.get_config_server = function(){
    var auth = this;
    return auth.config_server;
}

Auth.prototype.info = function(){
    var auth = this;

    return {
        name: auth.name,
        display_name: auth.display_name
    };
}

Auth.prototype.init = function(minodb){
    var auth = this;
    auth.minodb = minodb;
}

Auth.prototype.check_password_hash = function(password,salt,correct_hash_64,callback){
	logger.log(arguments);
    crypto.pbkdf2(password, salt, 32, 32, function(err, hash_binary) {
    	var hash = new Buffer(hash_binary, 'binary').toString('base64');
    	logger.log("output hash: ",hash);
    	callback(hash===correct_hash_64);
    });
}

Auth.prototype.basic_sign_in = function(object, options, callback) {
	var auth = this;

    if (arguments.length == 2) {
        callback = options;
        options = undefined;
    }

    options = options || {};

    var minodb_identifier = options.minodb_identifier || "mino_user.username";
    var identifier = options.identifier || "username";
    var identifier_value = object[identifier];

    var password = object.password;

    auth.get_user(minodb_identifier, identifier_value, function(error,user_object){
    	
        if (error) {
            var object_error = new FieldVal(null).invalid(identifier, error).end();
            callback(object_error);
            return;
        }

        var user_record = user_object.mino_user;
    	auth.check_password_hash(
    		password,
    		user_record.password_salt,
    		user_record.salted_password,
    		function(is_correct){
                if(is_correct){
                    logger.log(user_object);
                	auth.create_session(user_object._id, function(session_err,session_res){
                		logger.log(
                			JSON.stringify(session_err,null,4),
                			session_res
                		);
                		callback(null, user_record, session_res);

                	})
                } else {
                    var error = new FieldVal(null).invalid("password", errors.INCORRECT_PASSWORD).end()
                    callback(error);
                    return;
                }

    		}
		);

    });
}

Auth.prototype.sign_in = Auth.prototype.basic_sign_in;

Auth.prototype.create_user = function(object, callback) {
	var auth = this;
    //

	logger.log(auth.minodb.api.ds);
    var options = {
        path: auth.user_path,
        mino_username: auth.username
    }
	User.create(object, auth.minodb.api, options, callback);
}

Auth.prototype.get_user = function(identifier, value, callback) {
	var auth = this;

    var query = {}
    query[identifier] = value;
    logger.log(query);
    auth.minodb.with_user(auth.username).call({
        "function": "search",
        "parameters": {
            "paths": [auth.user_path],
            "query": query
        }
    }, function(err, res) {
        logger.log(JSON.stringify(err, null, 4), res);
        if (res.objects[0]) {
            callback(null, res.objects[0]);
            return;
        }
        callback(errors.USER_DOES_NOT_EXIST, null);
    })

}

Auth.prototype.create_session = function(user_id, callback) {
	var auth = this;

    //TODO improve key generation
	var data = {
        user_id : user_id,
        key: ""+Math.random()+Math.random()+Math.random()+Math.random()
    }

    var options = {
        path: auth.session_path, 
        mino_username: auth.username
    }

	Session.create(data, auth.minodb.api, options, callback);
}

Auth.prototype.get_session = function(value, callback) {
	var auth = this;
    var options = {
        path: auth.session_path, 
        mino_username: auth.username
    }

	Session.get(value, auth.minodb.api, options, callback);
}

Auth.prototype.persist_session = function(res, session) {
	var auth = this;

	//mino_token, id-key
	logger.log(session);
    res.cookie(auth.cookie_name, session.id+"-"+session.key, {
        maxAge: 60 * 60 * 24 * 365,
        httpOnly: false
    });

}

Auth.prototype.process_session_failed = function(req, res, next, options) {
	var auth = this;
	if (options.required) {
		res.send(401);
	} else {
		next();
	}
}

Auth.prototype.process_session = function(options) {
	var auth = this;
	options = options || {};

	return function(req, res, next) {

        var cookies = cookie.parse(req.headers.cookie);
    	var current_token = cookies[auth.cookie_name];
    	if(!current_token){
    		logger.log("A");
    		auth.process_session_failed(req, res, next, options);
    		return;
    	}

    	var split = current_token.split("-");
    	if(split.length!==2){
    		logger.log("B");
    		auth.process_session_failed(req, res, next, options);
    		return;
    	}

    	var id = split[0];
    	var key = split[1];

    	auth.get_session(id, function(err, session) {
    		logger.log(err, session);
        	if(session && session.key && session.key===key){
        		
                auth.get_user("_id", session.user_id, function(err, user) {
                    req.user = user;
                    logger.log("SIGNED IN AS ",req.user)
                    logger.log("C");
                    next();
                })

			} else {
                auth.process_session_failed(req, res, next, options);
            }

    	})
	}
}

Auth.prototype.sign_out = function(res) {
    var auth = this;
    res.clearCookie(auth.cookie_name, {
        path: '/'
    });
}

module.exports = Auth;