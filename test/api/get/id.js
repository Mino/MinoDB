var globals = require('../../globals');
var logger = require('mino-logger');
var assert = require('assert');

describe('request by id', function () {
	it('should not throw an error if access denied', function(done) {
		globals.sdk.with_user("MinoDB").get(["/MinoDB/users/testuser"], function(err, res) {
			logger.debug(res);
			assert.equal(err, null);
			assert.notEqual(res.objects[0], null);

			var id = res.objects[0]._id;
			globals.sdk.with_user("testuser").get([id], function(err, res) {
				assert.equal(err, null);
				assert.equal(res.objects[0], null);
				done();
			});
		});
	});

	it('should return an item if access is granted', function(done) {
		var perms = globals.minodb.get_plugin('minodb_permissions');
		globals.minodb.get(["/otheruser/"], function(err, res) {
			assert.equal(err, null);
			assert.notEqual(err, res.objects[0]);
			var id = res.objects[0]._id;

			perms.remove_permission_from_id('read:/otheruser/', 'testuser', function(err, res) {
				globals.minodb.get([id], function(err, res) {
					logger.debug(res);
					assert.equal(err, null);
					assert.equal(res.objects[0], null);

					perms.assign_permission_to_id('read:/otheruser/', 'testuser', function(err, res) {
						assert.equal(err, null);

						globals.minodb.get([id], function(err, res) {
							assert.equal(err, null);
							assert.notEqual(res.objects[0], null);
							assert.equal(res.objects[0].full_path, '/otheruser/');
							assert.equal(res.objects[0].folder, true);
							done();
						});
					});
				});
			});
		});
	});
});
