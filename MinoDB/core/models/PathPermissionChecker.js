var Constants = require('../../../common_classes/Constants');
var logger = require('tracer').console();

function CallbackObject(callback){
	var co = this;

	co.callback = callback;
	co.permission = Constants.NO_PERMISSION;
}

function PathPermissionChecker(handler, options){
	var ppc = this;

	ppc.handler = handler;

	ppc.options = options || {};

	ppc.for_write = ppc.options.for_write || false;

	ppc.paths = {};
	ppc.callback_objects = [];

	ppc.retrieved_permissions = {};

	ppc.immediate_mode = false;
}

PathPermissionChecker.prototype.check_permissions_for_path = function(path, callback){
	var ppc = this;

	var username_for_permission = path.username_for_permission(ppc.handler.user.username, ppc.for_write);
	logger.log(username_for_permission, ppc.handler.user.username, path.toString());
	if(username_for_permission===ppc.handler.user.username){
		callback(Constants.WRITE_PERMISSION);
		return;
	}

	if (path.length == 0) {
		callback(Constants.NO_PERMISSION);
		return;
	}

	var paths,callback_objects;	

	if(ppc.immediate_mode){
		paths = {};
		callback_objects = [];
	} else {
		paths = ppc.paths;
		callback_objects = ppc.callback_objects;
	}

	var callback_object = new CallbackObject(callback);
	callback_object.path = path;
	callback_objects.push(callback_object);

	var sub_path = path;
	do{
		logger.log(sub_path);
		var permission_path = (ppc.for_write ? "write:" : "read:") + sub_path;
		var existing_permission = ppc.retrieved_permissions[permission_path];
		if(existing_permission){
			//TODO
			if(ppc.immediate_mode){
				callback(existing_permission);
				return;
			}

		} else if(existing_permission===undefined){

			var existing = paths[permission_path];
		    if(existing===undefined){
		        existing = [];
		        paths[permission_path] = existing;
		    }
		    existing.push(callback_object);
	   }
	} while(sub_path = sub_path.parent_path());

	if(ppc.immediate_mode){
		ppc.retrieve_permissions(null,paths,callback_objects);
	}
}

PathPermissionChecker.prototype.resolve_callbacks = function(callback_objects){
	var ppc = this;

	if(!callback_objects){
		callback_objects = ppc.callback_objects;
	}

	for(var i = 0; i < callback_objects.length; i++){
		var co = callback_objects[i];
		co.callback(co.permission);
	}
}

PathPermissionChecker.prototype.retrieve_permissions = function(callback, paths, callback_objects){
	var ppc = this;

	if(paths==null){
		paths = ppc.paths;
	}
	if(callback_objects==null){
		callback_objects = ppc.callback_objects;
	}

	var keys = Object.keys(paths);
	logger.log(paths);
	if(keys.length===0){
		ppc.resolve_callbacks(callback_objects);
		if(callback){
			callback();
		}
		return;
	}

	var perms = ppc.handler.api.minodb.get_plugin('minodb-permissions');
	perms.has_permissions(keys, ppc.handler.user.username, function(err, res) {
		logger.log(err, res);

		for (var i=0; i<keys.length; i++) {
			var permission = keys[i];
			logger.log(permission);
			logger.log(callback_objects);
			if (res[i] === true) {
				for (var j=0; j<paths[permission].length; j++) {
					var callback_object = paths[permission][j];
					if (ppc.for_write) {
						callback_object.permission = Constants.WRITE_PERMISSION;
						ppc.retrieved_permissions[permission] = Constants.WRITE_PERMISSION;
					} else {
						callback_object.permission = Constants.READ_PERMISSION;
						ppc.retrieved_permissions[permission] = Constants.READ_PERMISSION;
					}	
				}
			}
		}

		ppc.resolve_callbacks(callback_objects);
		
		if (callback) {
			callback();
		}	
		
	})

}

module.exports = PathPermissionChecker;