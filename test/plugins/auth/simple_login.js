var logger = require('tracer').console();
var assert = require('assert');
var express = require('express');
var globals = require('../../globals');
var errors = require('../../../errors');

describe("simple_login", function() {

	it("should return a user and a session when password matches", function(done) {
		var auth = globals.mino.get_plugin('mino_auth');
		
		var object = {
			username: "otheruser",
			password: "my_password"
		}

		auth.login(object, function(err, user, session) {
			logger.log(JSON.stringify(err, null, 4));
			logger.log(JSON.stringify(user, null, 4));
			logger.log(JSON.stringify(session, null, 4));
			assert.equal(err, null);
			assert.equal(user.username, "otheruser");

			auth.get_user('mino_user.username', 'otheruser', function(err, user) {
				assert.equal(session.mino_session.user_id, user._id);
				done();	
			})
		});
	})

	it("should return an error when user does not exist", function(done) {
		var auth = globals.mino.get_plugin('mino_auth');
		
		var object = {
			username: "nonexistant_user",
			password: "my_password"
		}

		auth.login(object, function(err, res) {
			logger.log(JSON.stringify(err, null, 4));
			logger.log(JSON.stringify(res, null, 4));
			assert.equal(err, errors.USER_DOES_NOT_EXIST);
			done();
		});
	})
		
	it("should return an error when password is invalid", function(done) {
		var auth = globals.mino.get_plugin('mino_auth');
		
		var object = {
			username: "otheruser",
			password: "incorrect_password"
		}

		auth.login(object, function(err, res) {
			logger.log(JSON.stringify(err, null, 4));
			logger.log(JSON.stringify(res, null, 4));
			assert.deepEqual(err, errors.INCORRECT_PASSWORD);
			done();
		});
	})
})
