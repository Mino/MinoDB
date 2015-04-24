var express = require('express');
var logger = require('mino-logger');
var globals = require('../../globals');
var assert = require('assert');
var MinoDbPermissions = require('../../../default_plugins/permissions/MinoDbPermissions');
var request_plugin_config = require('../request_plugin_config');

globals.db_address = 'mongodb://127.0.0.1:27017/minodb_tests';

describe('MinoDBPermissions', function() {
	before(function(done) {
		globals.minodb.save([{
			name: "minodb_permissions",
			path: "/testuser/",
			folder: true
		}], function(err, res) {
			
			var permissions_plugin = new MinoDbPermissions({
				path: "/testuser/minodb_permissions/",
				name: "custom_permissions",
				username: "testuser"
			});

			globals.minodb.add_plugin(permissions_plugin, function() {
				done();
			});
		});
	});

	describe('constructor', function() {
		it('should throw an error if path is not specified', function(done) {
			try {
				var permissions_plugin = new MinoDbPermissions({
					name: "custom_permissions",
					username: "testuser"
				});
			} catch (err) {
				done();
			}
		});

		it('should throw an error if username is not specified', function(done) {
			try {
				var permissions_plugin = new MinoDbPermissions({
					path: "/testuser/minodb_permissions/",
					name: "custom_permissions",
				});
			} catch (err) {
				done();
			}
		});
	});

	describe('config_server', function() {
		it('should request config server', function(done) {
			var test_server = express();
			test_server.use("/mino/", globals.mino.server());

			request_plugin_config("custom_permissions", test_server, function(err, res) {
				assert.equal(err, null);
				assert.notEqual(res.indexOf("This site requires Javascript"), -1);
				done();
			});
		});
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
	
	require('./methods/get_available_groups.js');
	require('./methods/get_ids_from_group.js');
	require('./methods/get_groups_from_perm.js');
	require('./methods/get_ids_from_perm.js');
	require('./methods/get_groups_from_id.js');
});
