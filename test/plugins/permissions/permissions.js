var logger = require('tracer').console();
var globals = require('../../globals');
var assert = require('assert');
var MinoDBPermissions = require('../../../default_plugins/permissions/MinoDBPermissions');

globals.db_address = 'mongodb://127.0.0.1:27017/minodb_tests';

describe('MinoDBPermissions', function() {
	before(function(done) {
		this.timeout(10000);
		// require('./setup')(function() {

			globals.minodb.save([{
				name: "minodb_permissions",
				path: "/testuser/",
				folder: true
			}], function(err, res) {
				// assert.equal(err,null);
				// logger.log(err, res);
				
				var permissions_plugin = new MinoDBPermissions({
					path: "/testuser/minodb_permissions/",
					name: "custom_permissions",
					username: "testuser"
				})

				globals.minodb.add_plugin(permissions_plugin, function() {
					done();
				});
			})

			
		// })
	});

	require('./methods/init.js');
	require('./methods/encode.js');
	
	require('./methods/assign_permission_to_id.js');
	require('./methods/remove_permission_from_id.js');
	
	require('./methods/assign_group_to_id.js');
	require('./methods/remove_group_from_id.js');
	
	require('./methods/assign_permission_to_group.js');
	require('./methods/remove_permission_from_group.js');
	
	require('./methods/has_permissions.js');
});