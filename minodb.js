var logger = require('tracer').console();

var express = require('express');
var http = require('http');
var path = require('path');

var settings = require('./settings');
var API = require('./api/API');
var APIServer = require('./api/APIServer');
var UIServer = require('./ui/UIServer');

var class_to_string = require('./class_to_string');

function MinoDB(config){
    var mdb = this;

    logger.log(config);

    mdb.config = config;

    mdb.custom_fields = [];

    mdb._api_server = new APIServer(mdb);
    mdb._ui_server = new UIServer(mdb);

    mdb.api = new API(mdb, mdb.config.db_address);
}

MinoDB.ValidationRule = require('fieldval-rules');

MinoDB.prototype.add_field_type = function(field_data){
    var mdb = this;

    MinoDB.ValidationRule.RuleField.add_field_type(field_data);

    var as_string = class_to_string(field_data.class);
    field_data.string = as_string;
    field_data.class_name = field_data.class.name;

    mdb.custom_fields.push(field_data);
}

MinoDB.prototype.ui_server = function(){
    var mdb = this;
    return mdb._ui_server.express_server;
}

MinoDB.prototype.api_server = function(){
    var mdb = this;
    return mdb._api_server.express_server;
}

module.exports = MinoDB;