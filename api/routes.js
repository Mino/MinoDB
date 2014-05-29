var Validator = require('fieldval');
var bval = require('fieldval-basicval');
var logger = require('tracer').console();
var api = require('./api');
var crypt = require("../utils/crypt");
var process_api_request = require('./process_api_request');

var get_handler = require('./functions/get.js');
var save_handler = require('./functions/save.js');

exports.add_routes = function(server) {

    server.post('/api/', process_api_request, function(req, res) {

        var user = req.user;
        var params = req.api_parameters;
        var user_api_key = req.user_api_key;

        var api_val = new Validator(params);
        var function_name = api_val.get("function_name", bval.string(true));
        var parameters = api_val.get("parameters", bval.object(true));

        if (function_name != null && parameters != null) {
            //Can process request

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
        } else {
            return res.json(api_val.end());
        }
    })

}