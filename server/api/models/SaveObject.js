var Constants = require('../Constants');
var Path = require('./Path');
var logger = require('tracer').console();
var db = require('../../database');
var Field = require('./Fields/Field');
var Validator = require('../../../../FieldVal/fieldval-js/fieldval');
var bval = Validator.BasicVal;
var validators = require('../validators');

function SaveObject(json, handler, index){
	var so = this;
	so.json = json;
	so.handler = handler;
	so.index = index;
	logger.log(so.index);

	so.waiting_for_rules = {};
	so.type_keys = {};

	so.validator = new Validator(json);

	so.granted_new_path = false;

	so.id = so.validator.get("_id", bval.string(false)); //,bval.minimum(1));
	so.is_new = so.id===null;

	so.folder = so.validator.get("folder", bval.boolean(false));
	so.version = so.validator.get("version", bval.integer(false));
	if(so.folder===null){
		so.folder = false;
	}
	so.path = so.validator.get("path", bval.string(true), validators.path);
	if(so.path!=null){
		var username_for_permission = so.path.username_for_permission(handler.user.username);
		if(username_for_permission===handler.user.username){
			so.granted_new_path = true;
		} else {
			var permission_called = false;
			logger.log(so.path);
			handler.path_permission_checker.check_permissions_for_path(so.path,function(status){
				if(status===Constants.WRITE_PERMISSION){
					//Can write to the specified path
				} else if(status===Constants.READ_PERMISSION){
					so.validator.invalid("path",{
						error: -1,
						error_message: "NOT ALLOWED TO WRITE NEW PATH"
					})
				} else if(status===Constants.NO_PERMISSION){
					so.validator.invalid("path",{
						error: -1,
						error_message: "NO ACCESS TO PATH"
					})
				}
			});
		}
	}
	so.name = so.validator.get("name", bval.string(true), bval.not_empty(true));
	if(so.name!=null && so.path!=null){
		so.full_path = so.path.path_for_child_with_name(so.name,so.folder);
	}

	var unrecognized = so.validator.get_unrecognized();

	for(var i = 0; i < unrecognized.length; i++){
		var key = unrecognized[i];
		so.type_keys[key] = so.json[key];
		so.handler.request_rule(key, so);
	}
}

SaveObject.prototype.create_saving_json = function(){
	var so = this;

	so.saving_json = {
		_id : so.id,
		name: so.name,
		folder: so.folder,
		path: so.path.toString(),
		full_path: so.full_path.toString(),
		version: so.version
	};

	for(var key in so.type_keys){
		so.saving_json[key] = so.type_keys[key];
	}
}

SaveObject.prototype.got_rule = function(error, type){
	var so = this;

	so.validator.recognized(type.name);

	// logger.log("got type: ");
	// logger.log(type);

	var error = type.validate_object(so);

	logger.log(error);
	if(error!=null){
		so.validator.invalid(type.name, error);
	}
}

SaveObject.prototype.do_saving = function(){
	var so = this;

	if(so.is_new){
		so.id = ""+(db.id_index++);//Generate id (must be string)
		so.version = 1;

		so.create_saving_json();

		db.object_collection.insert(so.saving_json,function(err,response){
			logger.log("INSERTED");

			if(err){
    			logger.log(err);
    			so.validator.invalid("name",{
    				error: -1,
    				error_message: "FULL PATH ALREADY EXISTS"
    			})
		       so.handler.finished_saving_object(so,so.validator.end(),null);
    		} else {
    			so.handler.finished_saving_object(so,null,{
    				_id : so.id,
    				version: so.version
    			})
    		}
		})
	} else {

		var find_query = {
			"_id":so.id
		}

		so.create_saving_json();

		var attempt_save = function(){

			db.object_collection.findOne(
		    	find_query,function(err,res){

		    		logger.log(err);
		    		logger.log(res);

		    		if(res===null){
		    			so.validator.invalid("_id",{
		    				error: -1,
		    				error_message: "ID DOES NOT EXIST"
		    			})
		    			so.handler.finished_saving_object(so,so.validator.end());
		    			return;
		    		}

		    		var old_path = new Path();
		    		old_path.init(res.path);//Could throw an error, but it's already been save successfully

		    		var have_permission = function(){
		    			so.version = res.version+1;
			    		so.saving_json.version = res.version+1;

						logger.log(so.saving_json);

						var update_conditions = {
							_id: so.id,
							version: so.version-1//Must be previous version
						};

						logger.log(update_conditions);

			    		db.object_collection.update(
					    	update_conditions,
					    	so.saving_json,
					    	function(err,response){
					    		logger.log("UPDATED");

					    		logger.log(response);
					    		if(response===0){
					    			//The item wasn't saved because the conditions weren't met
					    			logger.log("TRY AGAIN!");
					    			attempt_save();//Try again
					    			return;
					    		}

					    		if(err){
					    			logger.log(err);
					    			so.validator.invalid("name",{
					    				error: -1,
					    				error_message: "FULL PATH ALREADY EXISTS OR VERSION ERROR"
					    			})
					    			so.handler.finished_saving_object(so,so.validator.end());
					    		} else {
					    			so.handler.finished_saving_object(so,null,{
					    				_id: so.id,
					    				version: so.version
					    			});
					    		}
						    }
					    );
		    		}

		    		var username_for_permission = old_path.username_for_permission(so.handler.user.username);
					if(username_for_permission===so.handler.user.username){
						have_permission();
					} else {

			    		so.handler.path_permission_checker.check_permissions_for_path(old_path,function(status){
			    			logger.log("FAILED OLD PATH: "+so.index);
							if(status!=Constants.WRITE_PERMISSION){
								so.validator.invalid("_id",{
									error: -1,
									error_message: "NOT ALLOWED TO WRITE OLD PATH"
								});
								so.handler.finished_saving_object(so, null, so.validator.end())
							} else {
								have_permission();
						    }
						});
					}
		    	}
		    );
		}

		attempt_save();

	}

    
}

module.exports = SaveObject;