var Constants = require('../../../../common_classes/Constants');
var Common = require('../../../../common_classes/Common')
var Path = require('../../../../common_classes/Path');
var logger = require('mino-logger');
var FieldVal = require('fieldval');
var BasicVal = FieldVal.BasicVal;
var validators = require('../../validators');

function DeleteObject(address, handler, index, options){
	var del_obj = this;

	var address_details = Common.get_resource_type(address);
    logger.debug("address_details ",address_details);
    var address_type = address_details[0];
    var address_value = address_details[1];

    if(address_type==="path"){
    	del_obj.path = address_value;
    	del_obj.address_type = DeleteObject.BY_PATH;
    } else if(address_type==="id"){
        del_obj.id = address_value;
        del_obj.address_type = DeleteObject.BY_ID;
    } else {
        logger.debug("DeleteObject address_type ",address_type);
        del_obj.error = FieldVal.Error(0)
    }

	del_obj.options = options || {};
	del_obj.handler = handler;
	del_obj.index = index;
}

DeleteObject.BY_ID = 0;
DeleteObject.BY_PATH = 1;

DeleteObject.prototype.do_deleting = function(on_delete_callback){
	var del_obj = this;

	var db = del_obj.handler.api.ds;

	if(del_obj.error){//Already have an error
		on_delete_callback(del_obj, del_obj.error);
		return;
	}


	var find_query;

	if(del_obj.address_type===DeleteObject.BY_ID){
		find_query = {
			_id: del_obj.id
		};
	} else {//Is by address
		logger.debug(del_obj.path);
		find_query = {
			full_path: del_obj.path.toString()
		};
	}

	logger.debug(find_query);


	db.object_collection.findOne(
    	find_query,function(err,res){

    		logger.debug(err);
    		logger.debug(res);

    		if(res===null){
    			on_delete_callback(del_obj,{
    				error: -1,
    				error_message: "ID DOES NOT EXIST"
    			});
    			return;
    		}

    		var old_full_path = new Path();
    		old_full_path.init(res.full_path);//Could throw an error, but it's already been delete successfully
    		del_obj.id = res._id;
    		del_obj.deleting_json = res;

    		var have_permission = function(){

				var update_conditions;

				if(del_obj.address_type===DeleteObject.BY_ID){
					update_conditions = {
						_id: del_obj.id
					};
				} else {//Is by address
					//Must be the same id and full_path
					logger.debug(del_obj.path);
					update_conditions = {
						_id: del_obj.id,
						full_path: del_obj.path.toString()
					};
				}

				logger.debug(update_conditions);

	    		db.object_collection.remove(
			    	update_conditions,
			    	function(err,response){
			    		logger.debug("DELETED");

			    		logger.debug(response);

			    		if(err){
			    			logger.debug(err);
			    			throw new Error("UNEXPECTED!");
			    		} else {

			    			logger.debug(del_obj.path);

			    			if(del_obj.path.is_folder){
			    				var delete_folder_conditions = {
			    					"path": {
			    						"$regex": "^"+del_obj.path.toString()
			    					}
			    				};

			    				logger.debug(delete_folder_conditions);

			    				db.object_collection.remove(delete_folder_conditions, function(folder_err, folder_res){
			    					logger.debug(folder_err, folder_res);
					    			on_delete_callback(del_obj,null,{
					    				deleted: true
					    			});	
			    				})
			    			} else {
				    			on_delete_callback(del_obj,null,{
				    				deleted: true
				    			});
				    		}
			    		}
				    }
			    );
    		}

    		logger.debug(old_full_path.username_for_permission);
    		var username_for_permission = old_full_path.username_for_permission(del_obj.handler.user.username, true);
    		logger.debug("DELETING username_for_permission",username_for_permission);
			if(username_for_permission===del_obj.handler.user.username){
				have_permission();
			} else {

				logger.debug("old_full_path ",old_full_path);
	    		del_obj.handler.path_permission_checker.check_permissions_for_path(old_full_path,function(status){
	    			logger.debug("status ",status);
	    			logger.debug("FAILED OLD PATH: "+del_obj.index);
					if(status!=Constants.WRITE_PERMISSION){
						on_delete_callback(del_obj, {
							error: -1,
							error_message: "NOT ALLOWED TO WRITE OLD PATH"
						});
					} else {
						have_permission();
				    }
				});
			}
    	}
    );
}

module.exports = DeleteObject;