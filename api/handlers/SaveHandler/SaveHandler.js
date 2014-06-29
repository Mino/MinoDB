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
    sh.rules_to_retrieve = {};
    
    sh.permissions_checked = false;
    sh.waiting_for_rules = 0;

    sh.path_permission_checker = new PathPermissionChecker(sh);

    sh.validator = new Validator(parameters);

    sh.objects_validator = new Validator(null);//No object to validate

    var objects = sh.validator.get("objects", bval.array(true), bval.each(function(object, index){
        logger.log(object);
        logger.log(index);

        sh.save_objects.push(new SaveObject(object,sh,index));
    }));


    sh.result = {};
    sh.result_object_array = new Array(sh.save_objects.length);

    sh.retrieve_rules();
    sh.path_permission_checker.retrieve_permissions(function(){

        //Turn the path_permission_checker to immediate_mode to make subsequent permission checks immediate
        sh.path_permission_checker.immediate_mode = true;

        sh.permissions_checked = true;

        sh.check_ready_to_save();
    });
}

SaveHandler.prototype.request_rule = function(rule_name, save_object){
    var sh = this;

    var existing = sh.rules_to_retrieve[rule_name];
    if(existing===undefined){
        sh.waiting_for_rules++;
        existing = [];
        sh.rules_to_retrieve[rule_name] = existing;
    }
    existing.push(save_object);
}

SaveHandler.prototype.check_ready_to_save = function(){
    var sh = this;

    if(sh.waiting_for_rules===0 && sh.permissions_checked){
        logger.log("FINISHED GETTING RULES AND PERMISSIONS");

        logger.log(sh.objects_validator);

        for(var i = 0; i < sh.save_objects.length; i++){
            var save_object = sh.save_objects[i];

            var object_error = save_object.validator.end();

            logger.log(object_error);

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

SaveHandler.prototype.retrieve_rules = function(){
    var sh = this;

    logger.log(sh.rules_to_retrieve);

    for(var i in sh.rules_to_retrieve){
        sh.get_rule(i);
    }
}

SaveHandler.prototype.get_rule = function(name){
    var sh = this;

    var db = sh.api.ds;


    var save_objects = sh.rules_to_retrieve[name];

    logger.log("rule_collection.findOne() ",name);
    db.rule_collection.findOne({
        name: name
    },function(err, res){
        sh.waiting_for_rules--;
        logger.log(err);
        logger.log(res);
        if(res){
            logger.log(res);
            delete res._id;
            for(var i = 0; i < save_objects.length; i++){
                var save_object = save_objects[i];
                var validation_rule = new ValidationRule();
                var rule_init = validation_rule.init(res);
                logger.log(validation_rule);
                logger.log(rule_init);
                save_object.got_rule(name, null, validation_rule);
            }
        } else {
            // for(var i = 0; i < save_objects.length; i++){
            //     var save_object = save_objects[i];
            //     var error = save_object.validator.end();
            //     logger.log(error);
            //     if(error!=null){
            //         sh.objects_validator.invalid(save_object.index, error);
            //     }
            // }
        }
        sh.check_ready_to_save();
    })
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