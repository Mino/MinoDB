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

        as.minodb.api.call(user, params, function(api_err, api_res){
            if(api_err){
                res.json(api_err);
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