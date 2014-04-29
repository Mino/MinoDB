var logger = require('tracer').console();

function PathPermissionChecker(){
	var ppc = this;

	ppc.paths = {};
}

PathPermissionChecker.prototype.check_permissions_for_path = function(path, save_object, old_path){
	var ppc = this;

	var sub_paths = path.sub_paths;
	for(var i = 0; i < sub_paths.length-1; i++){
		var sub_path = sub_paths[i];

		var existing = ppc.paths[sub_path];
	    if(existing===undefined){
	        existing = [];
	        ppc.paths[sub_path] = existing;
	    }
	    existing.push(save_object);
	}
}

PathPermissionChecker.prototype.retrieve_permissions = function(callback){
	var ppc = this;

	setTimeout(function(){

		for(var path in ppc.paths){
			logger.log("PATH:"+path);
			if(path==="/TestUser/Shared/"){
				var objects = ppc.paths[path];
				for(var i = 0; i < objects.length; i++){
					var save_object = objects[i];
					save_object.granted_new_path = true;
				}
			}
		}

		callback();

	},10);
}

module.exports = PathPermissionChecker;