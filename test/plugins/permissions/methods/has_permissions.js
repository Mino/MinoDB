var logger = require('tracer').console();
var globals = require('../../../globals');
var assert = require('assert');

describe('has_permissions()', function() {

	before(function(done) {
		var perms = globals.minodb.get_plugin('custom_permissions');
		perms.assign_permission_to_id('has_permissions', 'stan_has_permissions', function(err, res) {
			assert.equal(err, null);
			perms.assign_permission_to_group('has_permissions_in_group', "group_has_permissions", function(err, res) {
				assert.equal(err, null);

				perms.assign_group_to_id("group_has_permissions", "stan_has_permissions", function(err, res) {
					assert.equal(err, null);
					done();
				})
			})
		})

	})

	it('should return correct values', function(done) {
		var perms = globals.minodb.get_plugin('custom_permissions');
		perms.has_permissions(['has_permissions', 'nonexistant-permission', 'has_permissions_in_group'], 'stan_has_permissions', function(err, res) {
			assert.equal(err, null);
			assert.deepEqual(res, [true, false, true]);
			done();
		})
	})

})