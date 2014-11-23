var logger = require('tracer').console();
var errors = require('../../../../errors');
var User = require('../../../core/models/User')

var FieldVal = require("fieldval");
var bval = require("fieldval-basicval");
var check_password_hash = require('../check_password_hash');

var Session = require('../../models/Session');

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


	    if(username){
		    User.get(username, api, function(error,user_record){
		    	logger.log(error);
		    	logger.log(user_record);
		        if(!user_record){
		            validator.invalid("username_or_email",errors.USER_DOES_NOT_EXIST);
		            res.json(validator.end());
		            return;
		        } else {
		        	check_password_hash(
		        		body.password,
		        		user_record.password_salt,
		        		user_record.salted_password,
		        		function(is_correct){
		        			logger.log("PASSWORD IS: ",is_correct);
		                    if(is_correct){
		                    	//TODO: KEY GENERATION
		                    	var key = ""+Math.random()+Math.random()+Math.random()+Math.random();
		                    	Session.create({
		                    		username: username,
		                    		key: key
		                    	}, api, function(session_err,session_res){
		                    		logger.log(
		                    			JSON.stringify(session_err,null,4),
		                    			session_res
		                    		);

		                    		var response_object = {
			                            user: user_record,
			                            success: true
			                        }

			                        res.cookie('mino_token', session_res.objects[0]._id+"-"+key, {
							            maxAge: 60 * 60 * 24 * 365,
							            httpOnly: false
							        });

			                        res.json(response_object);
		                    	})
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