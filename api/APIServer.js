var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var errorHandler = require('errorhandler');
var http = require('http');
var path = require('path');

var Validator = require('fieldval');
var BasicVal = require('fieldval-basicval');
var logger = require('tracer').console();
var api = require('./api');
var crypt = require("../utils/crypt");
var process_api_request = require('./process_api_request');

function APIServer(minodb){
	var as = this;

	as.minodb = minodb;

	as.express_server = express();

    as.express_server.use(cookieParser());
    as.express_server.use(bodyParser());
    as.express_server.use(morgan())
    as.express_server.use(errorHandler({ dumpExceptions: true, showStack: true }));

    as.express_server.post('/', process_api_request, function(req, res) {

        var user = req.user;
        var params = req.api_parameters;
        var user_api_key = req.user_api_key;

        as.minodb.api.call(user, params, function(api_err, api_res){
            logger.log(api_err);
            logger.log(api_res);
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