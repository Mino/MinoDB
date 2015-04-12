var logger = require('mino-logger');
var assert = require('assert');
var express = require('express');
var globals = require('../../../globals');
var request = require('supertest');

describe("custom auth", function() {

	var server = express();

	before(function(done) {
		var setup = require('./setup');
		setup(server, globals.mino, function() {
			done();
		})
		
	})

	it('should return 401 with no session', function(done) {
		var agent = request.agent(server);
		agent
			.get('/')
			.expect(401)
			.end(function(err, res) {
				logger.debug(err,res);
				assert.equal(err,null);
				done();
			})
	})

	it('should sign in', function(done) {
		var agent = request.agent(server);
		agent
			.post('/login')
			.send({my_username: "some_user", my_password: "some_password"})
			.expect(200)
			.end(function(err,res) {
				logger.debug(err, res);
				assert.equal(err, null);
				
				agent
					.get('/')
					.expect(200)
					.end(function(err, res) {
						assert.equal(err, null);
						assert.equal(res.text, "some_user");
						done();
					})
			})
	})	

})