var logger = require('tracer').console();

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var favicon = require('serve-favicon');
var mustacheExpress = require('mustache-express');

var errorHandler = require('errorhandler');
var http = require('http');
var path = require('path');

var process_session = require('../../MinoDB/ui_server/process_session');

function BrowserServer(options){
	var bs = this;

    options = options || {};

    bs.path = options.path || '/browser/';

	bs.express_server = express();
    bs.express_server.disable('etag');//Prevents 304s
    bs.express_server.engine('mustache', mustacheExpress());
    bs.express_server.set('views', path.join(__dirname, 'views'));
    bs.express_server.set('view engine', 'mustache');
    bs.express_server.use(cookieParser());
    bs.express_server.use(bodyParser());
    bs.express_server.use(express.static(path.join(__dirname, 'public')));
    require('./ajax/routes').add_routes(bs);

    bs.express_server.get('*', process_session(bs,true), function(req, res) {
        var site_path = path.join(req.mino_path,bs.path);
        res.render('index', {
            custom_fields: JSON.stringify(bs.minodb.custom_fields),
            site_path: site_path,
            mino_path: req.mino_path,
            user: JSON.stringify(req.user || null)
        });
    })

    bs.config_server = express();
    bs.config_server.get('*', function(req, res){
        res.send("BROWSER CONFIG "+JSON.stringify(req.user));
    })

    bs.express_server.use(errorHandler({ showStack: true, dumpExceptions: true}));
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
    minodb.internal_server().use(bs.path, bs.express_server);
}

module.exports = BrowserServer;