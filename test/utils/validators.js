var globals = require('../globals');
var logger = require('mino-logger');
var assert = require('assert');
var validators = require('../../MinoDB/core/validators');

var errors = require('../../errors');
var Path = require('../../common_classes/Path');

exports.path = function(val, emit){
    var path = new Path();
    var path_error = path.init(val);
    if (path_error !== null) {
        return path_error;
    }
    emit(path);
};

exports.folder_path = function(val, emit){
	var path = new Path();
    var path_error = path.init(val);
    if (path_error !== null) {
    	return path_error;
    }
    if(!path.is_folder){
    	return errors.INVALID_FOLDER_PATH_FORMAT;
    }
    emit(path);
};

describe("validators", function() {

	describe("path", function() {

		it('should return an error if path is invalid', function() {
			var error = validators.path("invalid_path", function(value) {

			});
			assert.deepEqual(error, {
				"error":8,
				"error_message":"Invalid format for path."
			});
		});

		it('should emit a path if valid', function() {
			var error = validators.path("/Mino/", function(value) {
				assert.equal(value instanceof Path, true);
				assert.equal(value.toString(), "/Mino/");
			});
			assert.equal(error);
		});

	});

	describe("folder_path", function() {

		it('should return an error if path is invalid', function() {
			var error = validators.folder_path("invalid_path", function(value) {

			});
			assert.deepEqual(error, {
				"error":8,
				"error_message":"Invalid format for path."
			});
		});

		it('should return an error if path is not a folder', function() {
			var error = validators.folder_path("/not_a_folder", function(value) {

			});
			assert.deepEqual(error, {
				"error":7,
				"error_message":"Invalid folder path."
			});
		});

		it('should emit a path if valid', function() {
			var error = validators.folder_path("/Mino/", function(value) {
				assert.equal(value instanceof Path, true);
				assert.equal(value.toString(), "/Mino/");
			});
			assert.equal(error);
		});

	});

});