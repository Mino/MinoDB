var globals = require('../../globals');
var logger = require('tracer').console();
var assert = require('assert');

it('should not throw an error if access denied', function(done) {
	globals.user_sdk.get(["/Mino/users/"], function(err, res) {
		logger.log(res);
		assert.equal(err, null);
		assert.equal(res.objects[0], null)
		done();
	});
});

it('should return a folder to Mino user even if access is denied', function(done) {
	globals.user_sdk.get(["/testuser/"], function(err, res) {
		assert.equal(err, null);
		assert.notEqual(res.objects[0], null)
		done();
	});
})