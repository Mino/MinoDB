var logger = require('tracer').console();

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var favicon = require('serve-favicon');
var mustacheExpress = require('mustache-express');

var errorHandler = require('errorhandler');
var http = require('http');
var path = require('path');

function UIServer(options){
	var us = this;

    options = options || {};

	us.express_server = express();
    us.express_server.disable('etag');//Prevents 304s
    var mustache_engine = mustacheExpress();
    delete mustache_engine.cache;
    us.express_server.engine('mustache', mustache_engine);
    us.express_server.set('views', path.join(__dirname, 'views'));
    us.express_server.set('view engine', 'mustache');
    us.express_server.use(cookieParser());
    us.express_server.use(bodyParser());
    us.express_server.use(express.static(path.join(__dirname, 'public')));
    require('./ajax/routes').add_routes(us);

   
    us.config_server = express();
    us.config_server.get('*', function(req, res){
        res.send("UI CONFIG")
    })

    us.express_server.use(errorHandler({ showStack: true, dumpExceptions: true}));
}

UIServer.prototype.get_config_server = function(){
    var us = this;

    return us.config_server;
}

UIServer.prototype.info = function(){
    var us = this;

    return {
        name: "ui",
        display_name: "UI"
    };
}

UIServer.prototype.init = function(minodb){
    var us = this;

    us.minodb = minodb;

    us.auth = us.minodb.get_plugin('mino_auth');

    us.express_server.get('/toolbar.js', us.auth.process_session({required:false}), function(req, res) {
        logger.log("req.mino_path",req.mino_path);
        var minodb_user = null;
        if (req.user) {
            minodb_user = req.user.minodb_user;
        }
        res.render('toolbar', {
            mino_path: req.mino_path,
            user: JSON.stringify(minodb_user)
        });
    })

    us.express_server.get('/*', us.auth.process_session({required:false}), function(req, res) {
        var site_path = req.mino_path;
        var minodb_user = null;
        if (req.user) {
            minodb_user = req.user.minodb_user;
        }
        res.render('index', {
            custom_fields: JSON.stringify(us.minodb.custom_fields),
            site_path: site_path,
            user: JSON.stringify(minodb_user),
            plugins: JSON.stringify(us.minodb.plugin_manager.list_plugins())
        });
    })

}

module.exports = UIServer;