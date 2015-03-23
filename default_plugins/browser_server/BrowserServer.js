var logger = require('tracer').console();

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var favicon = require('serve-favicon');
var mustacheExpress = require('mustache-express');

var errorHandler = require('errorhandler');
var http = require('http');
var path = require('path');

function BrowserServer(options){
	var bs = this;

    options = options || {};

    bs.path = options.path || '/browser/';

	
}

BrowserServer.prototype.get_config_server = function(){
    var bs = this;

    return bs.config_server;
}

BrowserServer.prototype.info = function(){
    var bs = this;

    return {
        name: "browser",
        display_name: "Browser"
    };
}

BrowserServer.prototype.init = function(minodb){
    var bs = this;

    bs.minodb = minodb;
    bs.auth = minodb.get_plugin("mino_auth");

    bs.express_server = express();
    bs.express_server.disable('etag');//Prevents 304s
    bs.express_server.engine('mustache', mustacheExpress());
    bs.express_server.set('views', path.join(__dirname, 'views'));
    bs.express_server.set('view engine', 'mustache');
    bs.express_server.use(cookieParser());
    bs.express_server.use(bodyParser());
    bs.express_server.use(express.static(path.join(__dirname, 'public')));
    require('./public_ajax/routes').add_routes(bs);

    bs.express_server.get('*', bs.auth.process_session({required:true}), function(req, res) {
        var site_path = path.join(req.mino_path,bs.path);
        var mino_user = null;
        if (req.user) {
            mino_user = req.user.mino_user;
        }
        res.render('public', {
            custom_fields: JSON.stringify(bs.minodb.custom_fields),
            plugin_scripts: JSON.stringify(bs.minodb.get_plugin_scripts(req.mino_path)),
            site_path: site_path,
            mino_path: req.mino_path,
            user: JSON.stringify(mino_user)
        });
    })

    bs.config_server = express();
    bs.config_server.disable('etag');//Prevents 304s
    bs.config_server.engine('mustache', mustacheExpress());
    bs.config_server.set('views', path.join(__dirname, 'views'));
    bs.config_server.set('view engine', 'mustache');
    bs.config_server.use(cookieParser());
    bs.config_server.use(bodyParser());
    bs.config_server.use(express.static(path.join(__dirname, 'admin')));
    require('./admin_ajax/routes').add_routes(bs);
    bs.config_server.get('*', bs.auth.process_session({required: true}), function(req, res) {
        var site_path = path.join(req.mino_path,"/admin/plugin_config/",bs.info().name+"/");
        var mino_user = null;
        if (req.user) {
            mino_user = req.user.mino_user;
        }
        res.render('admin', {
            custom_fields: JSON.stringify(bs.minodb.custom_fields),
            site_path: site_path,
            mino_path: req.mino_path,
            user: JSON.stringify(mino_user)
        });
    })

    bs.express_server.use(errorHandler({ showStack: true, dumpExceptions: true}));

    minodb.internal_server().use(bs.path, bs.express_server);
}

module.exports = BrowserServer;