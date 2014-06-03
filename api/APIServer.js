var express = require('express');
var connect = require('connect');
var http = require('http');
var path = require('path');

var Validator = require('fieldval');
var bval = require('fieldval-basicval');
var logger = require('tracer').console();
var api = require('./api');
var crypt = require("../utils/crypt");
var process_api_request = require('./process_api_request');

function APIServer(minodb){
	var as = this;

	as.minodb = minodb;

	as.express_server = express();

    as.express_server.use(connect.compress());
    as.express_server.use(express.methodOverride());
    as.express_server.use(express.bodyParser());
    as.express_server.use(express.logger('dev'));
    as.express_server.use(express.errorHandler());

    as.express_server.post('/', process_api_request, function(req, res) {

        var user = req.user;
        var params = req.api_parameters;
        var user_api_key = req.user_api_key;

        var api_val = new Validator(params);
        var function_name = api_val.get("function_name", bval.string(true));
        var parameters = api_val.get("parameters", bval.object(true));

        var error = api_val.end();
        if(error){
            res.json(error);
        }

        as.minodb.api(user, function_name, parameters, function(api_err, api_res){
            if(api_err){
                api_val.invalid(api_err);
                res.json(api_val.end());
                return;
            }
            res.json(api_res);
            return;
        })
    })

    as.express_server.get('/*', function(req,res){
        res.send(400, 'All API requests must be POST');
    })
}

module.exports = APIServer;