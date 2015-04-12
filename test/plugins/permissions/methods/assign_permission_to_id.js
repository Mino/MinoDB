var logger = require('mino-logger');
var globals = require('../../../globals');
var assert = require('assert');

describe('assign_permission_to_id()', function() {
	it('should assign permission to id', function(done) {
		var perms = globals.minodb.get_plugin('custom_permissions');
		perms.assign_permission_to_id('allow_edit', "stan", function(err, res) {
			assert.equal(err, null);
			assert.equal(res.name, 'id:stan');

			perms.has_permission('allow_edit', 'stan', function(err, has_permission) {
				assert.equal(err, null);
				assert.equal(has_permission, true);
				done();
			});

		});
	});

	it('should assign permission to id with escaped name', function(done) {
		var perms = globals.minodb.get_plugin('custom_permissions');
		perms.assign_permission_to_id('allow_edit/escaped', "stan/test", function(err, res) {
			assert.equal(err, null);
			assert.equal(res.name, 'id:stan%2Ftest');

			perms.has_permission('allow_edit/escaped', 'stan/test', function(err, has_permission) {
				logger.debug(JSON.stringify(err, null, 4));
				assert.equal(err, null);
				assert.equal(has_permission, true);
				done();
			});

		});
	});
});
