var logger = require('mino-logger');
var globals = require('../../globals');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

module.exports = function(done) {
	var setup_database = function() {
		globals.mongodb.dropDatabase(function(err, res) {
			assert.equal(err, null);
			assert.equal(res, true);
			
			globals.minodb.api.connect_callbacks.push(function() {
				minodb.create_user({
	                username: "testuser",
	                email: "testuser@minocloud.com",
	                password: "my_password"
				}, function(user_err, user_res){
	                logger.debug(JSON.stringify(user_err, null, 4), user_res);

					globals.minodb.create_user({
		                username: "otheruser",
		                email: "otheruser@minocloud.com",
		                password: "my_password"
					}, function(user_err, user_res){
						done();
					})
	            })
			});

		});
	}
	
	if (globals.mongodb) {
		setup_database();
	} else {
		MongoClient.connect(globals.db_address, function(err, db) {
			globals.mongodb = db;
			setup_database();	
		});
	}
}