var errors = require('../../../../errors')
var FieldVal = require('fieldval');
var BasicVal = FieldVal.BasicVal;
var Path = require('../../../../common_classes/Path')
var FVRule = require('fieldval-rules');
var PathPermissionChecker = require('../../models/PathPermissionChecker');
var FolderChecker = require('../../models/FolderChecker');
var SaveObject = require('./SaveObject')
var logger = require('mino-logger');

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

    sh.validator = new FieldVal(parameters);

    sh.objects_validator = new FieldVal(null);//No object to validate

    var objects = sh.validator.get("objects", BasicVal.array(true), BasicVal.each(function(object, index){
        var error = BasicVal.object(true).check(object); if(error) return error;
        logger.debug(object);
        logger.debug(index);

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
        logger.debug("FINISHED GETTING RULES, PERMISSIONS AND FOLDER EXISTANCES");

        logger.debug(sh.objects_validator);

        for(var i = 0; i < sh.save_objects.length; i++){
            var save_object = sh.save_objects[i];

            var object_error = save_object.validator.end();

            if(object_error){
                logger.debug(object_error);
                logger.debug(save_object.index);
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

    logger.debug(sh.types_to_items);

    var type_addresses = [];
    for(var i = 0; i < sh.types_to_retrieve.length; i++){
        type_addresses.push("/" + sh.api.minodb.root_username + "/types/"+sh.types_to_retrieve[i]);
    }

    logger.debug(sh.api.minodb.root_username);
    new sh.api.handlers.get(sh.api, {
        "username": sh.api.minodb.root_username
    }, {
        "addresses": type_addresses
    }, function(get_err, get_res){
        logger.debug(type_addresses, sh.parameters.objects, get_err, get_res);

        if(get_err){
            throw new Error("Unexpected error");
        }

        var waiting_for = 0;
        var finished_one = function() {
            waiting_for--;
            if (waiting_for <= 0) {
                sh.types_retrived = true;
                sh.check_ready_to_save();
            }
        }

        var validating = false;
        for(var i = 0; i < sh.types_to_retrieve.length; i++){
            var res = get_res.objects[i];
            
            if (res) {
                var type_name = sh.types_to_retrieve[i];
                waiting_for+=sh.types_to_items[type_name].length;    
            }
        }

        for(var i = 0; i < sh.types_to_retrieve.length; i++){
            var type_name = sh.types_to_retrieve[i];
            var res = get_res.objects[i];
            var save_objects = sh.types_to_items[type_name];

            if(res){
                logger.debug(res);
                var validation_type = new FVRule();
                var type_init = validation_type.init(res['minodb_type']);
                logger.debug(validation_type);
                logger.debug(type_init);
                
                validating = true;
                for(var k = 0; k < save_objects.length; k++){
                    var save_object = save_objects[k];
                    save_object.got_type(type_name, null, validation_type, finished_one);
                }
            }
        }

        if (!validating) {
            finished_one();
        }
        
    });
}

SaveHandler.prototype.do_saving = function(callback){
    var sh = this;

    var jsons = [];

    sh.total = sh.save_objects.length;
    sh.completed = 0;

    logger.debug(sh.total);

    if(sh.total===0){
        sh.finished_saving();
        return;
    }

    for(var i = 0; i < sh.total; i++){
        var save_object = sh.save_objects[i];
        
        save_object.do_saving(function(save_object,error,save_details){
            logger.debug(error);
            if(error){
                sh.result_object_array[save_object.index] = error;
                sh.objects_validator.invalid(""+save_object.index,error);
            } else {
                sh.result_object_array[save_object.index] = save_details;
            }

            sh.completed++;
            logger.debug(sh.completed + " : " +sh.total);
            if(sh.completed===sh.total){
                sh.finished_saving();
            }

            if (!error) {
                sh.api.minodb.signal_manager.trigger(sh.user, "save", save_object.saving_json, function(err, res) {
                  logger.debug(err,res);
                })    
            }
            
        });
    }    
}

module.exports = SaveHandler;