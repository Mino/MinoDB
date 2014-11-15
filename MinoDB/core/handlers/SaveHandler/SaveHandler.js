var errors = require('../../../../errors')
var Validator = require('fieldval');
var BasicVal = require('fieldval-basicval');
var Path = require('../../../../common_classes/Path')
var ValidationRule = require('fieldval-rules');
var PathPermissionChecker = require('../../models/PathPermissionChecker');
var FolderChecker = require('../../models/FolderChecker');
var SaveObject = require('./SaveObject')
var logger = require('tracer').console();

function SaveHandler(api, user, parameters, options, callback){
    var sh = this;

    sh.api = api;
    sh.user = user;
    sh.parameters = parameters;
    if(typeof options === 'function'){
        sh.callback = options;
    } else {
        sh.callback = callback;
        sh.options = options;
    }

    sh.save_objects = [];
    sh.types_to_items = {};
    sh.types_to_retrieve = [];
    
    sh.permissions_checked = false;
    sh.folders_checked = false;
    sh.types_retrived = false;
    

    sh.path_permission_checker = new PathPermissionChecker(sh,{
        for_write: true
    });
    sh.folder_checker = new FolderChecker(sh);

    sh.validator = new Validator(parameters);

    sh.objects_validator = new Validator(null);//No object to validate

    var objects = sh.validator.get("objects", BasicVal.array(true), BasicVal.each(function(object, index){
        var error = BasicVal.object(true).check(object); if(error) return error;
        logger.log(object);
        logger.log(index);

        sh.save_objects.push(
            new SaveObject(
                object,
                sh,
                index,
                sh.options
            )
        );
    }));


    sh.result = {};
    sh.result_object_array = new Array(sh.save_objects.length);

    sh.retrieve_types();

    sh.path_permission_checker.retrieve_permissions(function(){

        //Turn the path_permission_checker to immediate_mode to make subsequent permission checks immediate
        sh.path_permission_checker.immediate_mode = true;
        sh.permissions_checked = true;
        sh.check_ready_to_save();
    });

    sh.folder_checker.retrieve_existances(function(){

        //Turn the path_permission_checker to immediate_mode to make subsequent permission checks immediate
        sh.folder_checker.immediate_mode = true;
        sh.folders_checked = true;
        sh.check_ready_to_save();
    });
}

SaveHandler.prototype.request_type = function(type_name, save_object){
    var sh = this;

    var existing = sh.types_to_items[type_name];
    if(existing===undefined){
        existing = [];
        sh.types_to_items[type_name] = existing;
        sh.types_to_retrieve.push(type_name);
    }
    existing.push(save_object);
}

SaveHandler.prototype.check_ready_to_save = function(){
    var sh = this;

    if(sh.permissions_checked && sh.types_retrived && sh.folders_checked){
        logger.log("FINISHED GETTING RULES, PERMISSIONS AND FOLDER EXISTANCES");

        logger.log(sh.objects_validator);

        for(var i = 0; i < sh.save_objects.length; i++){
            var save_object = sh.save_objects[i];

            var object_error = save_object.validator.end();

            if(object_error){
                logger.log(object_error);
                logger.log(save_object.index);
                sh.objects_validator.invalid(save_object.index, object_error);
            }
        }

        var objects_error = sh.objects_validator.end();
        if(objects_error){
            sh.validator.invalid("objects",objects_error);
            sh.callback(sh.validator.end());
            return;
        }


        sh.finished_saving = function(){

            var objects_error = sh.objects_validator.end();
            if(objects_error){
                sh.validator.invalid("objects",objects_error);
                sh.callback(sh.validator.end());
                return;
            }

            var returning = {
                objects: sh.result_object_array
            };

            sh.callback(null, returning);
        }
        sh.do_saving();
    }
}

SaveHandler.prototype.retrieve_types = function(){
    var sh = this;

    logger.log(sh.types_to_items);

    var type_addresses = [];
    for(var i = 0; i < sh.types_to_retrieve.length; i++){
        type_addresses.push("/Mino/types/"+sh.types_to_retrieve[i]);
    }

    new sh.api.handlers.get(sh.api, {
        "username": "Mino"
    }, {
        "addresses": type_addresses
    }, function(get_err, get_res){
        logger.log(get_err, get_res);

        if(get_err){
            throw new Error("Unexpected error");
        }

        for(var i = 0; i < sh.types_to_retrieve.length; i++){
            var type_name = sh.types_to_retrieve[i];
            var res = get_res.objects[i];

            var save_objects = sh.types_to_items[type_name];

            if(res){
                logger.log(res);
                var validation_type = new ValidationRule();
                var type_init = validation_type.init(res['mino_type']);
                logger.log(validation_type);
                logger.log(type_init);
                for(var k = 0; k < save_objects.length; k++){
                    var save_object = save_objects[k];
                    save_object.got_type(type_name, null, validation_type);
                }
            }
        }
        
        sh.types_retrived = true;
        sh.check_ready_to_save();
    });
}

SaveHandler.prototype.do_saving = function(callback){
    var sh = this;

    var jsons = [];

    sh.total = sh.save_objects.length;
    sh.completed = 0;

    logger.log(sh.total);

    if(sh.total===0){
        sh.finished_saving();
        return;
    }

    for(var i = 0; i < sh.total; i++){
        var save_object = sh.save_objects[i];
        
        save_object.do_saving(function(save_object,error,save_details){
            logger.log(error);
            if(error){
                sh.result_object_array[save_object.index] = error;
                sh.objects_validator.invalid(""+save_object.index,error);
            } else {
                sh.result_object_array[save_object.index] = save_details;
            }

            sh.completed++;
            logger.log(sh.completed + " : " +sh.total);
            if(sh.completed===sh.total){
                sh.finished_saving();
            }
        });
    }    
}

module.exports = SaveHandler;