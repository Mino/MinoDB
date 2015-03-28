var logger = require('tracer').console();
var globals = require('../../../globals');
var assert = require('assert');

describe('assign_group_to_id()', function() {
	it('should assign group to id', function(done) {
		var perms = globals.minodb.get_plugin('custom_permissions');
		perms.assign_group_to_id('assigned_group', "stan", function(err, res) {
			assert.equal(err, null);
			assert.equal(res.name, 'id:stan');

			globals.minodb.get([perms.group_path + 'assigned_group/id:stan'], function(err, res) {
				assert.equal(err, null);
				assert.equal(res.objects[0].name, 'id:stan');
				done();
			})
		})
	})

	it('should assign group to id with escaped name', function(done) {
		var perms = globals.minodb.get_plugin('custom_permissions');
		perms.assign_group_to_id('assigned_group/escaped', "stan/test", function(err, res) {
			assert.equal(err, null);
			assert.equal(res.name, 'id:stan%2Ftest');
			logger.log(res);
			globals.minodb.get([perms.group_path + 'assigned_group%2Fescaped/id:stan%2Ftest'], function(err, res) {
				logger.log(err, res)
				assert.equal(err, null);
				assert.equal(res.objects[0].name, 'id:stan%2Ftest');
				done();
			})
		})
	})
});