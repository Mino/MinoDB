var errors = require('../../../../errors');
var FieldVal = require('fieldval');
var BasicVal = FieldVal.BasicVal;
var Path = require('../../../../common_classes/Path')
var PathPermissionChecker = require('../../models/PathPermissionChecker');
var Common = require('../../../../common_classes/Common')
var Constants = require('../../../../common_classes/Constants');
var logger = require('mino-logger');

function GetHandler(api, user, parameters, callback) {
    var gh = this;

    gh.api = api;
    gh.user = user;
    gh.db = gh.api.ds;

    //Used to hold the objects ready to send in response
    gh.response_array = [];
    gh.waiting_for = 0;

    gh.callback = callback;

    gh.path_permission_checker = new PathPermissionChecker(gh);

    gh.ids = [];
    gh.id_versions = [];
    gh.paths = [];
    gh.types = [];

    var validator = new FieldVal(parameters);

    //Retains references to objects that will be returned, so they can be 
    //added if the privileges are found
    var awaiting_privileges = [];

    var addresses = validator.get("addresses", BasicVal.array(true), BasicVal.each(function(this_address, index){

        var address_details = Common.get_resource_type(this_address);
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
            return errors.INVALID_ADDRESS_FORMAT;
        }

        gh.response_array.push(null);
    }));

    var val_error = validator.end();
    if (val_error != null) {
        gh.callback(val_error);
        return;
    }

    gh.waiting_for = gh.ids.length +
        gh.id_versions.length +
        gh.paths.length +
        gh.types.length;

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
            var full_path = new Path();
            var path_error = full_path.init(res.full_path, {
                "allow_tilde": true
            });
            logger.debug(path_error);
            gh.path_permission_checker.check_permissions_for_path(full_path,function(status){
                if(status===Constants.WRITE_PERMISSION || status===Constants.READ_PERMISSION){
                    gh.response_array[response_index] = res;
                } else {
                    gh.response_array[response_index] = null;
                }
            });
        } else {
            gh.response_array[response_index] = null;
        }
        gh.waiting_for--;
        gh.check_if_done();
    })
}

GetHandler.prototype.get_path = function(path_object){
    var gh = this;

    var full_path = path_object[0];
    var response_index = path_object[1];
    
    gh.db.object_collection.findOne({
        "full_path":full_path.path_string
    }, function(err, res){
        if(res){
            var full_path = new Path();
            var path_error = full_path.init(res.full_path, true);
            logger.debug(res.full_path);
            logger.debug(path_error);
            gh.path_permission_checker.check_permissions_for_path(full_path,function(status){
                if(status===Constants.WRITE_PERMISSION || status===Constants.READ_PERMISSION){
                    gh.response_array[response_index] = res;
                } else {
                    gh.response_array[response_index] = null;
                }
            });
        } else {
            gh.response_array[response_index] = null;
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
        "full_path": "/" + gh.api.minodb.root_username + "/types/"+type_name
    }, function(err, res){
        // logger.debug(err);
        // logger.debug(res);
        if(res){
            delete res._id;//Remove _id
            gh.response_array[response_index] = res['minodb_type'];
        }
        gh.waiting_for--;
        gh.check_if_done();
    })
}

GetHandler.prototype.check_if_done = function(){
    var gh = this;

    if(gh.waiting_for===0){
        gh.send_response();
    }
}

GetHandler.prototype.send_response = function(){
    var gh = this;

    gh.path_permission_checker.retrieve_permissions(function(){
        gh.callback(null, {
            "objects": gh.response_array
        })
    });
}

module.exports = GetHandler;