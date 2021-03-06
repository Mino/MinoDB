var logger = require('mino-logger');

var express = require('express');
var errorHandler = require('errorhandler');

var PluginManager = require('./PluginManager');
var SignalManager = require('./SignalManager');

var Core = require('./core/Core');
var AdminServer = require('../default_plugins/admin_server/AdminServer');
var APIServer = require('../default_plugins/api_server/APIServer');
var BrowserServer = require('../default_plugins/browser_server/BrowserServer');
var UIServer = require('./ui_server/UIServer');
var AuthPlugin = require('../default_plugins/auth/Auth');
var MinoDBPermissions = require('../default_plugins/permissions/MinoDbPermissions');

var MinoSDK = require('minosdk');
var extend = require('extend');

var class_to_string = require('./class_to_string');

var Common = require('../common_classes/Common');

extend(MinoDB, MinoSDK);
function MinoDB(config, username /*optional*/){
    var mdb = this;

    MinoDB.superConstructor.call(this, username);

    mdb.logger = logger;

    mdb.config = config;
    mdb.root_username = Common.ROOT_USERNAME;

    mdb.plugin_manager = new PluginManager(mdb);

    mdb.custom_fields = [];

    mdb.core = new Core(mdb, mdb.config.db_address);

    mdb.api = mdb.core;//.api is a more intuitive name for external references

    mdb.internal_express_server = express();
    mdb.internal_express_server.disable('etag');//Prevents 304s
    mdb.internal_express_server.use(errorHandler({ dumpExceptions: true, showStack: true }));

    mdb.express_server = express();
    mdb.express_server.disable('etag');//Prevents 304s
    mdb.express_server.use(errorHandler({ dumpExceptions: true, showStack: true }));
    mdb.express_server.use(function(req,res){
        var mino_path = req.originalUrl.substring(0, req.originalUrl.length - req._parsedUrl.path.length);
        if(mino_path==="" || mino_path[mino_path.length-1]!=="/"){
            mino_path+="/";
        }
        req.mino_path = mino_path;
        mdb.internal_express_server.handle(req,res,function(){
            mdb.ui_server.express_server.handle(req,res);
        });
    });

    mdb.signal_manager = new SignalManager(mdb);

    mdb.ui_server = new UIServer({});

    var auth = new AuthPlugin({
        name: "minodb_auth",
        display_name: "MinoDB Auth",
        user_path: "/MinoDB/users/",
        session_path: "/MinoDB/sessions/",
        cookie_name: "minodb_token",
        username: "MinoDB"
    });

    var permissions = new MinoDBPermissions({
        path: "/MinoDB/minodb_permissions/",
        name: "minodb_permissions",
        display_name: "MinoDB Permissions",
        username: "MinoDB"
    });

    auth.process_session_failed = function(req, res, next, options) {
        if(options.required){
            logger.debug(req.mino_path+"?redirect="+req.originalUrl);
            res.redirect(req.mino_path+"?redirect="+req.originalUrl);
            return;
        }
        next();
    };

    mdb.add_plugin(
        auth,
        permissions,
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
    };
    next();

    return mdb;
};

MinoDB.prototype.close = function(callback){
    var mdb = this;

    mdb.core.close(callback);
};

MinoDB.prototype.server = function(){
    var mdb = this;

    return mdb.express_server;
};

MinoDB.prototype.internal_server = function(){
    var mdb = this;

    return mdb.internal_express_server;
};

MinoDB.FVRule = require('fieldval-rules');

MinoDB.prototype.add_field_type = function(field_data){
    var mdb = this;

    MinoDB.FVRule.FVRuleField.add_field_type(field_data);

    var as_string = class_to_string(field_data.class);
    field_data.string = as_string;
    field_data.class_name = field_data.class.name;

    mdb.custom_fields.push(field_data);

    return mdb;
};

MinoDB.prototype.get_plugin_scripts = function(mino_path) {
    var mdb = this;
    var scripts = [];
    logger.debug(mino_path);
    for (var plugin_name in mdb.plugin_manager.plugins) {
        if (mdb.plugin_manager.plugins.hasOwnProperty(plugin_name)) {
            var plugin = mdb.plugin_manager.plugins[plugin_name].plugin;
            if (typeof plugin.get_scripts === "function") {
                var plugin_scripts = plugin.get_scripts();
                for (var i=0; i<plugin_scripts.length; i++) {
                    plugin_scripts[i] = mino_path + plugin_scripts[i];
                    logger.debug(plugin_scripts[i]);
                }
                scripts = scripts.concat(plugin_scripts);
            }
        }
    }
    logger.debug("SCRIPTS", scripts);
    return scripts;
};

MinoDB.prototype.add_signal = function(signal) {
    var mdb = this;
    mdb.signal_manager.add_signal(signal);
};

MinoDB.prototype.get_plugin = function(name) {
    var mdb = this;
    return mdb.plugin_manager.plugins[name].plugin;
};

MinoDB.Signal = require('./core/models/Signal');
MinoDB.Auth = require('../default_plugins/auth/Auth');
MinoDB.Permissions = require('../default_plugins/permissions/MinoDbPermissions');
MinoDB.Path = require('../common_classes/Path.js');
MinoDB.User = require('./core/models/User.js');
MinoDB.SaveObject = require('./core/handlers/SaveHandler/SaveObject.js');

module.exports = MinoDB;
