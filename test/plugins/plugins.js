var globals = require('../globals');
var logger = require('mino-logger');
var assert = require('assert');
var express = require('express');
var request_plugin_config = require('./request_plugin_config');

describe("Plugins", function() {

	describe("New plugin", function() {

		before(function(){
			var server = express();
			server.get("/", function(req, res) {
				res.send("Testing plugin response");
			});

			var plugin = {
				get_config_server: function() {
					return server;
				},
				info: function() {
					return {
						name: "test_plugin",
						display_name: "Test Plugin"
					};
				},
				init: function() {

				},
				get_scripts: function() {
					return ["/script.js"];
				}
			};
			globals.mino.add_plugin(plugin);

			var added = false;
			var plugins = globals.mino.plugin_manager.list_plugins();
			for (var i=0; i<plugins.length; i++) {
				if (plugins[i].name === "test_plugin" && plugins[i].display_name === "Test Plugin") {
					added = true;
				}
			}
			assert.equal(added, true);
		});

		it("should retrieve config server", function(done) {
			var test_server = express();
			test_server.use("/mino/", globals.mino.server());

			request_plugin_config("test_plugin", test_server, function(err, res) {
				assert.equal(err, null);
				assert.equal(res, "Testing plugin response");
				done();
			});
			
		});

		it('should retrieve plugin script', function() {
			var scripts = globals.mino.get_plugin_scripts("/mino");
			assert.deepEqual(scripts, ["/mino/script.js"]);
		});

		it('should not add a plugin with the same name', function(done) {
			var plugin = {
				get_config_server: function() {
					return server;
				},
				info: function() {
					return {
						name: "test_plugin",
						display_name: "Test Plugin"
					};
				},
				init: function() {

				},
				get_scripts: function() {
					return ["/script.js"];
				}
			};
			try {
				globals.mino.add_plugin(plugin);
			} catch (err) {
				done();
			}
		});
	});

	describe("API plugin", function() {
		it("should retrieve config server", function(done) {
			var test_server = express();
			test_server.use("/mino/", globals.mino.server());
			request_plugin_config("api", test_server, function(err, res) {
				assert.equal(err, null);
				assert.equal(res, "API CONFIG");
				done();
			});
		});
	});

	describe("Browser plugin", function() {
		it("should retrieve config server", function(done) {
			var test_server = express();
			test_server.use("/mino/", globals.mino.server());
			request_plugin_config("browser", test_server, function(err, res) {
				assert.equal(err, null);
				assert.notEqual(res.indexOf('/mino/admin/plugin_config/browser/frontend.js'), -1);
				done();
			});
		});
	});

	require('./ui_server');
	require('./auth/auth');
	require('./permissions/permissions');
});