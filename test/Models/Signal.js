var logger = require('tracer').console();
var assert = require('assert');
var globals = require('../globals');
var Signal = require('../../MinoDB/core/models/Signal');
var express = require('express');
var bodyParser = require('body-parser');

describe("Signal", function() {


	before(function(done) {
		globals.sdk.with_user("testuser").save([{
			name: "folder",
			path: "/testuser/",
			folder: true			
		}], function(err, res) {
			assert.equal(err, null);
			done();
		})
	})

	it("should trigger when path and handler match", function(done) {
		
		globals.sdk.with_user("testuser").save([{
			name: "signal_no_subfolders",
			path: "/testuser/signals/",
			mino_signal: {
				paths: ["/testuser/folder/"],
				include_subfolders: false,
				handlers: ["save"],
				webhooks: ["http://localhost:9323/webhook"]
			}
		}], function(err, res) {
			assert.equal(err, null);

			var server = null;
			var app = express();
			app.use(bodyParser.json());
			app.post('/webhook', function(req, res) {
				logger.log(req.body);
				done();
				res.send(200);
				server.close();
			})
			server = app.listen(9323);

			globals.sdk.with_user("testuser").save([{
				name: "some_object",
				path: "/testuser/folder/",
			}], function(err, res) {
				assert.equal(err, null);
			})

		})
	})

	it("should trigger when include_subfolders=true and path is a child of signal path", function(done) {
		globals.sdk.with_user("testuser").save([{
			name: "inner_folder",
			path: "/testuser/folder/",
			folder: true			
		}], function(err, res) {
			assert.equal(err, null);

			globals.sdk.with_user("testuser").save([{
				name: "signal_with_subfolders",
				path: "/testuser/signals/",
				mino_signal: {
					paths: ["/testuser/folder/"],
					include_subfolders: true,
					handlers: ["save"],
					webhooks: ["http://localhost:10323/webhook"]
				}
			}], function(err, res) {
				assert.equal(err, null);

				var server = null;
				var app = express();
				app.use(bodyParser.json());
				app.post('/webhook', function(req, res) {
					logger.log(req.body);
					done();
					res.send(200);
					server.close();
				})
				server = app.listen(10323);

				globals.sdk.with_user("testuser").save([{
					name: "some_object",
					path: "/testuser/folder/inner_folder/",
				}], function(err, res) {
					assert.equal(err, null);
				})

			})
		})
	})

})