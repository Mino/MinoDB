var logger = require('tracer').console();
var assert = require('assert');
var globals = require('../globals');

describe('Dynamic signals', function() {

	it("should trigger when path and handler match", function(done) {
		
		globals.sdk.with_user("testuser").save([{
			name: "signal_no_subfolders",
			path: "/testuser/signals/",
			mino_signal: {
				paths: ["/testuser/folder/"],
				include_subfolders: false,
				handlers: ["save"],
			}
		}], function(err, res) {
			assert.equal(err, null);

			var save_object = {
				name: "some_object",
				path: "/testuser/folder/",
			}

			globals.mino.signal_manager.add_dynamic_signal_callback("signal_no_subfolders", function(object) {
				assert.equal(object.name, save_object.name);
				assert.equal(object.path, save_object.path);
				done();
			})

			globals.sdk.with_user("testuser").save([save_object], function(err, res) {
				assert.equal(err, null);
			})

		})
	})

	it("should trigger when include_subfolders=true and path is a child of signal path", function(done) {

		globals.sdk.with_user("testuser").save([{
			name: "signal_with_subfolders",
			path: "/testuser/signals/",
			mino_signal: {
				paths: ["/testuser/folder/"],
				include_subfolders: true,
				handlers: ["save"],
			}
		}], function(err, res) {
			assert.equal(err, null);

			var save_object = {
				name: "some_object",
				path: "/testuser/folder/inner_folder/",
			}

			globals.mino.signal_manager.add_dynamic_signal_callback("signal_with_subfolders", function(object) {
				assert.equal(object.name, save_object.name);
				assert.equal(object.path, save_object.path);
				done();
			})

			globals.sdk.with_user("testuser").save([save_object], function(err, res) {
				assert.equal(err, null);
			})

		})
	})
});