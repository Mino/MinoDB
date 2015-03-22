var logger = require('tracer').console();
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

    	var mino_auth = api.minodb.get_plugin("mino_auth");
    	
    	var identifier = username ? "username" : "email";
    	var minodb_identifier = username ? "mino_user.username" : "mino_user.email";
    	var options = {
    		identifier: identifier,
    		minodb_identifier: minodb_identifier
    	}

    	var value = username ? username : email;
    	var login_body = {}
    	login_body[identifier] = value;
    	login_body.password = body.password;

    	mino_auth.login(login_body, options, function(err, user_record, session) {
    		if (err) {
    			if (err == errors.INCORRECT_PASSWORD) {
    				validator.invalid("password", err);
    			} else {
    				validator.invalid("username_or_email", err);
    			}
    			return res.json(validator.end());
    		} else if (!user_record) {
    			return res.json(validator.end());
    		} else {
				var response_object = {
		            user: user_record,
		            success: true
		        }

		        mino_auth.persist_session(res, session, 'mino_token');
		        res.json(response_object);
    		}
	        				
    	})
	}
}