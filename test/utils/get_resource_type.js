var globals = require('../globals');
var logger = require('mino-logger');
var Common = require('../../common_classes/Common');
var Path = require('../../common_classes/Path');
var assert = require('assert');

describe('get_resource_type', function() {

	it('should return path if resource is a valid path', function() {
		var res = Common.get_resource_type("/Mino/");
		assert.equal(res[0], "path");
		assert.equal(res[1] instanceof Path, true);
		assert.equal(res[1].toString(), "/Mino/");
	});

	it('should return id if resource is a valid id', function() {
		var res = Common.get_resource_type("2");
		assert.equal(res[0], "id");
		assert.equal(res[1], "2");

		res = Common.get_resource_type(2);
		assert.equal(res[0], "id");
		assert.equal(res[1], 2);
	});

	it('should return type if resource is a valid type', function() {
		var res = Common.get_resource_type("some_type");
		assert.equal(res[0], "type");
		assert.equal(res[1], "some_type");
	});

	it('should return id_version if resource is a id_version', function() {
		var res = Common.get_resource_type("2/3");
		assert.equal(res[0], "id_version");
		assert.deepEqual(res[1], [2,3]);
	});

});