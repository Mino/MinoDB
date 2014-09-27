var logger = require('tracer').console();

var express = require('express');
var http = require('http');
var path = require('path');

var settings = require('./settings');
var API = require('./core/API');
var APIServer = require('./api_server/APIServer');
var UIServer = require('./ui_server/UIServer');

var class_to_string = require('./class_to_string');

function MinoDB(config){
    var mdb = this;

    logger.log(config);

    mdb.config = config;

    mdb.custom_fields = [];

    mdb.api = new API(mdb, mdb.config.db_address);

    mdb.express_server = express();
    mdb.express_server.disable('etag');//Prevents 304s

    mdb.add_plugin(new APIServer({

    }));
    mdb.add_plugin(new UIServer({

    }));

    mdb.express_server.get('/*', function(req,res){
        res.send(400, 'MINO!');
    })
}

MinoDB.prototype.add_plugin = function(plugin){
    var mdb = this;

    plugin.init(mdb);
}

MinoDB.prototype.server = function(){
    var mdb = this;

    return mdb.express_server;
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