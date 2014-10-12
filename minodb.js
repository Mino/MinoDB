var logger = require('tracer').console();

var express = require('express');
var http = require('http');
var path = require('path');

var PluginManager = require('./PluginManager');

var settings = require('./settings');
var Core = require('./core/Core');
var APIServer = require('./api_server/APIServer');
var UIServer = require('./ui_server/UIServer');

var class_to_string = require('./class_to_string');

function MinoDB(config){
    var mdb = this;

    logger.log(config);

    mdb.config = config;

    mdb.plugin_manager = new PluginManager(mdb);

    mdb.custom_fields = [];

    mdb.api = new Core(mdb, mdb.config.db_address);

    mdb.express_server = express();
    mdb.express_server.disable('etag');//Prevents 304s

    mdb.add_plugin(new APIServer({

    }));

    var ui_server = new UIServer({});
    mdb.add_plugin(ui_server);

    ui_server.start_plugin_config_server();

    mdb.express_server.get('/*', function(req,res){
        res.send(404, 'MINO 404');
    })
}

MinoDB.prototype.add_plugin = function(plugin){
    var mdb = this;

    var plugin_error = mdb.plugin_manager.add_plugin(plugin);

    if(plugin_error){
        throw new Error(JSON.stringify(plugin_error,null,4));
    }
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

module.exports = MinoDB;