var logger = require('tracer').console();
var globals = require('../../../globals');
var assert = require('assert');

describe('init()', function() {
	it('should save permissions folder', function(done) {
		globals.minodb.get(["/testuser/minodb_permissions/permissions/"], function(err, res) {
			assert.equal(err, null);
			assert.equal(res.objects[0].name, "permissions");
			assert.equal(res.objects[0].folder, true);
			done();
		});
	})

	it('should save groups folder', function(done) {
		globals.minodb.get(["/testuser/minodb_permissions/groups/"], function(err, res) {
			assert.equal(err, null);
			assert.equal(res.objects[0].name, "groups");
			assert.equal(res.objects[0].folder, true);
			done();
		});
	})

	it('should save minodb_group_permission type', function(done) {
		globals.minodb.with_user("MinoDB").get(['/MinoDB/types/minodb_group_permission'], function(err, res) {
			assert.equal(err, null);
			assert.equal(res.objects[0].name, "minodb_group_permission");
			done();
		})
	});


	it('should have minodb_group_permission type', function(done) {
		globals.minodb.with_user("MinoDB").get(['/MinoDB/types/minodb_group_permission'], function(err, res) {
			assert.equal(err, null);
			assert.equal(res.objects[0].name, "minodb_group_permission");
			done();
		})
	});

	it('should have minodb_identifier_permission type', function(done) {
		globals.minodb.with_user("MinoDB").get(['/MinoDB/types/minodb_identifier_permission'], function(err, res) {
			assert.equal(err, null);
			assert.equal(res.objects[0].name, "minodb_identifier_permission");
			done();
		})
	});

	it('should have minodb_identifier_group type', function(done) {
		globals.minodb.with_user("MinoDB").get(['/MinoDB/types/minodb_identifier_group'], function(err, res) {
			assert.equal(err, null);
			assert.equal(res.objects[0].name, "minodb_identifier_group");
			done();
		})
	});
})