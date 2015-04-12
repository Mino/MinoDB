var globals = require('../globals');
var logger = require('mino-logger');
var assert = require('assert');
var class_to_string = require('../../MinoDB/class_to_string');
var extend = require('extend');


describe("class_to_string", function() {

	it("should include instance methods", function() {

		function test_class() {}
		test_class.prototype.method = function(a){a+=2;};

		var output = class_to_string(test_class);
		assert.notEqual(output.indexOf("test_class.prototype.method = function (a){a+=2;}"), -1);
		assert.equal(output, "function test_class() {}\n\ntest_class.prototype.method = function (a){a+=2;}\n\n");
	});

	it("should include static methods", function() {

		function test_class() {}
		test_class.method = function(b){b+=2;};

		var output = class_to_string(test_class);
		assert.notEqual(output.indexOf("test_class.method = function (b){b+=2;}"), -1);
		assert.equal(output, "function test_class() {}\n\ntest_class.method = function (b){b+=2;}\n\n");
	});

	it("should include instance and static methods with the same name", function() {

		function test_class() {}
		test_class.prototype.method = function(b){b+=2;};
		test_class.method = function(c){c+=2;};

		var output = class_to_string(test_class);
		assert.notEqual(output.indexOf("test_class.prototype.method = function (b){b+=2;}"), -1);
		assert.notEqual(output.indexOf("test_class.method = function (c){c+=2;}"), -1);
		assert.equal(output, "function test_class() {}\n\ntest_class.method = function (c){c+=2;}\n\ntest_class.prototype.method = function (b){b+=2;}\n\n");
	});

	it("should include class properties", function() {

		function test_class() {}
		test_class.property = 2;

		logger.debug(output);

		var output = class_to_string(test_class);
		assert.notEqual(output.indexOf("test_class.property = 2"), -1);
		assert.equal(output, "function test_class() {}\n\ntest_class.property = 2\n\n");
	});

	it("should extend the superclass", function() {

		function super_class() {}
		super_class.static_method = function() {};

		extend(test_class,super_class);
		
		function test_class() {}
		test_class.prototype.method = function(a,b){return a+b;};
		test_class.static_method = function(c,d){return c/d;};
		
		test_class.property = 2;

		
		var output = class_to_string(test_class);
		logger.debug(output);

		assert.notEqual(output.indexOf("extend(test_class, super_class)"), -1);
		assert.equal(output, "extend(test_class, super_class)\n\n" +
			"function test_class() {}\n\n" +
			"test_class.static_method = function (c,d){return c/d;}\n\n" +
			"test_class.property = 2\n\n" +
			"test_class.prototype.method = function (a,b){return a+b;}\n\n");
	});

});