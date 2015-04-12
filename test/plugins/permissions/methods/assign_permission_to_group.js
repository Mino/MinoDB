var logger = require('mino-logger');
var globals = require('../../../globals');
var assert = require('assert');

describe('assign_permission_to_group()', function() {
	it('should assign permission to group', function(done) {
		var perms = globals.minodb.get_plugin('custom_permissions');
		perms.assign_permission_to_group('assigned_permission', "assigned_group", function(err, res) {
			assert.equal(err, null);
			assert.equal(res.name, 'group:assigned_group');

			globals.minodb.get([perms.permission_path + 'assigned_permission/group:assigned_group'], function(err, res) {
				assert.equal(err, null);
				assert.equal(res.objects[0].name, 'group:assigned_group');

				perms.assign_group_to_id("assigned_group", "stan2", function(err, res) {
					assert.equal(err, null);

					perms.has_permission("assigned_permission", "stan2", function(err, has_permission) {
						assert.equal(err, null);
						assert.equal(has_permission, true);
						done();
					})
				})
			})
		})
	})

	it('should assign permission to group with escaped name', function(done) {
		var perms = globals.minodb.get_plugin('custom_permissions');
		perms.assign_permission_to_group('assigned_permission/escaped', "assigned_group/escaped", function(err, res) {
			assert.equal(err, null);
			assert.equal(res.name, 'group:assigned_group%2Fescaped');
			logger.debug(res);

			globals.minodb.get([perms.permission_path + 'assigned_permission%2Fescaped/group:assigned_group%2Fescaped'], function(err, res) {
				logger.debug(err, res)
				assert.equal(err, null);
				assert.equal(res.objects[0].name, 'group:assigned_group%2Fescaped');
				
				perms.assign_group_to_id("assigned_group/escaped", "stan2", function(err, res) {
					assert.equal(err, null);

					perms.has_permission("assigned_permission/escaped", "stan2", function(err, has_permission) {
						assert.equal(err, null);
						assert.equal(has_permission, true);
						done();
					})
				})
			})
		})
	})
});
