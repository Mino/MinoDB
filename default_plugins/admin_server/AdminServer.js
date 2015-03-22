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

function AdminServer(options){
	var as = this;

    options = options || {};

    as.path = options.path || '/admin/';
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

    as.express_server = express();
    as.express_server.disable('etag');//Prevents 304s
    as.express_server.engine('mustache', mustacheExpress());
    as.express_server.set('views', path.join(__dirname, 'views'));
    as.express_server.set('view engine', 'mustache');
    as.express_server.use(cookieParser());
    as.express_server.use(bodyParser());
    as.express_server.use(express.static(path.join(__dirname, 'public')));

    var auth = as.minodb.get_plugin("mino_auth");
    as.express_server.use(auth.process_session({required:true}));
    as.express_server.use('/plugin_config/:plugin_name', function(req, res, next){
        var plugin_details = as.minodb.plugin_manager.plugins[req.params.plugin_name];
        if(plugin_details.plugin.get_config_server!==undefined){
            var plugin_config_server = plugin_details.plugin.get_config_server();
            plugin_config_server.handle(req,res,next);
        } else {
            res.send("No plugin config for: "+JSON.stringify(req.params.plugin_name))
        }
    });

    as.express_server.get('*', function(req, res) {

        var site_path = path.join(req.mino_path,as.path);
        res.render('index', {
            custom_fields: JSON.stringify(as.minodb.custom_fields),
            site_path: site_path,
            mino_path: req.mino_path,
            plugins: JSON.stringify(as.minodb.plugin_manager.list_plugins()),
            user: JSON.stringify(req.user)
        });
    })

    as.express_server.use(errorHandler({ showStack: true, dumpExceptions: true}));

    minodb.internal_server().use(as.path, as.express_server);
}

module.exports = AdminServer;