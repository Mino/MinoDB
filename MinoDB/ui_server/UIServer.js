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

function UIServer(options){
	var us = this;

    options = options || {};

    us.path = options.path || '/';

	us.express_server = express();
    us.express_server.disable('etag');//Prevents 304s
    us.express_server.engine('mustache', mustacheExpress());
    us.express_server.set('views', path.join(__dirname, 'views'));
    us.express_server.set('view engine', 'mustache');
    us.express_server.use(cookieParser());
    us.express_server.use(bodyParser());
    us.express_server.use(morgan())
    us.express_server.use(express.static(path.join(__dirname, 'public')));
    require('./ajax/routes').add_routes(us);

    us.express_server.get('/*', process_session(us,false), function(req, res) {
        
        var original_url = req.originalUrl;
        var mino_path = original_url.substring(0, original_url.length - req._parsedUrl.path.length)
        var site_path = mino_path+"/";
        
        logger.log("USER: ",req.user);

        res.render('index', {
            custom_fields: JSON.stringify(us.minodb.custom_fields),
            site_path: site_path,
            user: JSON.stringify(req.user || null),
            plugins: JSON.stringify(us.minodb.plugin_manager.list_plugins())
        });
    })

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
    // minodb.internal_server().use(us.path, us.express_server);
}

module.exports = UIServer;