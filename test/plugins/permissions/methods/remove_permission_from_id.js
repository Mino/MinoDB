var logger = require('mino-logger');
var globals = require('../../../globals');
var assert = require('assert');

describe('remove_permission_from_id())', function() {
	it('should remove permission from id', function(done) {
		var perms = globals.minodb.get_plugin('custom_permissions');
		perms.assign_permission_to_id('permission_remove_test', "stan", function(err, res) {
			assert.equal(err, null);
			assert.equal(res.name, 'id:stan');

			perms.has_permission('permission_remove_test', 'stan', function(err, has_permission) {
				assert.equal(err, null);
				assert.equal(has_permission, true);


				perms.remove_permission_from_id('permission_remove_test', 'stan', function(err, res) {
					assert.equal(err, null);
					assert.deepEqual(res, {deleted: true});
					
					perms.has_permission('permission_remove_test', 'stan', function(err, has_permission) {
						assert.equal(err, null);
						assert.equal(has_permission, false);
						done();
					});

				})
			})
		})
	})

	it('should remove permission from id with escaped name', function(done) {
		var perms = globals.minodb.get_plugin('custom_permissions');
		perms.assign_permission_to_id('permission_remove_test/escaped', "stan/test", function(err, res) {
			assert.equal(err, null);
			assert.equal(res.name, 'id:stan%2Ftest');

			perms.has_permission('permission_remove_test/escaped', 'stan/test', function(err, has_permission) {
				assert.equal(err, null);
				assert.equal(has_permission, true);


				perms.remove_permission_from_id('permission_remove_test/escaped', 'stan/test', function(err, res) {
					assert.equal(err, null);
					assert.deepEqual(res, {deleted: true});
					
					perms.has_permission('permission_remove_test/escaped', 'stan/test', function(err, has_permission) {
						assert.equal(err, null);
						assert.equal(has_permission, false);
						done();
					});

				})
			})
		})
	})
});
