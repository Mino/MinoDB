var globals = require('../globals');
var logger = require('tracer').console();
var assert = require('assert');
var express = require('express');
var request_plugin_config = require('./request_plugin_config');

describe("Plugins", function() {

	describe("New plugin", function() {

		it("should retrieve config server", function(done) {
			var PLUGIN_RESPONSE = "Testing plugin response";

			var server = express();
			server.get("/", function(req, res) {
				res.send(PLUGIN_RESPONSE);
			})

			var plugin = {
				get_config_server: function() {
					return server;
				},
				info: function() {
					return {
						name: "test_plugin",
						display_name: "Test Plugin"
					}
				},
				init: function() {

				}
			}

			var test_server = express()
			test_server.use("/mino/", globals.mino.server());

			globals.mino.add_plugin(plugin);
			request_plugin_config("test_plugin", test_server, function(err, res) {
				assert.equal(err, null);
				assert.equal(res, PLUGIN_RESPONSE);
				done();
			})
			
		});
	});

	describe("API plugin", function() {
		it("should retrieve config server", function(done) {
			var test_server = express()
			test_server.use("/mino/", globals.mino.server());
			request_plugin_config("api", test_server, function(err, res) {
				assert.equal(err, null);
				assert.equal(res, "API CONFIG");
				done();
			})
		})
	})

	describe("Browser plugin", function() {
		it("should retrieve config server", function(done) {
			var test_server = express()
			test_server.use("/mino/", globals.mino.server());
			request_plugin_config("browser", test_server, function(err, res) {
				assert.equal(err, null);
				assert.notEqual(res.indexOf('/mino/admin/plugin_config/browser/frontend.js'), -1);
				done();
			})
		})
	})

	require('./ui_server');
});