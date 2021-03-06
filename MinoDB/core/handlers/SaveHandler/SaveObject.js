var errors = require('../../../../errors');
var Constants = require('../../../../common_classes/Constants');
var Path = require('../../../../common_classes/Path');
var logger = require('mino-logger');
var FieldVal = require('fieldval');
var FVRule = require('fieldval-rules');
var async = require('async');
var BasicVal = FieldVal.BasicVal;
var validators = require('../../validators');

function SaveObject(json, handler, index, options){
	var so = this;

	so.options = options || {};
	so.json = json;
	so.handler = handler;
	so.index = index;
	logger.debug(so.index);

	so.waiting_for_types = {};
	so.type_keys = {};

	so.validator = new FieldVal(json);

	so.granted_new_path = false;

	var bypass_path_checks = so.options.bypass_path_checks !== undefined ? so.options.bypass_path_checks : false;

	SaveObject.validate_basic_fields(so.validator, bypass_path_checks, so);

	so.is_new = so.id===undefined;
	if(so.id!==undefined){
		so.id = ""+so.id;//Convert to string
	}

	if(so.folder===undefined || so.folder===null){
		so.folder = false;
	}

	if(so.path){
		var permission_called = false;
		logger.debug(so.path);

		if(!bypass_path_checks){
			handler.path_permission_checker.check_permissions_for_path(so.path,function(status){
				if(status===Constants.WRITE_PERMISSION){
					//Can write to the specified path
					so.granted_new_path = true;
				} else if(status===Constants.READ_PERMISSION){
					so.validator.invalid("path",errors.NO_WRITE_PERMISSION);
				} else if(status===Constants.NO_PERMISSION){
					so.validator.invalid("path",errors.NO_WRITE_PERMISSION);
				}
			});
			handler.folder_checker.check_path_existance(so.path,function(status){
				logger.debug("folder_checker response ", so.path, status);
				if(status===Constants.EXISTS){
					//Can write to the specified path
					so.new_path_exists = true;
				} else {
					so.validator.invalid("path",errors.FOLDER_NOT_EXIST_OR_NO_PERMISSION);
				}
			});
		}
	}

	var unrecognized = so.validator.get_unrecognized();

	for(var i = 0; i < unrecognized.length; i++){
		var key = unrecognized[i];
		so.type_keys[key] = so.json[key];
		if(!so.options.bypass_type_checks){
			so.handler.request_type(key, so);
		}
	}
}

SaveObject.validate_basic_fields = function(validator, bypass_path_checks, save_object){
	if(bypass_path_checks===undefined){
		bypass_path_checks = true;
	}

	if(!save_object){
		//Allows save object to be updated with values - otherwise ignores them
		save_object = {};
	}

	save_object.id = validator.get("_id", validators.id(false));
	save_object.name = validator.get("name", BasicVal.string(true), BasicVal.not_empty(true), Path.object_name_check(bypass_path_checks));
	save_object.folder = validator.get("folder", BasicVal.boolean(false)) || false;
	save_object.version = validator.get("version", BasicVal.integer(false));
	//full_path might be present, but it should be ignored
	validator.get("full_path",BasicVal.string(false));//, validators.path);
	save_object.path = validator.get("path", BasicVal.string(true), validators.folder_path);
};

SaveObject.validate_objects = function(objects, types, callback){
	var so = this;

	var missing_types_map = {};
	var rules = {};

	for(var i in types){
		if(types.hasOwnProperty(i)){
			var rule = new FVRule();
			var rule_init = rule.init(types[i]);
			rules[i] = rule;
		}
	}

	var validation_results = [];

	async.forEachOf(objects, function(object,index,respond){

		var validator = new FieldVal(object);
		SaveObject.validate_basic_fields(validator, true);

		var unrecognized = validator.get_unrecognized();

		async.each(unrecognized, function(key, rule_done){
			var rule = rules[key];
			if(rule){
				var value = validator.get(key);
				rule.validate(value, function(error) {
					if(error!==null){
						validator.invalid(key, error);
					}
					rule_done();
				});
			} else if(rule===null) {
				//Type doesn't exist (was looked-up and returned null)
				//Will mark as unrecognized
				rule_done();
			} else {
				//Type isn't present (not necessarily non-existant)
				missing_types_map[key] = true;
				rule_done();
			}
		}, function(err){
			if(err){
				respond(err);
				return;
			}

			validation_results[index] = validator.end();
			respond(null);
		});
	}, function(err){
		if(err){
			callback(err);
			return;
		}

		var missing_types = [];
		for(var m in missing_types_map){
			if(missing_types_map.hasOwnProperty(m)){
				missing_types.push(m);
			}
		}

		if(missing_types.length>0){
			callback(missing_types);
		} else {
			callback(null, validation_results);
		}
	});
};

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
};

SaveObject.prototype.got_type = function(name, error, type, callback){
	var so = this;

	logger.debug(error);
	logger.debug(type);
	logger.debug("type.name: ",name);

	so.validator.recognized(name);

	var value = so.json[name];

	type.validate(value, function(error) {
		logger.debug(error);
		if(error!==null){
			so.validator.invalid(name, error);
		}
		callback();
	});
};

SaveObject.prototype.replace_id_in_name = function(){
	var so = this;

	so.name = so.name.replaceAll("~id~", so.id);
};

SaveObject.prototype.do_saving = function(on_save_callback){
	var so = this;

	var db = so.handler.api.ds;

	logger.debug("DO SAVING");

	if(so.is_new){
		db.get_id(function(id){
			logger.debug("GOT ID ",id);
			so.id = ""+id;
			so.replace_id_in_name();

			so.full_path = so.path.path_for_child_with_name(so.name,so.folder);
			so.version = 1;

			so.create_saving_json();

			db.object_collection.insert(so.saving_json,function(err,response){
				logger.debug("INSERTED");
				logger.debug(err, response);

				if(err){
	    			logger.debug(err);
	    			so.validator.invalid("name", errors.FULL_PATH_EXISTS);
			       	on_save_callback(so,so.validator.end(),null);
	    		} else {
	    			on_save_callback(so,null,{
	    				_id : so.id,
	    				version: so.version,
	    				name: so.name,
	    				full_path: so.full_path.toString()
	    			});
	    		}
			});
		});
	} else {

		var find_query = {
			"_id":so.id
		};

		so.replace_id_in_name();
		so.full_path = so.path.path_for_child_with_name(so.name,so.folder);

		so.create_saving_json();

		var attempt_save = function(){

			db.object_collection.findOne(
		    	find_query,function(err,res){

		    		logger.debug(err);
		    		logger.debug(res);

		    		if(res===null){
		    			so.validator.invalid("_id",{
		    				error: -1,
		    				error_message: "ID DOES NOT EXIST"
		    			});
		    			on_save_callback(so,so.validator.end());
		    			return;
		    		}

		    		var old_full_path = new Path();
		    		old_full_path.init(res.path);//Could throw an error, but it's already been save successfully

		    		var have_permission = function(){
		    			so.version = res.version+1;
			    		so.saving_json.version = res.version+1;

						logger.debug(so.saving_json);

						var update_conditions = {
							_id: so.id,
							version: so.version-1//Must be previous version
						};

						logger.debug(update_conditions);

			    		db.object_collection.update(
					    	update_conditions,
					    	so.saving_json,
					    	function(err,response){
					    		logger.debug("UPDATED");

					    		logger.debug(response);
					    		if(response===0){
					    			//The item wasn't saved because the conditions weren't met
					    			logger.debug("TRY AGAIN!");
					    			attempt_save();//Try again
					    			return;
					    		}

					    		if(err){
					    			logger.debug(err);
					    			so.validator.invalid("name",errors.FULL_PATH_EXISTS);
					    			on_save_callback(so,so.validator.end());
					    		} else {
					    			on_save_callback(so,null,{
					    				_id: so.id,
					    				name: so.name,
					    				full_path: so.full_path.toString(),
					    				version: so.version
					    			});
					    		}
						    }
					    );
		    		};

		    		var username_for_permission = old_full_path.username_for_permission(so.handler.user.username, true);
					if(username_for_permission===so.handler.user.username){
						have_permission();
					} else {

			    		so.handler.path_permission_checker.check_permissions_for_path(old_full_path,function(status){
			    			logger.debug("FAILED OLD PATH: "+so.index);
							if(status!=Constants.WRITE_PERMISSION){
								so.validator.invalid("_id",{
									error: -1,
									error_message: errors.NO_WRITE_PERMISSION
								});
								on_save_callback(so, null, so.validator.end());
							} else {
								have_permission();
						    }
						});
					}
		    	}
		    );
		};

		attempt_save();

	}
};

module.exports = SaveObject;
