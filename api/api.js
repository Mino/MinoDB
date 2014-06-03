var Validator = require('fieldval');
var bval = require('fieldval-basicval');
var logger = require('tracer').console();

var get_handler = require('./functions/get.js');
var save_handler = require('./functions/save.js');

function API(minodb){
	var api = this;

	api.minodb = minodb;
}

API.prototype.call = function(user, function_name, parameters, callback){
	var api = this;

    var handler = null;
    if (function_name == "get") {
        handler = get_handler;
    } else if (function_name == "save") {
        handler = save_handler;
    }

    if (handler != null) {
        handler(user, parameters, function(error, response) {
            logger.log(error);
            logger.log(response);
            if (error != null) {
                return res.json(api_val.invalid("parameters", {
                    error: 0,
                    error_message: "One or more errors occurred",
                    data: error
                }).end());
            } else {
                res.json(response);
            }
        })
    } else {
        api_val.invalid("function_name", {
            error: 1000,
            error_message: "Unrecognized function requested"
        })
        //returning anything is unneccessary - it's just cleaner
        return res.json(api.end());
    }
}


module.exports = API;