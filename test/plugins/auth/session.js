var logger = require('mino-logger');
var assert = require('assert');
var express = require('express');
var globals = require('../../globals');
var request = require('supertest');
var cookieParser = require('cookie-parser');

describe("session", function() {

	var server, auth;
	before(function() {
		server = express();
		auth = globals.mino.get_plugin('minodb_auth');
		
		server.use(cookieParser());
		server.use('/mino/', globals.mino.server());
		server.use(auth.process_session({required: false}));
		
	});

	describe('create_session()', function() {

		it("should create a session object", function(done) {
			var auth = globals.mino.get_plugin('minodb_auth');
			
			var user_id = "10";
			auth.create_session(user_id, function(err, session) {
				assert.equal(err, null);
				assert.equal(session.user_id, user_id);
				done();
			});
		});

	});

	describe('get_session()', function() {
		
		it('should get a session by id', function(done) {
			var auth = globals.mino.get_plugin('minodb_auth');

			auth.create_session("12", function(err, session) {
				assert.equal(err, null);
				auth.get_session(session.id, function(err, get_session) {
					assert.deepEqual(session, get_session);
					done();
				});
			});
		});
		
	});



	it('should persist and process session', function(done) {
		server.get('/test_process_session', function(req,res) {
			assert.notEqual(req.user, undefined);
			assert.equal(req.user.minodb_user.username, 'testuser');
			res.sendStatus(200);
			done();
		});

		var agent = request.agent(server);
		agent
		.post('/mino/ajax/login')
		.send({username_or_email: 'testuser', password: 'my_password'})
		.expect(200)
		.end(function(err, res) {
			assert.equal(err, null);

			agent
			.get('/test_process_session')
			.expect(200).
			end(function(err, res) {
				assert.equal(err, null);
			});
		});
	});

	it('should invalidate active sessions when new one is created', function(done) {
		server.get('/test_invalidate_session', function(req,res) {
			if (req.user) {
				res.sendStatus(200);
			} else {
				res.sendStatus(401);
			}
		});

		var agent = request.agent(server);
		agent
		.post('/mino/ajax/login')
		.send({username_or_email: 'testuser', password: 'my_password'})
		.expect(200)
		.end(function(err, res) {
			assert.equal(err, null);

			agent
			.get('/test_invalidate_session')
			.expect(200).
			end(function(err, res) {
				assert.equal(err, null);

				var agent2 = request.agent(server);
				agent2
				.post('/mino/ajax/login')
				.send({username_or_email: 'testuser', password: 'my_password'})
				.expect(200)
				.end(function(err, res) {
					assert.equal(err, null);

					//Previous session should be invalid now
					agent
					.get('/test_invalidate_session')
					.expect(401).
					end(function(err, res) {
						assert.equal(err, null);
						done();
					});
				});
			});
		});
	});
});
