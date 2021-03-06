var logger = require('mino-logger');
var errors = require('../../../../errors');
var User = require('../../../core/models/User')

var FieldVal = require("fieldval");
var bval = FieldVal.BasicVal;

module.exports = function(ui_server){
	
	return function(req,res){

		var api = ui_server.minodb.api;

	    var body = req.body;

	    var validator = new FieldVal(body);
	    var username,email;
	    validator.get("username_or_email", bval.string(true), bval.multiple([
	    	[bval.email(),function(value){
	    		email = value;
	    	}]
	    	,
	    	[User.username_validator,function(value){
	    		username = value;
	    	}]
	    ],{
	    	error: errors.NOT_EMAIL_OR_USERNAME	
	    }));
		validator.get("password", bval.string(true), bval.min_length(8));
	    var error = validator.end();
	    if(error){
	        res.json(error);
	        return;
	    }

    	var minodb_auth = api.minodb.get_plugin("minodb_auth");
    	
    	var identifier = username ? "username" : "email";
    	var minodb_identifier = username ? "minodb_user.username" : "minodb_user.email";
    	var options = {
    		identifier: identifier,
    		minodb_identifier: minodb_identifier
    	}

    	var value = username ? username : email;
    	var login_body = {}
    	login_body[identifier] = value;
    	login_body.password = body.password;

    	minodb_auth.sign_in(login_body, options, function(err, user_record, session) {
    		logger.debug('FERROR', err);
    		if (err) {
    			if (err.invalid) {
    				if (err.invalid.username) {
	    				var key_error = err.invalid.username;
	    				delete err.invalid.username;
	    				err.invalid.username_or_email = key_error;
	    			} else if (err.invalid.email) {
	    				var key_error = err.invalid.email;
	    				delete err.invalid.email;
	    				err.invalid.username_or_email = key_error;
	    			}
    			}
    			return res.json(err);
    		} else if (!user_record) {
    			return res.json(validator.end());
    		} else {
				var response_object = {
		            user: user_record.minodb_user,
		            success: true
		        }

		        minodb_auth.persist_session(res, session);
		        res.json(response_object);
    		}
	        				
    	})
	}
}