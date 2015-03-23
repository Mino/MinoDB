var logger = require('tracer').console();
var assert = require('assert');
var express = require('express');
var globals = require('../../globals');
var errors = require('../../../errors');

describe("session", function() {

	describe('create_sessions()', function() {

		it("should create a session object", function(done) {
			var auth = globals.mino.get_plugin('mino_auth');
			
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
			var auth = globals.mino.get_plugin('mino_auth');

			auth.create_session("12", function(err, session) {
				assert.equal(err, null);
				auth.get_session(session.id, function(err, get_session) {
					assert.deepEqual(session, get_session);
					done();
				});
			})
		})
		
	})
})
