var errors = require('../../../../errors')
var Constants = require('../../../../common_classes/Constants');
var Path = require('../../../../common_classes/Path');
var User = require('../../models/User');
var logger = require('tracer').console();
var FieldVal = require('fieldval');
var BasicVal = FieldVal.BasicVal;
var validators = require('../../validators');

function Permission(json, handler, index, options){
	var perm = this;

	perm.options = options || {};
	perm.json = json;
	perm.handler = handler;
	perm.index = index;

	perm.validator = new FieldVal(json);

	perm.username = perm.validator.get("username", BasicVal.string(true), User.username_validator);
	perm.path = perm.validator.get("path", BasicVal.string(true), validators.path);
	if(perm.path!=null){
		logger.log(perm.path);

		var user_for_grant = perm.path.username_for_permission(perm.handler.user, true);
		if(user_for_grant!==perm.handler.user.username){
			perm.validator.invalid("path", errors.CANT_GRANT_PATH);
		}
	}
	perm.write = perm.validator.get("write", BasicVal.boolean(true));

	var immediate_error = perm.validator.end();
	if(!immediate_error){
		handler.folder_checker.check_path_existance("/"+perm.username+"/",function(status){
			logger.log("folder_checker response ", perm.path, status);
			if(status===Constants.EXISTS){
				//The user exists and the permission can be written
			} else {
				perm.validator.invalid("username",errors.USER_DOES_NOT_EXIST);
			}
		});
	}
}

Permission.rule_definition = {
    name: "mino_permission",
    display_name: "Permission",
    type: "object",
    fields: [{
        name: "username",
        display_name: "Username",
        type: "string"
    },{
        name: "path",
        display_name: "Path",
        type: "string"
    },{
        name: "write",
        display_name: "Write",
        type: "boolean"
    }]
};

Permission.prototype.save = function(on_save_callback){
	var perm = this;

	var to_save = {
	    username: perm.username,
	    path: perm.path.toString(),
	    write: perm.write
	}

    logger.log(to_save);

    var tilde_path = perm.path.to_tilde_path();

    logger.log(tilde_path);

    new perm.handler.api.handlers.save(perm.handler.api, {
        "username": "Mino"
    }, {
        "objects": [
            {  
                "name": tilde_path,
                "path": "/"+perm.handler.user.username+"/permissions/sent/",
                "mino_permission": to_save
            },{  
                "name": tilde_path,
                "path": "/"+perm.username+"/permissions/received/",
                "mino_permission": to_save
            }
        ]
    }, {
    	bypass_path_checks: true
    }, function(save_err, save_res){
        logger.log(JSON.stringify(save_err,null,4), save_res);

        on_save_callback(perm,null,{
        	success: true
        })
    });
}

module.exports = Permission;