var globals = require('../../globals');
var logger = require('tracer').console();
var assert = require('assert');
var express = require('express');
var request_plugin_config = require('../request_plugin_config');

describe("Auth", function() {

	it("should retrieve config server", function(done) {
		var test_server = express()
		test_server.use("/mino/", globals.mino.server());
		request_plugin_config("mino_auth", test_server, function(err, res) {
			logger.log(err, res);
			assert.equal(err, null);
			assert.equal(res, "Mino Auth config server");
			done();
		})
	})

	require('./basic_sign_in');
	require('./session');

});
