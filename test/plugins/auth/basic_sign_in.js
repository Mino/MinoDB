var logger = require('tracer').console();
var assert = require('assert');
var express = require('express');
var globals = require('../../globals');

describe("basic_sign_in()", function() {

	it("should return a user and a session when password matches", function(done) {
		var auth = globals.mino.get_plugin('minodb_auth');
		
		var object = {
			username: "otheruser",
			password: "my_password"
		}

		auth.sign_in(object, function(err, user, session) {
			logger.log(JSON.stringify(err, null, 4));
			logger.log(JSON.stringify(user, null, 4));
			logger.log(JSON.stringify(session, null, 4));
			assert.equal(err, null);
			assert.equal(user.username, "otheruser");

			auth.get_user('minodb_user.username', 'otheruser', function(err, user) {
				assert.equal(session.user_id, user._id);
				done();	
			})
		});
	})

	it("should return an error when user does not exist", function(done) {
		var auth = globals.mino.get_plugin('minodb_auth');
		
		var object = {
			username: "nonexistant_user",
			password: "my_password"
		}

		auth.sign_in(object, function(err, res) {
			logger.log(JSON.stringify(err, null, 4));
			logger.log(JSON.stringify(res, null, 4));
			assert.deepEqual(err, {
				invalid: {
					username: {
						error: 76,
						error_message: "User does not exist."
					}
				},
				error: 5,
				error_message: "One or more errors."
			});
			done();
		});
	})
		
	it("should return an error when password is invalid", function(done) {
		var auth = globals.mino.get_plugin('minodb_auth');
		
		var object = {
			username: "otheruser",
			password: "incorrect_password"
		}

		auth.sign_in(object, function(err, res) {
			logger.log(JSON.stringify(err, null, 4));
			logger.log(JSON.stringify(res, null, 4));
			assert.deepEqual(err, {
				invalid: {
					password: {
						error: 177,
						error_message: "Incorrect password."
					}	
				},
				error: 5,
				error_message: "One or more errors."
			});
			done();
		});
	})

	it("should return an error when password is empty", function(done) {
		var auth = globals.mino.get_plugin('minodb_auth');
		
		var object = {
			username: "otheruser"
		}

		auth.sign_in(object, function(err, res) {
			logger.log(JSON.stringify(err, null, 4));
			logger.log(JSON.stringify(res, null, 4));
			assert.deepEqual(err, {
				invalid: {
					password: {
						error: 1,
						error_message: "Field missing."
					}	
				},
				error: 5,
				error_message: "One or more errors."
			});
			done();
		});
	})
})
