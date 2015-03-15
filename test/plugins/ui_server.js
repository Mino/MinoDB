var logger = require('tracer').console();
var assert = require('assert');
var express = require('express');

var globals = require('../globals');
var request_plugin_config = require('./request_plugin_config');
var request = require('supertest');

describe("UI plugin", function() {
	it("should retrieve config server", function(done) {
		var test_server = express()
		test_server.use("/mino/", globals.mino.server());
		request_plugin_config("ui", test_server, function(err, res) {
			assert.equal(err, null);
			assert.equal(res, "UI CONFIG");
			done();
		})
	})

	it("should return user object if credentials are correct", function(done) {
		var server = express();
		server.use('/mino/', globals.mino.server());
		var agent = request.agent(server);
		agent
			.post('/mino/ajax/login')
			.send({username_or_email: 'testuser', password: 'my_password'})
			.expect(200)
			.end(function(err, res) {
				logger.log(JSON.stringify(res.body, null, 4));
				assert.equal(err, null);
				assert.notEqual(res.body.user, undefined);
				assert.equal(res.body.user.username, 'testuser');
				done();
			});
	})

	it("should return error if user does not exist", function(done) {
		var server = express();
		server.use('/mino/', globals.mino.server());
		var agent = request.agent(server);
		agent
			.post('/mino/ajax/login')
			.send({username_or_email: 'nonexistent_user', password: 'incorrect_password'})
			.expect(200)
			.end(function(err, res) {
				logger.log(JSON.stringify(res.body, null, 4));
				assert.equal(err, null);
				assert.deepEqual(res.body, {
				    "invalid": {
				        "username_or_email": {
				            "error": 76,
				            "error_message": "User does not exist."
				        }
				    },
				    "error_message": "One or more errors.",
				    "error": 5
				})
				done();
			});
	})

	it("should return error if password is incorrect", function(done) {
		var server = express();
		server.use('/mino/', globals.mino.server());
		var agent = request.agent(server);
		agent
			.post('/mino/ajax/login')
			.send({username_or_email: 'testuser', password: 'incorrect_password'})
			.expect(200)
			.end(function(err, res) {
				logger.log(JSON.stringify(res.body, null, 4));
				assert.equal(err, null);
				assert.deepEqual(res.body, {
				    "invalid": {
				        "password": {
				            "error": 177,
				            "error_message": "Incorrect password."
				        }
				    },
				    "error_message": "One or more errors.",
				    "error": 5
				})
				done();
			});
	})
})