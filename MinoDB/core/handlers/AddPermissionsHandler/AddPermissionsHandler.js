var errors = require('../../../../errors')
var Validator = require('fieldval');
var BasicVal = require('fieldval-basicval');
var Path = require('../../../../common_classes/Path')
var FVRule = require('fieldval-rules');
var PathPermissionChecker = require('../../models/PathPermissionChecker');
var FolderChecker = require('../../models/FolderChecker');
var Permission = require('./Permission')
var logger = require('tracer').console();

function AddPermissionsHandler(api, user, parameters, callback){
    var aph = this;

    aph.api = api;
    aph.user = user;
    aph.parameters = parameters;
    aph.callback = callback;

    aph.perms = [];

    aph.folder_checker = new FolderChecker(aph);

    aph.validator = new Validator(parameters);

    aph.perms_validator = new Validator(null);//No object to validate

    var perms = aph.validator.get("permissions", BasicVal.array(true), BasicVal.each(function(object, index){
        var error = BasicVal.object(true).check(object); if(error) return error;
        logger.log(object);
        logger.log(index);

        aph.perms.push(new Permission(object,aph,index));
    }));


    aph.result = {};
    aph.result_perm_array = new Array(aph.perms.length);

    aph.folder_checker.retrieve_existances(function(){
        aph.check_ready_to_save();
    });
}

AddPermissionsHandler.prototype.check_ready_to_save = function(){
    var aph = this;

    logger.log(aph.perms_validator);

    for(var i = 0; i < aph.perms.length; i++){
        var perm = aph.perms[i];

        var perm_error = perm.validator.end();

        if(perm_error){
            logger.log(perm_error);
            logger.log(perm.index);
            aph.perms_validator.invalid(perm.index, perm_error);
        }
    }

    var perms_error = aph.perms_validator.end();
    if(perms_error){
        aph.validator.invalid("permissions",perms_error);
        aph.callback(aph.validator.end());
        return;
    }


    aph.finished_saving = function(){

        logger.log("finished_saving");

        var perms_error = aph.perms_validator.end();
        if(perms_error){
            aph.validator.invalid("permissions",perms_error);
            aph.callback(aph.validator.end());
            return;
        }

        var returning = {
            perms: aph.result_perm_array
        };

        aph.callback(null, returning);
    }
    aph.do_saving();
}

AddPermissionsHandler.prototype.do_saving = function(callback){
    var aph = this;

    var jsons = [];

    aph.total = aph.perms.length;
    aph.completed = 0;

    logger.log(aph.total);

    if(aph.total===0){
        aph.finished_saving();
        return;
    }

    for(var i = 0; i < aph.total; i++){
        var perm = aph.perms[i];
        
        perm.save(function(perm,error,save_details){
            logger.log(error);
            if(error){
                aph.result_perm_array[perm.index] = error;
                aph.perms_validator.invalid(""+perm.index,error);
            } else {
                aph.result_perm_array[perm.index] = save_details;
            }

            aph.completed++;
            logger.log(aph.completed + " : " +aph.total);
            if(aph.completed===aph.total){
                aph.finished_saving();
            }
        });
    }    
}

module.exports = AddPermissionsHandler;