var logger = require('mino-logger');
var globals = require('../../../globals');
var assert = require('assert');
var MinoDbPermissions = require('../../../../default_plugins/permissions/MinoDbPermissions');

describe('get_available_groups()', function() {

	before(function(done) {

		var perms = new MinoDbPermissions({
			path: "/testuser/get_available_groups_permissions/",
			name: "get_available_groups_permissions",
			username: "testuser"
		});

		globals.minodb.add_plugin(perms, function() {
			done();
		});
	});

	it('should return an empty list if there are no groups', function(done) {
		var perms = globals.minodb.get_plugin('get_available_groups_permissions');

		perms.get_available_groups(function(err, res) {
			assert.equal(err, null);
			assert.deepEqual(res, []);
			done();
		});
	});

	it('should return a list of all groups available', function(done) {
		var perms = globals.minodb.get_plugin('get_available_groups_permissions');

		perms.assign_permission_to_group("permission", "group1", function(err, res) {
			assert.equal(err, null);
			perms.assign_permission_to_group("permission", "group2", function(err, res) {
				assert.equal(err, null);
				perms.assign_permission_to_group("permission", "group3", function(err, res) {
					assert.equal(err, null);

					perms.get_available_groups(function(err, res) {
						assert.equal(err, null);
						assert.deepEqual(res, ["group1", "group2", "group3"]);
						done();
					});
				});
			});
		});
	});
});