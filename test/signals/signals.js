var logger = require('tracer').console();
var assert = require('assert');
var globals = require('../globals');

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

	afterEach(function() {
		//Clearing signals
		globals.mino.signal_manager.static_signals = []
		globals.mino.signal_manager.dynamic_signal_callbacks = {}
	})

	require('./static_signals');
	require('./dynamic_signals');

})