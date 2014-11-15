var logger = require('tracer').console();
var globals = require('./globals');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var User = require('../MinoDB/core/models/User');


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

			mino.api.connect_callbacks.push(function() {
	            User.create({
	                username: "testuser",
	                email: "test@minocloud.com",
	                password: "my_password"
	            }, mino.api, function(user_err, user_res){
	                logger.log(JSON.stringify(user_err, null, 4), user_res);
	                var testuser_sdk = new MinoSDK("testuser");
	                testuser_sdk.set_local_api(mino.api);
	                globals.user_sdk = testuser_sdk;

					User.create({
					    username: "otheruser",
					    email: "test@minocloud.com",
					    password: "my_password"
					}, mino.api, function(user_err, user_res){
					    logger.log(JSON.stringify(user_err, null, 4), user_res);
					    var testuser_sdk = new MinoSDK("testuser");
					    testuser_sdk.set_local_api(mino.api);
					    globals.user_sdk = testuser_sdk;
						done();
					})
	            })
			});

		});
	});


}