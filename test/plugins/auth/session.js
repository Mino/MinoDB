var logger = require('tracer').console();
var assert = require('assert');
var express = require('express');
var globals = require('../../globals');
var request = require('supertest');
var cookieParser = require('cookie-parser');

describe("session", function() {

	describe('create_session()', function() {

		it("should create a session object", function(done) {
			var auth = globals.mino.get_plugin('minodb_auth');
			
			var user_id = "10";
			auth.create_session(user_id, function(err, session) {
				assert.equal(err, null);
				assert.equal(session.user_id, user_id);
				done();
			})
		})

	})

	describe('get_session()', function() {
		
		it('should get a session by id', function(done) {
			var auth = globals.mino.get_plugin('minodb_auth');

			auth.create_session("12", function(err, session) {
				assert.equal(err, null);
				auth.get_session(session.id, function(err, get_session) {
					assert.deepEqual(session, get_session);
					done();
				});
			})
		})
		
	})

	it('should persist and process session', function(done) {
		var server = express();
		var auth = globals.mino.get_plugin('minodb_auth');
		
		server.use(cookieParser());
		server.use('/mino/', globals.mino.server());
		server.use(auth.process_session({required: false}));
		
		server.get('/test_session', function(req,res) {
			assert.notEqual(req.user, undefined);
			assert.equal(req.user.minodb_user.username, 'testuser');
			res.send(200);
			done();
		});

		var agent = request.agent(server);
		agent
			.post('/mino/ajax/login')
			.send({username_or_email: 'testuser', password: 'my_password'})
			.expect(200)
			.end(function(err, res) {
				agent
					.get('/test_session')
					.expect(200).
					end(function(err, res) {

					});
			});
	})

})
