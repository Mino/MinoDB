var logger = require('tracer').console();
var globals = require('./globals');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

module.exports = function(done) {
	MongoClient.connect(globals.db_address, function(err, db) {
		db.dropDatabase(function(err, res) {
			assert.equal(err, null);
			assert.equal(res, true);
			var MinoDB = require('../minodb');
			var mino = new MinoDB({
			    api: true,
			    ui: true,
			    db_address: globals.db_address
			})

			var MinoSDK = require('minosdk');
			var sdk = new MinoSDK("Mino");
			sdk.set_local_api(mino.api);

			globals.sdk = sdk;			

			var testuser_sdk = new MinoSDK("testuser");
			testuser_sdk.set_local_api(mino.api);
			globals.user_sdk = testuser_sdk;

			logger.log("finished");
			done();
		});
	});


}