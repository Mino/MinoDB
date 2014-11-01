var Constants = require('../../common_classes/Constants');
var logger = require('tracer').console();

function CallbackObject(callback){
	var co = this;

	co.callback = callback;
	co.has_read = false;
	co.has_write = false;
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

		logger.log("FAILING CALLBACK");
		if(co.has_write){
			co.callback(Constants.WRITE_PERMISSION);
		} else {
			co.callback(Constants.NO_PERMISSION);
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
	logger.log(keys);

	if(keys.length===0){
		fc.resolve_callbacks(callback_objects);
		if(callback){
			callback();
		}
		return;
	}

	logger.log(fc.handler.api);
	fc.handler.api.ds.object_collection.find({
		"full_path" : {"$in" : keys}
	}).toArray(function(array_err, array){
		logger.log(array_err);
		logger.log(array);

		fc.resolve_callbacks(callback_objects);

		if(callback){
			callback();
		}
	});
}

module.exports = FolderChecker;