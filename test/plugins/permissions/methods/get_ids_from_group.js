var logger = require('mino-logger');
var globals = require('../../../globals');
var assert = require('assert');
var MinoDbPermissions = require('../../../../default_plugins/permissions/MinoDbPermissions');

describe('get_ids_from_group()', function() {

	before(function(done) {

		var perms = new MinoDbPermissions({
			path: "/testuser/get_ids_from_group_permissions/",
			name: "get_ids_from_group_permissions",
			username: "testuser"
		});

		globals.minodb.add_plugin(perms, function() {
			done();
		});
	});

	it('should return an empty list if there are no ids', function(done) {
		var perms = globals.minodb.get_plugin('get_ids_from_group_permissions');

		perms.get_ids_from_group("group", function(err, res) {
			assert.equal(err, null);
			assert.deepEqual(res, []);
			done();
		});
	});

	it('should return a list of all ids', function(done) {
		var perms = globals.minodb.get_plugin('get_ids_from_group_permissions');

		perms.assign_group_to_id("group", "1", function(err, res) {
			assert.equal(err, null);
			perms.assign_group_to_id("group", "2", function(err, res) {
				assert.equal(err, null);
				perms.assign_group_to_id("group", "3", function(err, res) {
					assert.equal(err, null);

					perms.get_ids_from_group("group", function(err, res) {
						assert.equal(err, null);
						assert.deepEqual(res, ["1", "2", "3"]);
						done();
					});
				});
			});
		});
	});
});