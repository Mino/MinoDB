var globals = require('../globals');
var logger = require('tracer').console();
var assert = require('assert');
var express = require('express');
var request = require('supertest');

describe("Plugin", function() {
	it("should be added", function(done) {
		var PLUGIN_RESPONSE = "Testing plugin response";

		var server = express();
		server.get("/", function(req, res) {
			res.send(PLUGIN_RESPONSE);
		})
		server.use("/mino/", globals.mino.server());

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

		globals.mino.add_plugin(plugin);

		var agent = request.agent(server);

		agent
			.post('/mino/ajax/login')
			.send({username_or_email: 'testuser', password: 'my_password'})
			.expect(200)
			.end(function(err, res) {

				agent
					.get('/mino/admin/plugin_config/test_plugin')
					.expect(200)
					.end(function(err, res) {
						logger.log(res.body, res.text);
						assert.equal(res.text, PLUGIN_RESPONSE);
						done();
					});
			});
	});
});