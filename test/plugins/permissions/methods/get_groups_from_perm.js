var logger = require('mino-logger');
var globals = require('../../../globals');
var assert = require('assert');
var MinoDbPermissions = require('../../../../default_plugins/permissions/MinoDbPermissions');

describe('get_groups_from_perm()', function() {

	before(function(done) {

		var perms = new MinoDbPermissions({
			path: "/testuser/get_groups_from_perm_permissions/",
			name: "get_groups_from_perm_permissions",
			username: "testuser"
		});

		globals.minodb.add_plugin(perms, function() {
			done();
		});
	});

	it('should return an empty list if there are no ids', function(done) {
		var perms = globals.minodb.get_plugin('get_groups_from_perm_permissions');

		perms.get_groups_from_perm("group", function(err, res) {
			assert.equal(err, null);
			assert.deepEqual(res, []);
			done();
		});
	});

	it('should return a list of all ids', function(done) {
		var perms = globals.minodb.get_plugin('get_groups_from_perm_permissions');

		perms.assign_permission_to_group("perm", "group1", function(err, res) {
			assert.equal(err, null);
			perms.assign_permission_to_group("perm", "group2", function(err, res) {
				assert.equal(err, null);
				perms.assign_permission_to_group("perm", "group3", function(err, res) {
					assert.equal(err, null);

					perms.get_groups_from_perm("perm", function(err, res) {
						assert.equal(err, null);
						assert.deepEqual(res, ["group1", "group2", "group3"]);
						done();
					});
				});
			});
		});
	});
});