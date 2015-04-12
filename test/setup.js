var logger = require('mino-logger');
var globals = require('./globals');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var Common = require('../common_classes/Common');

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
			}, "testuser");

			var MinoSDK = require('minosdk');
			var sdk = new MinoSDK(Common.ROOT_USERNAME);
			sdk.set_local_api(mino.api);

			globals.sdk = sdk;
			globals.mino = mino;
			globals.minodb = mino;
			
			mino.api.connect_callbacks.push(function() {
				mino.create_user({
	                username: "testuser",
	                email: "test@minocloud.com",
	                password: "my_password"
				}, function(user_err, user_res){
	                logger.debug(JSON.stringify(user_err, null, 4), user_res);
					assert.equal(user_err, null);

					mino.create_user({
		                username: "otheruser",
		                email: "test@minocloud.com",
		                password: "my_password"
					}, function(user_err, user_res){
					    logger.debug(JSON.stringify(user_err, null, 4), user_res);
						assert.equal(user_err, null);
					    db.close();
						done();
					})
	            })
			});
		});
	});


}