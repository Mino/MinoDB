var errors = require('../../../errors')
var Validator = require('fieldval');
var bval = require('fieldval-basicval');
var Path = require('../../../common_classes/Path')
var ValidationRule = require('fieldval-rules');
var PathPermissionChecker = require('../../Models/PathPermissionChecker');
var SaveObject = require('./SaveObject')
var logger = require('tracer').console();

function SaveHandler(api, user, parameters, callback){
    var sh = this;

    sh.api = api;
    sh.user = user;
    sh.parameters = parameters;
    sh.callback = callback;

    sh.save_objects = [];
    sh.types_to_retrieve = {};

    sh.path_permission_checker = new PathPermissionChecker(sh);

    sh.validator = new Validator(parameters);

    sh.objects_validator = new Validator(null);//No object to validate

    var objects = sh.validator.get("objects", bval.array(true), bval.each(function(object, index){
        logger.log(object);
        logger.log(index);

        sh.save_objects.push(new SaveObject(object,sh,index));
    }));


    var objects_error = sh.objects_validator.end();
    if(objects_error){
        sh.validator.invalid("objects",objects_error);
        callback(sh.validator.end());
        return;
    }

    sh.result = {};
    sh.result_object_array = new Array(sh.save_objects.length);

    sh.retrieve_rules();
    sh.path_permission_checker.retrieve_permissions(function(){

        //Turn the path_permission_checker to immediate_mode to make subsequent permission checks immediate
        sh.path_permission_checker.immediate_mode = true;

        //NEED TO PREVENT SOME ITEMS FROM CONTINUING

        sh.finished_saving = function(){

            var objects_error = sh.objects_validator.end();
            if(objects_error){
                sh.validator.invalid("objects",objects_error);
                callback(sh.validator.end());
                return;
            }

            var returning = {
                objects: sh.result_object_array
            };

            callback(null, returning);
        }
        sh.do_saving();
    });
}

SaveHandler.prototype.request_rule = function(type_name, save_object){
    var sh = this;

    var existing = sh.types_to_retrieve[type_name];
    if(existing===undefined){
        existing = [];
        sh.types_to_retrieve[type_name] = existing;
    }
    existing.push(save_object);
}

SaveHandler.prototype.retrieve_rules = function(){
    var sh = this;

    //TODO replace mocking
    var person_rule = new ValidationRule();
    person_rule.init({
        "description": "A person type",
        "name": "person",
        "display_name": "Person",
        "fields": [{
            "name": "first_name",
            "display_name": "First Name",
            "type": "Text",
            "min_length": 2,
            "max_length": 32
        },{
            "name": "last_name",
            "display_name": "Last Name",
            "type": "Text",
            "min_length": 2,
            "max_length": 32
        }]
    });

    for(var i in sh.types_to_retrieve){
        var save_objects = sh.types_to_retrieve[i];
        if(i==="person"){
            for(var k = 0; k < save_objects.length; k++){
                var save_object = save_objects[k];
                save_object.got_rule(null, person_rule);
            }
        }
    }

    for(var i = 0; i < sh.save_objects.length; i++){
        var save_object = sh.save_objects[i];

        var error = save_object.validator.end();
        if(error!=null){
            sh.objects_validator.invalid(save_object.index, error);
        }
    }
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
        
        save_object.do_saving();
    }    
}

SaveHandler.prototype.finished_saving_object = function(save_object,error,save_details){
    var sh = this;

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

}

module.exports = SaveHandler;