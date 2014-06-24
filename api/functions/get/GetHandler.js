var FieldVal = require('fieldval');
var bval = require('fieldval-basicval');
var Path = require('../../../common_classes/Path')
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
    gh.rules = [];

    var validator = new FieldVal(parameters);

    //Retains references to objects that will be returned, so they can be 
    //added if the privileges are found
    var awaiting_privileges = [];

    // logger.log(val_error);
    // callback(val_error);
    // return;

    var addresses = validator.get("addresses", bval.array(true), bval.each(function(this_address, index){

        logger.log("TESTING: ", this_address);

        var type_of = typeof this_address;

        var to_add_to_final;

        if (type_of == 'string') {

            var index_of_slash = this_address.indexOf('/');

            if (index_of_slash == -1) {
                //Could be a number or Type
                var numeric_value = this_address;
                var is_integer = numeric_value % 1 == 0;
                if (isNaN(numeric_value) || !is_integer || numeric_value < 0) {
                    gh.rules.push([this_address, index]);
                } else {
                    gh.ids.push([numeric_value, index]);
                }
                to_add_to_final = null;
            } else if (index_of_slash == 0) {
                //First char is slash - must be path
                logger.log("path");

                var path = new Path();
                var path_error = path.init(this_address);
                if (path_error != null) {
                    to_add_to_final = path_error;
                } else {
                    //Valid path
                    to_add_to_final = null;
                    gh.paths.push([path, index]);
                }
            } else {
                //Could be id/version
                var split_1 = this_address.substring(0, index_of_slash);
                var num_1 = +split_1;
                var is_integer_1 = num_1 % 1 == 0;
                var split_2 = this_address.substring(index_of_slash + 1);
                var num_2 = +split_2;
                var is_integer_2 = num_2 % 1 == 0;

                if (isNaN(num_1) || !is_integer_1 || num_1 < 1 || isNaN(num_2) || !is_integer_2 || num_2 < 1) {
                    to_add_to_final = FieldVal.Error(0);
                } else {
                    logger.log([num_1, num_2, index]);
                    gh.id_versions.push([num_1, num_2, index]);
                }
            }
        } else if (type_of == 'number') {

            var is_integer = this_address % 1 === 0;
            if (is_integer && this_address > 0) {
                gh.ids.push([this_address, index]);
            } else {
                to_add_to_final = FieldVal.Error(0);
            }

        } else {
            to_add_to_final = FieldVal.Error(0);
        }

        gh.response_array.push(to_add_to_final);
    }));

    var val_error = validator.end();
    if (val_error != null) {
        gh.callback(val_error);
        return;
    }

    gh.waiting_for = gh.ids.length +
        gh.id_versions.length +
        gh.paths.length +
        gh.rules.length;

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

    for (var i = 0; i < gh.rules.length; i++) {
        var rule_object = gh.rules[i];

        gh.get_rule(rule_object);
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

GetHandler.prototype.get_rule = function(rule_object){
    var gh = this;

    var rule_name = rule_object[0];
    var response_index = rule_object[1];
    
    gh.db.rule_collection.findOne({
        "name": rule_name
    }, function(err, res){
        logger.log(err);
        logger.log(res);
        if(res){
            //NEED PERMISSIONS CHECK
            gh.response_array[response_index] = res;
        } else {

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