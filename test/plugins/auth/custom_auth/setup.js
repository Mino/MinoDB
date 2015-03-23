var logger = require('tracer').console();
var assert = require('assert');
var MinoDB = require('../../../../MinoDB/MinoDB');
var errors = require('../../../../errors');
var my_user_rule = require('./my_user_rule');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var FieldVal = require('fieldval');
var BasicVal = FieldVal.BasicVal;

module.exports = function(server, mino, callback) {
	var MinoAuth = MinoDB.Auth;
	var auth = new MinoAuth({
		name: "custom_auth",
		display_name: "Custom auth",
		user_path: "/testuser/users/",
		session_path: "/testuser/sessions/",
		cookie_name: "custom_auth_token",
		username: "testuser"
	})

	server.use(cookieParser());
	server.use(bodyParser());

	server.post('/login', function(req, res) {
		logger.log(req.body);
		auth.sign_in(req.body, {identifier: "my_username"}, function(err, user, session) {
			if (err) {
				var validator = new FieldVal(null);
				if (err.error == 117) {
					validator.invalid("my_password", err)
				} else {
					validator.invalid("my_username", err)
				}
				return res.json(validator.end());
			} else if (user){
				auth.persist_session(res, session);
				res.json({success:true});	
			} else {
				res.json({success: false});
			}
		})

	});

	server.post('/sign_out', function(req, res) {
		auth.sign_out(res);
		res.json({success:true});
	})

	server.get('/', auth.process_session({required:true}), function(req,res) {
		res.send(req.user.my_user.my_username);
	});

	auth.create_user = function(object, callback) {
		var auth = this;
		var validator = new FieldVal(object);
		validator.get("my_username", BasicVal.string());
		validator.get("my_password", BasicVal.string());
		var error = validator.end();
		if (error) {
			callback(err);
		} else {
			mino.save([
		        {  
		            "name": object.my_username,
		            "path": auth.user_path,
		            "my_user": object
		        }
			], function(save_err, save_res){
			    logger.log(save_err, save_res);
			    callback(save_err, save_res);
			})		
		}
	}

	auth.sign_in = function(object, options, callback) {
		var auth = this;
	    auth.get_user("my_user.my_username", object.my_username, function(error,user_record){
	    	if (error) {
	    		callback(error);
	    	} else if (!user_record) {
	    		callback(null, null);
	    	} else if (user_record) {
	    		logger.log(user_record, object);
	    		if (user_record.my_user.my_password == object.my_password) {

	    			auth.create_session(user_record._id, function(session_err,session_res){
	    				logger.log(
	    					JSON.stringify(session_err,null,4),
	    					session_res
	    				);
	    				callback(null, user_record, session_res);

	    			})

	    		} else {
	    			callback({error: 117, error_message: "Incorrect password"});
	    			return;
	    		}

	    	}
	    });
	}

	mino.add_plugin(auth);
	server.use('/mino/', mino.server());

	mino.save_type(my_user_rule, function(err, res) {
		assert.equal(err, null);
		mino.save([
			{
				name: "users",
				path: "/testuser/",
				folder:true
			},
			{
				name: "sessions",
				path: "/testuser/",
				folder:true
			},
		], function(err, res) {
			assert.equal(err, null);
			auth.create_user({
				my_username: "some_user",
				my_password: "some_password"
			}, function(err, res) {
				assert.equal(err, null);
				callback();
			});
		})
	})
}