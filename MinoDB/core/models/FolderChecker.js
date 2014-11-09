var Constants = require('../../../common_classes/Constants');
var logger = require('tracer').console();

function CallbackObject(callback){
	var co = this;

	co.callback = callback;
	co.exists = false;
}

function FolderChecker(handler){
	var fc = this;

	fc.handler = handler;

	fc.paths = {};
	fc.callback_objects = [];

	fc.retrieved_existances = {};

	fc.immediate_mode = false;
}

FolderChecker.prototype.check_path_existance = function(path, callback){
	var fc = this;

	logger.log("check_path_existance ",path);

	if(fc.immediate_mode){
		paths = {};
		callback_objects = [];
	} else {
		paths = fc.paths;
		callback_objects = fc.callback_objects;
	}

	var existance_path = path.toString();

	var callback_object = new CallbackObject(callback);
	callback_objects.push(callback_object);

	var existing_existance = fc.retrieved_existances[existance_path];
	if(existing_existance===undefined){
		
		var existing = fc.paths[existance_path];
	    if(existing===undefined){
	        existing = [];
	        fc.paths[existance_path] = existing;
	    }
	    existing.push(callback_object);

	} else {
		existing.push(callback_object);	
		if(fc.immediate_mode){
			callback();
			return;
		}
	}

	if(fc.immediate_mode){
		fc.retrieve_existances(null,paths,callback_objects);
	}
}

FolderChecker.prototype.resolve_callbacks = function(callback_objects){
	var fc = this;

	if(!callback_objects){
		callback_objects = fc.callback_objects;
	}

	for(var i = 0; i < callback_objects.length; i++){
		var co = callback_objects[i];

		if(co.exists){
			co.callback(Constants.EXISTS);
		} else {
			co.callback(null);
		}
	}
}

FolderChecker.prototype.retrieve_existances = function(callback, paths, callback_objects){
	var fc = this;

	if(paths==null){
		paths = fc.paths;
	}
	if(callback_objects==null){
		callback_objects = fc.callback_objects;
	}

	var keys = Object.keys(paths);

	if(keys.length===0){
		fc.resolve_callbacks(callback_objects);
		if(callback){
			callback();
		}
		return;
	}

	logger.log(keys);
	logger.log(callback_objects);
	fc.handler.api.ds.object_collection.find({
		"full_path" : {"$in" : keys}
	}).toArray(function(array_err, array){
		logger.log(array_err);
		logger.log(array);

		for(var i = 0; i < array.length; i++){
			var object = array[i];

			logger.log(object.full_path);
			var callbacks = paths[object.full_path];
			if(callbacks){
				for(var n = 0; n < callbacks.length; n++){
					callbacks[n].exists = true;
				}
			}
		}

	
		var root_path_callbacks = paths["/"];
		if(root_path_callbacks){
			for(var n = 0; n < root_path_callbacks.length; n++){
				root_path_callbacks[n].exists = true;
			}
		}

		fc.resolve_callbacks(callback_objects);

		if(callback){
			callback();
		}
	});
}

module.exports = FolderChecker;