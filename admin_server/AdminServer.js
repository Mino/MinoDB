var logger = require('tracer').console();

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var mustacheExpress = require('mustache-express');

var errorHandler = require('errorhandler');
var http = require('http');
var path = require('path');

var process_session = require('./process_session');

function AdminServer(options){
	var as = this;

    options = options || {};

    as.path = options.path || '/admin/';

	as.express_server = express();
    as.express_server.disable('etag');//Prevents 304s
    as.express_server.engine('mustache', mustacheExpress());
    as.express_server.set('views', path.join(__dirname, 'views'));
    as.express_server.set('view engine', 'mustache');
    as.express_server.use(cookieParser());
    as.express_server.use(bodyParser());
    as.express_server.use(morgan())
    as.express_server.use(errorHandler({ dumpExceptions: true, showStack: true }));
    as.express_server.use(express.static(path.join(__dirname, 'public')));

    as.plugin_server = express();
    as.express_server.use('/plugin_config/:plugin_name', function(req, res, next){
        logger.log("plugin_name ",req.params);
        var pm = as.minodb.plugin_manager;
        var plugin_details = pm.plugins[req.params.plugin_name];
        if(plugin_details.plugin.get_config_server!==undefined){
            var plugin_config_server = plugin_details.plugin.get_config_server();
            plugin_config_server.handle(req,res,next);
        } else {
            next();
        }
    });

    as.express_server.get('*', process_session(false), function(req, res) {
        
        var original_url = req.originalUrl;
        var mino_path = original_url.substring(0, original_url.length - req._parsedUrl.path.length)
        var site_path = mino_path+"/";
        
        res.render('index', {
            custom_fields: JSON.stringify(as.minodb.custom_fields),
            site_path: site_path,
            plugins: JSON.stringify(as.minodb.plugin_manager.list_plugins()),
            user: JSON.stringify(req.user)
        });
    })
}

AdminServer.prototype.info = function(){
    var as = this;

    return {
        name: "admin",
        display_name: "Admin"
    };
}

AdminServer.prototype.init = function(minodb){
    var as = this;

    as.minodb = minodb;
    minodb.server().use(as.path, as.express_server);
}

module.exports = AdminServer;