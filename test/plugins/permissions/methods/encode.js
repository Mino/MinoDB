var logger = require('mino-logger');
var globals = require('../../../globals');
var assert = require('assert');

describe('encode_text()', function() {
	it('should encode /', function() {
		var perms = globals.minodb.get_plugin('custom_permissions');
		var result = perms.encode_text('/test/');
		assert.equal(result.indexOf('/'), -1);
	});
});

describe('decode_text()', function() {
	it('should decode text with /', function() {
		var perms = globals.minodb.get_plugin('custom_permissions');
		var result = perms.decode_text('%2Ftest%2F');
		assert.equal(result, '/test/');
	});
});