var logger = require('mino-logger');
var globals = require('../../../globals');
var assert = require('assert');

describe('remove_group_from_id()', function() {
	it('should remove group from id', function(done) {
		var perms = globals.minodb.get_plugin('custom_permissions');
		perms.assign_group_to_id('removed_group', "stan", function(err, res) {
			assert.equal(err, null);
			assert.equal(res.name, 'id:stan');

			globals.minodb.get([perms.group_path + 'removed_group/id:stan'], function(err, res) {
				assert.equal(err, null);
				assert.equal(res.objects[0].name, 'id:stan');
				
				perms.remove_group_from_id('removed_group', 'stan', function(err, res) {
					assert.equal(err, null);
					assert.deepEqual(res, {deleted:true});

					globals.minodb.get([perms.group_path + 'removed_group/id:stan'], function(err, res) {
						assert.equal(err, null);
						done();
					});
				});
			});
		});
	});

	it('should remove group from id with escaped name', function(done) {
		var perms = globals.minodb.get_plugin('custom_permissions');
		perms.assign_group_to_id('removed_group/escaped', "stan/test", function(err, res) {
			assert.equal(err, null);
			assert.equal(res.name, 'id:stan%2Ftest');
			
			globals.minodb.get([perms.group_path + 'removed_group%2Fescaped/id:stan%2Ftest'], function(err, res) {
				assert.equal(err, null);
				assert.equal(res.objects[0].name, 'id:stan%2Ftest');
				
				perms.remove_group_from_id('removed_group/escaped', 'stan/test', function(err, res) {
					assert.equal(err, null);
					assert.deepEqual(res, {deleted:true});

					globals.minodb.get([perms.group_path + 'removed_group%2Fescaped/id:stan%2Ftest'], function(err, res) {
						assert.equal(err, null);
						done();
					});
				});
			});
		});
	});
});