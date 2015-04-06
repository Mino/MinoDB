var logger = require('mino-logger');
var assert = require('assert');
var globals = require('./globals');

describe('Initial setup', function() {

	it('should have users folder', function(done) {
		globals.sdk.get(["/MinoDB/users/"], function(err, res) {
			logger.debug(err,res);
			assert.equal(err, null);
			
			var objects = res.objects[0];
			assert.notEqual(objects, null);
			done();
		});
	});

	it('should have sessions folder', function(done) {
		globals.sdk.get(["/MinoDB/sessions/"], function(err, res) {
			logger.debug(err,res);
			assert.equal(err, null);
			
			var objects = res.objects[0];
			assert.notEqual(objects, null);
			done();
		});
	});

	it('should have types folder', function(done) {
		globals.sdk.get(["/MinoDB/types/"], function(err, res) {
			logger.debug(err,res);
			assert.equal(err, null);
			
			var objects = res.objects[0];
			assert.notEqual(objects, null);
			done();
		});
	});
});