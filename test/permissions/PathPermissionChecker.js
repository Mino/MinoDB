var globals = require('../globals');
var logger = require('tracer').console();
var assert = require('assert');
var Path = require('../../common_classes/Path');
var PathPermissionChecker = require('../../MinoDB/core/models/PathPermissionChecker');
var Constants = require('../../common_classes/Constants');

describe('PathPermissionChecker', function() {

	var clean_permissions = function(done) {
		var perms = globals.minodb.get_plugin('minodb-permissions');
		perms.remove_permission_from_id('write:/otheruser/', 'testuser', function(err, res) {
			perms.remove_permission_from_id('read:/otheruser/', 'testuser', function(err, res) {
				done();
			});
		})
	}

	var handler;
	before(function(done){
		handler = {
			api: globals.minodb.api,
			user: {
				username: 'testuser'
			}
		}
		clean_permissions(done);

	});
	afterEach(clean_permissions);

	it('should return NO_PERMISSION if access is not granted', function(done) {
		var ppc = new PathPermissionChecker(handler,{
		    for_write: true
		});
		ppc.immediate_mode = true;
		
		var path = new Path();
		path.init('/otheruser/');

		ppc.check_permissions_for_path(path, function(status){
			assert.equal(status, Constants.NO_PERMISSION);
			done();
		});

	})

	it('should return WRITE_PERMISSION if access is granted', function(done) {
		var ppc = new PathPermissionChecker(handler,{
		    for_write: true
		});
		ppc.immediate_mode = true;
		
		var path = new Path();
		path.init('/otheruser/');

		var perms = globals.minodb.get_plugin('minodb-permissions');
		perms.assign_permission_to_id('write:/otheruser/', 'testuser', function(err, res) {
			assert.equal(err, null);
			ppc.check_permissions_for_path(path, function(status){
				assert.equal(status, Constants.WRITE_PERMISSION);
				done();
			});
		})
		
	})

	it('should return READ_PERMISSION if access is granted', function(done) {
		var ppc = new PathPermissionChecker(handler);
		ppc.immediate_mode = true;
		
		var path = new Path();
		path.init('/otheruser/');

		var perms = globals.minodb.get_plugin('minodb-permissions');
		perms.assign_permission_to_id('read:/otheruser/', 'testuser', function(err, res) {
			assert.equal(err, null);
			ppc.check_permissions_for_path(path, function(status){
				assert.equal(status, Constants.READ_PERMISSION);
				done();
			});
		})
	})

	it('should return NO_PERMISSION to root path', function(done) {
		var ppc = new PathPermissionChecker(handler);
		ppc.immediate_mode = true;
		
		var path = new Path();
		path.init('/');

		var perms = globals.minodb.get_plugin('minodb-permissions');
		perms.assign_permission_to_id('read:/', 'testuser', function(err, res) {
			assert.equal(err, null);
			ppc.check_permissions_for_path(path, function(status){
				assert.equal(status, Constants.NO_PERMISSION);
				done();
			});
		})
	})

	it('should reuse fetched permissions', function(done) {
		var ppc = new PathPermissionChecker(handler);
		
		var path = new Path();
		path.init('/otheruser/');

		var perms = globals.minodb.get_plugin('minodb-permissions');
		perms.assign_permission_to_id('read:/otheruser/', 'testuser', function(err, res) {
			assert.equal(err, null);
			
			ppc.check_permissions_for_path(path, function(status){
				assert.equal(status, Constants.READ_PERMISSION);
			});

			ppc.retrieve_permissions(function(){
			    //Turn the path_permission_checker to immediate_mode to make subsequent permission checks immediate
			    ppc.immediate_mode = true;
			    
			    ppc.retrieve_permissions = function() {
			    	throw "ERROR: permission should be cached.";
			    }

			    ppc.check_permissions_for_path(path, function(status) {
					assert.equal(status, Constants.READ_PERMISSION);
					done();
			    })
			});
		})
	})

})