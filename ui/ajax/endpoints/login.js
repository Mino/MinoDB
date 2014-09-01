var logger = require('tracer').console();
var errors = require('../../../errors');
var User = require('../../../api/models/User')

var FieldVal = require("fieldval");
var bval = require("fieldval-basicval");
var check_password_hash = require('../check_password_hash');

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
	        res.send(JSON.stringify(error));
	        return;
	    }


	    if(username){
		    User.get(username, api, function(error,user_record){
		    	logger.log(error);
		    	logger.log(user_record);
		        if(!user_record){
		            validator.invalid("username_or_email",errors.USER_DOES_NOT_EXIST);
		            res.send(JSON.stringify(validator.end()));
		            return;
		        } else {
		        	check_password_hash(
		        		body.password,
		        		user_record.password_salt,
		        		user_record.password_hash,
		        		function(is_correct){
		        			logger.log("PASSWORD IS: ",is_correct);
		                    if(is_correct){
		                        req.session.user_id = user_record.id;

		                        var response_object = {
		                            user: user_record,
		                            success: true
		                        }

		                        res.json(response_object);
		                        return;
		                    } else {
		                        validator.invalid("password",errors.INCORRECT_PASSWORD);
		                        res.json(validator.end());
		                        return;
		                    }
		        		}
		        	)
		        }
		    })
		}
	}
}