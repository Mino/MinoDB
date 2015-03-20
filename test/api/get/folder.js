var globals = require('../../globals');
var logger = require('tracer').console();
var assert = require('assert');

it('should not throw an error if access denied', function(done) {
	globals.sdk.with_user("testuser").get(["/MinoDB/users/"], function(err, res) {
		logger.log(res);
		assert.equal(err, null);
		assert.equal(res.objects[0], null)
		done();
	});
});