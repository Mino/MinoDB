var Constants = require('../../common_classes/Constants');
var logger = require('tracer').console();

function CallbackObject(callback){
	var co = this;

	co.callback = callback;
	co.has_read = false;
	co.has_write = false;
}

function PathPermissionChecker(handler){
	var ppc = this;

	ppc.handler = handler;

	ppc.paths = {};
	ppc.callback_objects = [];

	ppc.retrieved_permissions = {};

	ppc.immediate_mode = false;
}

PathPermissionChecker.prototype.check_permissions_for_path = function(path, callback){
	var ppc = this;

	var username_for_permission = path.username_for_permission(ppc.handler.user.username);
	logger.log("username_for_permission ",username_for_permission, ppc.handler.user.username);
	if(username_for_permission===ppc.handler.user.username){
		logger.log("IS SAME USER");
		callback(Constants.WRITE_PERMISSION);
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
	callback_objects.push(callback_object);

	var sub_path = path;
	do{

		var permission_path = sub_path.permission_path(ppc.handler.user.username);

		var existing_permission = ppc.retrieved_permissions[permission_path];
		if(existing_permission){
			
			if(ppc.immediate_mode){
				callback();
				return;
			}

		} else if(existing_permission===undefined){

			var existing = ppc.paths[permission_path];
		    if(existing===undefined){
		        existing = [];
		        ppc.paths[permission_path] = existing;
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

		logger.log("FAILING CALLBACK");
		if(co.has_write){
			co.callback(Constants.WRITE_PERMISSION);
		} else if(co.has_read){
			co.callback(Constants.READ_PERMISSION);
		} else {
			co.callback(Constants.NO_PERMISSION);
		}
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
	logger.log(keys);

	if(keys.length===0){
		ppc.resolve_callbacks(callback_objects);
		if(callback){
			callback();
		}
		return;
	}

	logger.log(ppc.handler.api);
	ppc.handler.api.ds.object_collection.find({
		"full_path" : {"$in" : keys}
	}).toArray(function(array_err, array){
		logger.log(array_err);
		logger.log(array);

		ppc.resolve_callbacks(callback_objects);

		if(callback){
			callback();
		}
	});
}

module.exports = PathPermissionChecker;