var express = require('express');
var connect = require('connect');
var http = require('http');
var path = require('path');

var settings = require('./settings');
var API = require('./api/API');
var APIServer = require('./api/APIServer');
var UIServer = require('./ui/UIServer');
var logger = require('tracer').console();

function MinoDB(config){
    var mdb = this;

    logger.log(config);

    mdb.config = config;

    mdb._api_server = new APIServer(mdb);
    mdb._ui_server = new UIServer(mdb);

    mdb.api = new API(mdb, mdb.config.db_address);
}

MinoDB.FieldValRules = require('fieldval-rules');

MinoDB.prototype.ui_server = function(){
    var mdb = this;
    return mdb._ui_server.express_server;
}

MinoDB.prototype.api_server = function(){
    var mdb = this;
    return mdb._api_server.express_server;
}

module.exports = MinoDB;