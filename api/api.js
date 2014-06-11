var Validator = require('fieldval');
var bval = require('fieldval-basicval');
var logger = require('tracer').console();

var get_handler = require('./functions/get.js');
var save_handler = require('./functions/save.js');

function API(minodb){
	var api = this;

	api.minodb = minodb;
}

API.prototype.call = function(user, request, callback){
	var api = this;

    var api_val = new FieldVal(request);

    var function_name = api_val.get("function", bval.string(true), bval.one_of(["get","save"]));
    var parameters = api_val.get("parameters", bval.object(true));

    var handler = null;
    if (function_name === "get") {
        handler = get_handler;
    } else if (function_name === "save") {
        handler = save_handler;
    }

    var error = api_val.end();
    if(error){
        callback(error);
        return;
    }

    if (handler != null) {
        handler(api.mino_db, user, parameters, function(error, response) {
            logger.log(error);
            logger.log(response);
            if (error != null) {
                return callback(api_val.invalid("parameters", {
                    error: 0,
                    error_message: "One or more errors occurred",
                    data: error
                }).end());
            } else {
                callback(null, response);
            }
        })
    }
}


module.exports = API;