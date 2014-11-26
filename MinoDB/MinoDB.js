var logger = require('tracer').console();

var express = require('express');
var http = require('http');
var path = require('path');
var errorHandler = require('errorhandler');

var PluginManager = require('./PluginManager');

var Core = require('./core/Core');
var AdminServer = require('../default_plugins/admin_server/AdminServer');
var APIServer = require('../default_plugins/api_server/APIServer');
var BrowserServer = require('../default_plugins/browser_server/BrowserServer');
var UIServer = require('./ui_server/UIServer');

var class_to_string = require('./class_to_string');

function MinoDB(config){
    var mdb = this;

    mdb.config = config;

    mdb.plugin_manager = new PluginManager(mdb);

    mdb.custom_fields = [];

    mdb.api = new Core(mdb, mdb.config.db_address);

    mdb.internal_express_server = express();
    mdb.internal_express_server.disable('etag');//Prevents 304s
    mdb.internal_express_server.use(errorHandler({ dumpExceptions: true, showStack: true }));

    mdb.express_server = express();
    mdb.express_server.disable('etag');//Prevents 304s
    mdb.express_server.use(errorHandler({ dumpExceptions: true, showStack: true }));
    mdb.express_server.use(function(req,res,next){
        var mino_path = req.originalUrl.substring(0, req.originalUrl.length - req._parsedUrl.path.length);
        if(mino_path==="" || mino_path[mino_path.length-1]!=="/"){
            mino_path+="/";
        }
        req.mino_path = mino_path;
        mdb.internal_express_server.handle(req,res,function(){
            mdb.ui_server.express_server.handle(req,res);
        });
    });

    mdb.ui_server = new UIServer({});
    mdb.add_plugin(mdb.ui_server);

    var admin_server = new AdminServer({});
    mdb.add_plugin(admin_server);
    mdb.add_plugin(new APIServer({}));
    mdb.add_plugin(new BrowserServer({}));
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

MinoDB.prototype.internal_server = function(){
    var mdb = this;

    return mdb.internal_express_server;
}

MinoDB.FVRule = require('fieldval-rules');

MinoDB.prototype.add_field_type = function(field_data){
    var mdb = this;

    MinoDB.FVRule.FVRuleField.add_field_type(field_data);

    var as_string = class_to_string(field_data.class);
    field_data.string = as_string;
    field_data.class_name = field_data.class.name;

    mdb.custom_fields.push(field_data);
}

module.exports = MinoDB;