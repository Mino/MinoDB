var logger = require('mino-logger');
var globals = require('../../../globals');
var assert = require('assert');

describe('remove_permission_from_group()', function() {
	it('should remove permission from group', function(done) {
		var perms = globals.minodb.get_plugin('custom_permissions');
		perms.assign_permission_to_group('removed_permission', "removed_permission_group", function(err, res) {
			assert.equal(err, null);
			assert.equal(res.name, 'group:removed_permission_group');

			globals.minodb.get([perms.permission_path + 'removed_permission/group:removed_permission_group'], function(err, res) {
				assert.equal(err, null);
				assert.equal(res.objects[0].name, 'group:removed_permission_group');
				
				perms.assign_group_to_id("removed_permission_group", "stan2", function(err, res) {
					assert.equal(err, null);

					perms.has_permission("removed_permission", "stan2", function(err, has_permission) {
						assert.equal(err, null);
						assert.equal(has_permission, true);

						perms.remove_permission_from_group("removed_permission", "removed_permission_group", function(err, res) {
							assert.equal(err, null);
							perms.has_permission("removed_permission", "stan2", function(err, has_permission) {
								assert.equal(err, null);
								assert.equal(has_permission, false);
								done();
							});
						});
					})
				})
			})
		})
	})

	it('should remove permission from group with escaped name', function(done) {
		var perms = globals.minodb.get_plugin('custom_permissions');
		perms.assign_permission_to_group('removed_permission/escaped', "removed_permission_group/escaped", function(err, res) {
			assert.equal(err, null);
			assert.equal(res.name, 'group:removed_permission_group%2Fescaped');
			logger.debug(res);

			globals.minodb.get([perms.permission_path + 'removed_permission%2Fescaped/group:removed_permission_group%2Fescaped'], function(err, res) {
				logger.debug(err, res)
				assert.equal(err, null);
				assert.equal(res.objects[0].name, 'group:removed_permission_group%2Fescaped');
				
				perms.assign_group_to_id("removed_permission_group/escaped", "stan2", function(err, res) {
					assert.equal(err, null);

					perms.has_permission("removed_permission/escaped", "stan2", function(err, has_permission) {
						assert.equal(err, null);
						assert.equal(has_permission, true);

						perms.remove_permission_from_group("removed_permission/escaped", "removed_permission_group/escaped", function(err, res) {
							assert.equal(err, null);
							perms.has_permission("removed_permission/escaped", "stan2", function(err, has_permission) {
								assert.equal(err, null);
								assert.equal(has_permission, false);
								done();
							});
						});
					})
				})
			})
		})
	})
});
