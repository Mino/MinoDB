var FieldVal = require('fieldval');
var bval = require('fieldval-basicval');
var Path = require('../../../common_classes/Path')
var Common = require('../../../common_classes/Common')
var logger = require('tracer').console();

function GetHandler(api, user, parameters, callback) {
    var gh = this;

    gh.api = api;
    gh.db = gh.api.ds;

    //Used to hold the objects ready to send in response
    gh.response_array = [];
    gh.waiting_for = 0;

    gh.callback = callback;

    gh.ids = [];
    gh.id_versions = [];
    gh.paths = [];
    gh.types = [];

    var validator = new FieldVal(parameters);

    //Retains references to objects that will be returned, so they can be 
    //added if the privileges are found
    var awaiting_privileges = [];

    // logger.log(val_error);
    // callback(val_error);
    // return;

    var addresses = validator.get("addresses", bval.array(true), bval.each(function(this_address, index){

        logger.log("TESTING: ", this_address);

        var address_details = Common.get_resource_type(this_address);
        logger.log("address_details ",address_details);
        var address_type = address_details[0];
        var address_value = address_details[1];

        if(address_type==="type"){
            gh.types.push([address_value, index]);
        } else if(address_type==="path"){
            gh.paths.push([address_value, index]);
        } else if(address_type==="id"){
            gh.ids.push([address_value, index]);
        } else if(address_type==="id_version"){
            gh.id_versions.push([address_value, index]);
        } else {
            logger.log("address_type ",address_type);
            return FieldVal.Error(0)
        }

        gh.response_array.push(null);
    }));

    var val_error = validator.end();
    logger.log("val_error ", val_error)
    if (val_error != null) {
        gh.callback(val_error);
        return;
    }

    logger.log(gh.types);
    logger.log(gh.ids);
    logger.log(gh.id_versions);
    logger.log(gh.paths);

    gh.waiting_for = gh.ids.length +
        gh.id_versions.length +
        gh.paths.length +
        gh.types.length;

    logger.log("gh.waiting_for ", gh.waiting_for);

    if(gh.waiting_for === 0){
        gh.send_response();
        return;
    }

    for (var i = 0; i < gh.paths.length; i++) {
        var path_object = gh.paths[i];

        gh.get_path(path_object);
    }

    for (var i = 0; i < gh.ids.length; i++) {
        var id_object = gh.ids[i];

        gh.get_id(id_object);
    }

    for (var i = 0; i < gh.types.length; i++) {
        var type_object = gh.types[i];

        gh.get_type(type_object);
    }
}

GetHandler.prototype.get_id = function(id_object){
    var gh = this;

    var id = id_object[0];
    var response_index = id_object[1];
    
    gh.db.object_collection.findOne({
        "_id": id.toString()
    }, function(err, res){
        if(res){
            //NEED PERMISSIONS CHECK
            gh.response_array[response_index] = res;
        } else {

        }
        gh.waiting_for--;
        gh.check_if_done();
    })
}

GetHandler.prototype.get_path = function(path_object){
    var gh = this;

    var full_path = path_object[0];
    var response_index = path_object[1];
    
    logger.log("full_path ",full_path)
    gh.db.object_collection.findOne({
        "full_path":full_path.path_string
    }, function(err, res){
        if(res){
            //NEED PERMISSIONS CHECK
            gh.response_array[response_index] = res;
        } else {

        }
        gh.waiting_for--;
        gh.check_if_done();
    })
}

GetHandler.prototype.get_type = function(type_object){
    var gh = this;

    var type_name = type_object[0];
    var response_index = type_object[1];
    
    gh.db.object_collection.findOne({
        "full_path": "/Mino/types/"+type_name
    }, function(err, res){
        logger.log(err);
        logger.log(res);
        if(res){
            delete res._id;//Remove _id
            gh.response_array[response_index] = res['mino_type'];
        }
        gh.waiting_for--;
        gh.check_if_done();
    })
}

GetHandler.prototype.check_if_done = function(){
    var gh = this;

    logger.log("gh.waiting_for ",gh.waiting_for);
    if(gh.waiting_for===0){
        gh.send_response();
    }
}

GetHandler.prototype.send_response = function(){
    var gh = this;

    gh.callback(null, {
        "objects": gh.response_array
    })
}

module.exports = GetHandler;