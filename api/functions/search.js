var errors = require('../errors')
var db = require('../database');
var Validator = require('../../../FieldVal/fieldval-js/fieldval');
var bval = Validator.BasicVal;
var PathPermissionChecker = require('../Models/PathPermissionChecker');
var logger = require('tracer').console();

function SearchHandler(user, parameters, callback){
    var sh = this;

    sh.user = user;
    sh.parameters = parameters;
    sh.callback = callback;

    sh.path_permission_checker = new PathPermissionChecker(sh);

    sh.validator = new Validator(parameters);

    sh.paths = sh.validator.get("paths", bval.array(true));

    sh.path_permission_checker.retrieve_permissions(function(){

    });

    var error = sh.validator.end();
    if(error){
        callback(error);
        return;
    } else {
        sh.do_search(function(err,res){
            logger.log(err);
            logger.log(res);
        })
    }
}

SearchHandler.prototype.request_type = function(type_name, save_object){
    var sh = this;

    var existing = sh.types_to_retrieve[type_name];
    if(existing===undefined){
        existing = [];
        sh.types_to_retrieve[type_name] = existing;
    }
    existing.push(save_object);
}

SearchHandler.prototype.retrieve_types = function(){
    var sh = this;

    //TODO replace mocking
    var person_type = new TypeVersion("person");
    person_type.init({
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
                save_object.got_type(null, person_type);
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

SearchHandler.prototype.do_search = function(callback){
    var sh = this;

    db.object_collection.find({},function(err,res){
        if(err){
            callback(err);
        } else {
            res.toArray(function(array_err,array_res){
                callback(array_err,array_res);
            })
        }
    }) 
}

SearchHandler.prototype.finished_saving_object = function(save_object,error,save_details){
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

module.exports = function(user, parameters, callback){
    new SearchHandler(user, parameters, callback);
};
