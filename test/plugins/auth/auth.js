var globals = require('../../globals');
var logger = require('mino-logger');
var assert = require('assert');
var express = require('express');
var request_plugin_config = require('../request_plugin_config');

describe("Auth", function() {

	it("should retrieve config server", function(done) {
		var test_server = express()
		test_server.use("/mino/", globals.mino.server());
		request_plugin_config("minodb_auth", test_server, function(err, res) {
			logger.debug(err, res);
			assert.equal(err, null);
			done();
		})
	})

	require('./basic_sign_in');
	require('./session');
	require('./custom_auth/custom_auth');

});
