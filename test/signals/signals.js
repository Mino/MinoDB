var logger = require('tracer').console();
var assert = require('assert');
var globals = require('../globals');
var Signal = require('../../MinoDB/core/models/Signal');

describe("Signals", function() {

	before(function(done) {
		globals.sdk.with_user("testuser").save([{
			name: "folder",
			path: "/testuser/",
			folder: true			
		}], function(err, res) {
			assert.equal(err, null);

			globals.sdk.with_user("testuser").save([{
				name: "inner_folder",
				path: "/testuser/folder/",
				folder: true			
			}], function(err, res) {
				assert.equal(err, null);
				done();
			});
		})
	})

	it("should trigger when path and handler match", function(done) {

		var save_object = {
			name: "signal_object",
			path: "/testuser/folder/",
		}
		
		var signal = new Signal({
			paths: ["/testuser/folder/"],
			include_subfolders: false,
			handlers: ["save"],
			callback: function(object) {
				assert.equal(object.name, save_object.name);
				assert.equal(object.path, save_object.path);
				done();
			}
		})

		globals.mino.add_signal(signal);

		globals.sdk.with_user("testuser").save([save_object], function(err, res) {
			assert.equal(err, null);
		})

	})

	it("should trigger when include_subfolders=true and path is a child of signal path", function(done) {

		var save_object = {
			name: "signal_object_in_subfolder",
			path: "/testuser/folder/inner_folder/",
		}

		var signal = new Signal({
			paths: ["/testuser/folder/"],
			include_subfolders: true,
			handlers: ["save"],
			callback: function(object) {
				assert.equal(object.name, save_object.name);
				assert.equal(object.path, save_object.path);
				done();
			}
		})
			
		globals.mino.add_signal(signal);

		globals.sdk.with_user("testuser").save([save_object], function(err, res) {
			assert.equal(err, null);
		})

	})

	it("should trigger when no path specified", function(done) {
		var save_object = {
			name: "signal_object_no_path",
			path: "/testuser/folder/inner_folder/",
		}

		var signal = new Signal({
			handlers: ["save"],
			callback: function(object) {
				assert.equal(object.name, save_object.name);
				assert.equal(object.path, save_object.path);
				done();
			}
		})
			
		globals.mino.add_signal(signal);

		globals.sdk.with_user("testuser").save([save_object], function(err, res) {
			assert.equal(err, null);
		})

	});


	afterEach(function() {
		//Clearing signals
		globals.mino.signal_manager.signals = []
	})

})