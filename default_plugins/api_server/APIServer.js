var logger = require('mino-logger');

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var errorHandler = require('errorhandler');
var http = require('http');
var path = require('path');

var FieldVal = require('fieldval');
var BasicVal = FieldVal.BasicVal;
var logger = require('mino-logger');
var crypt = require("./crypt");
var process_api_request = require('./process_api_request');

function APIServer(options){
	var as = this;

	as.express_server = express();

    as.path = options.path || '/api/';

    as.express_server.use(cookieParser());
    as.express_server.use(bodyParser.json());
    as.express_server.use(morgan('combined'))

    as.express_server.post('/', process_api_request, function(req, res) {

        var user = req.user;
        var params = req.api_parameters;
        var user_api_key = req.user_api_key;

        as.minodb.api.call(user, params, function(api_err, api_res){
            logger.debug(api_err);
            logger.debug(api_res);
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

    as.config_server = express();
    as.config_server.get('*', function(req, res){
        res.send("API CONFIG")
    })

    as.express_server.use(errorHandler({ showStack: true, dumpExceptions: true}));
}

APIServer.prototype.get_config_server = function(){
    var as = this;

    return as.config_server;
}

APIServer.prototype.info = function(){
    var as = this;

    return {
        name: "api",
        display_name: "API"
    };
}

APIServer.prototype.init = function(minodb){
    var as = this;

    as.minodb = minodb;
    minodb.internal_server().use(as.path, as.express_server);
}

module.exports = APIServer;