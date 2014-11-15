var errors = require('../../../../errors')
var Validator = require('fieldval');
var BasicVal = require('fieldval-basicval');
var Path = require('../../../../common_classes/Path')
var ValidationRule = require('fieldval-rules');
var PathPermissionChecker = require('../../models/PathPermissionChecker');
var DeleteObject = require('./DeleteObject')
var logger = require('tracer').console();

function DeleteHandler(api, user, parameters, callback){
    var dh = this;

    dh.api = api;
    dh.user = user;
    dh.parameters = parameters;
    dh.callback = callback;

    dh.delete_objects = [];
    
    dh.permissions_checked = false;

    dh.path_permission_checker = new PathPermissionChecker(dh,{
        for_write: true
    });

    dh.validator = new Validator(parameters);

    dh.objects_validator = new Validator(null);//No object to validate

    var objects = dh.validator.get("addresses", BasicVal.array(true), BasicVal.each(function(address, index){
        dh.delete_objects.push(new DeleteObject(address, dh,index));
    }));


    dh.result = {};
    dh.result_object_array = new Array(dh.delete_objects.length);

    dh.path_permission_checker.retrieve_permissions(function(){

        //Turn the path_permission_checker to immediate_mode to make subsequent permission checks immediate
        dh.path_permission_checker.immediate_mode = true;

        dh.permissions_checked = true;

        dh.check_ready_to_delete();
    });
}

DeleteHandler.prototype.check_ready_to_delete = function(){
    var dh = this;

    if(dh.permissions_checked){
        logger.log("FINISHED GETTING RULES AND PERMISSIONS");

        logger.log(dh.objects_validator);

        for(var i = 0; i < dh.delete_objects.length; i++){
            var delete_object = dh.delete_objects[i];

            var object_error = delete_object.error;

            logger.log(object_error);

            if(object_error){
                logger.log(object_error);
                logger.log(delete_object.index);
                dh.objects_validator.invalid(delete_object.index, object_error);
            }
        }

        var objects_error = dh.objects_validator.end();
        if(objects_error){
            dh.validator.invalid("objects",objects_error);
            dh.callback(dh.validator.end());
            return;
        }


        dh.finished_deleting = function(){

            var objects_error = dh.objects_validator.end();
            if(objects_error){
                dh.validator.invalid("objects",objects_error);
                dh.callback(dh.validator.end());
                return;
            }

            var returning = {
                objects: dh.result_object_array
            };

            dh.callback(null, returning);
        }
        dh.do_deleting();
    }
}

DeleteHandler.prototype.do_deleting = function(callback){
    var dh = this;

    var jsons = [];

    dh.total = dh.delete_objects.length;
    dh.completed = 0;

    logger.log(dh.total);

    if(dh.total===0){
        dh.finished_deleting();
        return;
    }

    for(var i = 0; i < dh.total; i++){
        var delete_object = dh.delete_objects[i];
        
        delete_object.do_deleting(function(delete_object,error,delete_details){
            logger.log(error);
            if(error){
                dh.result_object_array[delete_object.index] = error;
                dh.objects_validator.invalid(""+delete_object.index,error);
            } else {
                dh.result_object_array[delete_object.index] = delete_details;
            }

            dh.completed++;
            logger.log(dh.completed + " : " +dh.total);
            if(dh.completed===dh.total){
                dh.finished_deleting();
            }
        });
    }    
}

module.exports = DeleteHandler;