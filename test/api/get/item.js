var globals = require('../../globals');
var logger = require('tracer').console();
var assert = require('assert');

it('should not throw an error if access denied', function(done) {
	globals.sdk.with_user("testuser").get(["/Mino/users/testuser"], function(err, res) {
		logger.log(res);
		assert.equal(err, null);
		assert.equal(res.objects[0], null)
		done();
	});
});

it('should return a folder to Mino user even if access is denied', function(done) {
	var path = "/testuser/TestSave";
	globals.sdk.get([path], function(err, res) {
		logger.log(res);
		assert.equal(err, null);

		var object = res.objects[0];
		assert.notEqual(object, null);
		assert.equal(object.folder, false);
		assert.equal(object.full_path, path);
		
		done();
	});
})