var globals = require('../globals');
var logger = require('tracer').console();
var assert = require('assert');


describe('When I try to access other user\'s folder', function() {

	it('should not let me do as a regular user', function(done) {
		globals.user_sdk.get(["/Mino/users/"], function(err, res) {
			logger.log(res);
			assert.equal(err, null);
			assert.equal(res.objects[0], null)
			done();
		});
	});

	it('should let me do as a Mino user', function(done) {
		globals.user_sdk.get(["/testuser/"], function(err, res) {
			assert.equal(err, null);
			assert.notEqual(res.objects[0], null)
			done();
		});
	})
})