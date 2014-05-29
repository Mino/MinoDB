var Validator = require('fieldval');
var bval = require('fieldval-basicval');
var Path = require('../Models/Path')
var logger = require('tracer').console();

module.exports = function(minodb, user, parameters, callback) {
    
    var validator = new Validator(parameters);
    var addresses = validator.get("addresses", bval.array(true));

    var val_error = validator.end();
    if (val_error != null) {
        callback(val_error);
        return;
    }

    var ids = [];
    var id_versions = [];
    var paths = [];
    var types = [];

    //Used to retrieve pointers (e.g. paths / ids - not id versions)
    var get_pointer_array = [];

    //Used to retrieve final objects
    var get_final_array = [];

    //Used to hold the objects ready to send in response
    var response_array = [];

    //Retains references to objects that will be returned, so they can be 
    //removed if the privileges aren't found
    var awaiting_privileges = [];

    // logger.log(val_error);
    // callback(val_error);
    // return;

    for (var i = 0; i < addresses.length; i++) {
        var this_address = addresses[i];

        logger.log("TESTING: " + this_address);

        var type_of = typeof this_address;

        var to_add_to_final;

        if (type_of == 'string') {

            var index_of_slash = this_address.indexOf('/');

            if (index_of_slash == -1) {
                //Could be a number or Type
                var numeric_value = +this_address;
                var is_integer = numeric_value % 1 == 0;
                if (isNaN(numeric_value) || !is_integer || numeric_value < 0) {
                    logger.log("Type?");
                } else {
                    ids.push([numeric_value, i]);
                }
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
                    paths.push([path, i]);
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
                    to_add_to_final = Validator.Error(0);
                } else {
                    logger.log([num_1, num_2, i]);
                    id_versions.push([num_1, num_2, i]);
                }
            }
        } else if (type_of == 'number') {

            var is_integer = this_address % 1 === 0;
            if (is_integer && this_address > 0) {
                ids.push([this_address, i]);
            } else {
                to_add_to_final = Validator.Error(0);
            }

        } else {
            to_add_to_final = Validator.Error(0);
        }

        logger.log(get_pointer_array);
        logger.log(get_final_array);

        response_array.push(to_add_to_final);
    }

    for (var i = 0; i < paths.length; i++) {
        var path_object = paths[i];
        var response_index = path_object[1];
        response_array[response_index] = {
            "ADDED": true
        };
    }

    callback({
        "objects": response_array
    })

}