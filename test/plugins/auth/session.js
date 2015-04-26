var logger = require('mino-logger');
var assert = require('assert');
var express = require('express');
var globals = require('../../globals');
var request = require('supertest');
var cookieParser = require('cookie-parser');
var Session = require('../../../default_plugins/auth/models/Session');

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

	it('should not log user in if session has expired', function(done) {
		server.get('/test_invalidate_session', function(req,res) {
			if (req.user) {
				res.sendStatus(200);
			} else {
				res.sendStatus(401);
			}
		});

		globals.minodb.create_user({
            username: "expired_session_user",
            email: "expired_session_user@minocloud.com",
            password: "my_password"
		}, function(err, res){
			assert.equal(err, null);
			var user_id = res.user.objects[0]._id;

			var agent = request.agent(server);
			agent
			.post('/mino/ajax/login')
			.send({username_or_email: "expired_session_user", password: 'my_password'})
			.expect(200)
			.end(function(err, res) {
				assert.equal(err, null);

				agent
				.get('/test_invalidate_session')
				.expect(200).
				end(function(err, res) {
					assert.equal(err, null);

					//Expiring session
					var options = {
				        path: auth.session_path, 
				        minodb_username: auth.username
				    };

					Session.get_active_user_sessions(user_id, globals.minodb.api, options, function(err, sessions) {
						assert.equal(err, null);
						assert.equal(sessions.length, 1);

						var session = sessions[0];
						session.end_time = new Date().getTime();
						session.save(globals.minodb.api, options, function(err, res) {
							assert.equal(err, null);

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
	});
});
