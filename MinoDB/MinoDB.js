var logger = require('tracer').console();

var express = require('express');
var errorHandler = require('errorhandler');

var PluginManager = require('./PluginManager');

var Core = require('./core/Core');
var AdminServer = require('../default_plugins/admin_server/AdminServer');
var APIServer = require('../default_plugins/api_server/APIServer');
var BrowserServer = require('../default_plugins/browser_server/BrowserServer');
var UIServer = require('./ui_server/UIServer');

var MinoSDK = require('minosdk');
var extend = require('extend');

var class_to_string = require('./class_to_string');

extend(MinoDB, MinoSDK);
function MinoDB(config, username /*optional*/){
    var mdb = this;

    MinoDB.superConstructor.call(this, username);

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
    mdb.add_plugin(
        mdb.ui_server,
        new AdminServer({}),
        new APIServer({}),
        new BrowserServer({})
    );
}

MinoDB.prototype.add_plugin = function(){
    var mdb = this;

    var plugin_args = arguments;

    var i = -1;
    var next = function(){
        i++;

        if(i>=plugin_args.length){
            return;
        }

        var arg = plugin_args[i];
        if(arg instanceof Function){
            if(arg.length===0){
                arg();
                next();
            } else {
                arg(next);
            }
        } else if(arg instanceof Object){
            var plugin = arg;
            var plugin_error = mdb.plugin_manager.add_plugin(plugin);

            if(plugin_error){
                throw new Error(JSON.stringify(plugin_error,null,4));
            }
            if(plugin.init.length===1){
                plugin.init(mdb);
                next();
            } else {
                plugin.init(mdb, next);
            }
        } else {
            throw new Error("Argument is not an object or function");
        }
    }
    next();

    return mdb;
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

    return mdb;
}

module.exports = MinoDB;