var logger = require('tracer').console();
var assert = require('assert');
var globals = require('../globals');
var StaticSignal = require('../../MinoDB/core/models/StaticSignal');

describe("Static signal", function() {

	it("should trigger when path and handler match", function(done) {

		var save_object = {
			name: "static_signal_object",
			path: "/testuser/folder/",
		}
		
		var signal = new StaticSignal({
			paths: ["/testuser/folder/"],
			include_subfolders: false,
			handlers: ["save"],
			callback: function(object) {
				assert.equal(object.name, save_object.name);
				assert.equal(object.path, save_object.path);
				done();
			}
		})

		globals.mino.add_static_signal(signal);

		globals.sdk.with_user("testuser").save([save_object], function(err, res) {
			assert.equal(err, null);
		})

	})

	it("should trigger when include_subfolders=true and path is a child of signal path", function(done) {

		var save_object = {
			name: "static_signal_object_in_subfolder",
			path: "/testuser/folder/inner_folder/",
		}

		var signal = new StaticSignal({
			paths: ["/testuser/folder/"],
			include_subfolders: true,
			handlers: ["save"],
			callback: function(object) {
				if (object.name == 'inner_folder') return;
				assert.equal(object.name, save_object.name);
				assert.equal(object.path, save_object.path);
				done();
			}
		})
			
		globals.mino.add_static_signal(signal);

		globals.sdk.with_user("testuser").save([save_object], function(err, res) {
			assert.equal(err, null);
		})

	})
})