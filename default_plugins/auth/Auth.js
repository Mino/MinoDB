var logger = require('mino-logger');
var crypto = require('crypto');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var FieldVal = require('fieldval');
var BasicVal = FieldVal.BasicVal;
var errors = require('../../errors');

var mustacheExpress = require('mustache-express');

var cookie = require('cookie');
var errorHandler = require('errorhandler');
var http = require('http');
var path = require('path');


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
	if (!auth.username) {
		throw "Plugin requires username to be specified in options"
	}

	auth.name = options.name || "auth";
	auth.display_name = options.display_name || "Auth";
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

    auth.minodb_auth = minodb.get_plugin("minodb_auth");

    auth.config_server = express();
    auth.config_server.disable('etag');//Prevents 304s
    auth.config_server.engine('mustache', mustacheExpress());
    auth.config_server.set('views', path.join(__dirname, 'views'));
    auth.config_server.set('view engine', 'mustache');
    auth.config_server.use(cookieParser());
    auth.config_server.use(bodyParser.json());
    auth.config_server.use(express.static(path.join(__dirname, 'admin')));
    require('./admin_ajax/routes').add_routes(auth);
    auth.config_server.get('*', auth.minodb_auth.process_session({required: true}), function(req, res) {
        var site_path = path.join(req.mino_path,"/admin/plugin_config/",auth.info().name+"/");
        var minodb_user = null;
        if (req.user) {
            minodb_user = req.user.minodb_user;
        }
        res.render('auth_admin', {
            custom_fields: JSON.stringify(auth.minodb.custom_fields),
            site_path: site_path,
            mino_path: req.mino_path,
            user: JSON.stringify(minodb_user)
        });
    })
}

Auth.prototype.check_password_hash = function(password,salt,correct_hash_64,callback){
	logger.debug(arguments);
    crypto.pbkdf2(password, salt, 32, 32, function(err, hash_binary) {
    	var hash = new Buffer(hash_binary, 'binary').toString('base64');
    	logger.debug("output hash: ",hash);
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

    var minodb_identifier = options.minodb_identifier || "minodb_user.username";
    var identifier = options.identifier || "username";

    var validator = new FieldVal(object);
    var identifier_value = validator.get(identifier, BasicVal.required(true));
    var password = validator.get('password', BasicVal.string());
    var error = validator.end();
    if (error) {
        callback(error);
        return;
    }

    auth.get_user(minodb_identifier, identifier_value, function(error,user_object){
    	
        if (error) {
            var object_error = new FieldVal(null).invalid(identifier, error).end();
            callback(object_error);
            return;
        }

    	auth.check_password_hash(
    		password,
    		auth.get_password_salt_from_user_object(user_object),
    		auth.get_salted_password_from_user_object(user_object),
    		function(is_correct){
                if(is_correct){
                    logger.debug(user_object);
                	auth.create_session(auth.get_identifier_from_user(user_object), function(session_err,session_res){
                		logger.debug(
                			JSON.stringify(session_err,null,4),
                			session_res
                		);
                		callback(null, user_object, session_res);

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

Auth.prototype.get_salted_password_from_user_object = function(user_object) {
    return user_object.minodb_user.salted_password;
}

Auth.prototype.get_password_salt_from_user_object = function(user_object) {
    return user_object.minodb_user.password_salt;
}

Auth.prototype.get_identifier_from_user = function(user) {
    return user._id;
}

Auth.prototype.sign_in = Auth.prototype.basic_sign_in;

Auth.prototype.create_user = function(object, callback) {
	var auth = this;
	logger.debug(auth.minodb.api.ds);

    User.validate(object, function(error) {
        logger.debug(error);
        if(error){
            callback(error,null);
            return;
        }

        var user = new User({
            path: auth.user_path,
            minodb_user: object
        });
        
        var options = {
            minodb_username: auth.username
        }

        user.save(auth.minodb.api, options, function(err, res){

            logger.debug(JSON.stringify(err,null,4), res);
            callback(err, res);

        });
    });
}

Auth.prototype.get_user = function(identifier, value, callback) {
	var auth = this;
    auth.get_users(identifier, [value], function(err, res) {
        logger.debug(err, res);
        if (err) {
            callback(err);
        } else {
            callback(null, res[0]);
        }
    });
}

Auth.prototype.get_users = function(identifier, values, callback) {
    var auth = this;

    var query = {}
    query[identifier] = {
        "$in": values
    }
    logger.debug(query);

    auth.minodb.with_user(auth.username).call({
        "function": "search",
        "parameters": {
            "paths": [auth.user_path],
            "query": query
        }
    }, function(err, res) {
        logger.debug(JSON.stringify(err, null, 4), res);
        if (values.length == 1 && res.objects[0] == null) {
            callback(errors.USER_DOES_NOT_EXIST, null);
            return;
        }

        callback(null, res.objects);
    })

}

Auth.prototype.create_session = function(user_id, callback) {
	var auth = this;

    //TODO improve key generation
	var data = {
        user_id : user_id,
        key: ""+Math.random()+Math.random()+Math.random()+Math.random(),
        end_time: null
    }

    var options = {
        path: auth.session_path, 
        minodb_username: auth.username
    }

	Session.create(data, auth.minodb.api, options, callback);
}

Auth.prototype.get_session = function(value, callback) {
	var auth = this;
    var options = {
        path: auth.session_path, 
        minodb_username: auth.username
    }

	Session.get(value, auth.minodb.api, options, callback);
}

Auth.prototype.persist_session = function(res, session) {
	var auth = this;

	//mino_token, id-key
	logger.debug(session);
    res.cookie(auth.cookie_name, session.id+"-"+session.key, {
        maxAge: 60 * 60 * 24 * 365,
        httpOnly: false
    });

}

Auth.prototype.process_session_failed = function(req, res, next, options) {
	var auth = this;
	if (options.required) {
		res.sendStatus(401);
	} else {
		next();
	}
}

Auth.prototype.process_session = function(options) {
	var auth = this;
	options = options || {};

	return function(req, res, next) {

        if (!req.headers.cookie) {
            auth.process_session_failed(req, res, next, options);
            return;
        }

        var cookies = cookie.parse(req.headers.cookie);
    	var current_token = cookies[auth.cookie_name];
    	if(!current_token){
    		logger.debug("A");
    		auth.process_session_failed(req, res, next, options);
    		return;
    	}

    	var split = current_token.split("-");
    	if(split.length!==2){
    		logger.debug("B");
    		auth.process_session_failed(req, res, next, options);
    		return;
    	}

    	var id = split[0];
    	var key = split[1];

    	auth.get_session(id, function(err, session) {
    		logger.debug(err, session);

            if (!session) {
                auth.process_session_failed(req, res, next, options);
                return;
            }

            if (!session.key || session.key !== key) {
                auth.process_session_failed(req, res, next, options);
                return;   
            }

            if (session.end_time && session.end_time < new Date().getTime()) {
                auth.process_session_failed(req, res, next, options);
                return;      
            }
            auth.get_user("_id", session.user_id, function(err, user) {
                req.user = user;
                logger.debug("SIGNED IN AS ",req.user)
                logger.debug("C");
                next();
            })

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