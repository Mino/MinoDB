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

function UIServer(minodb){
	var us = this;

	us.minodb = minodb;

	us.express_server = express();

    us.express_server.disable('etag');//Prevents 304s
    us.express_server.engine('mustache', mustacheExpress());
    us.express_server.set('views', path.join(__dirname, 'views'));
    us.express_server.set('view engine', 'mustache');

    us.express_server.use(cookieParser());
    us.express_server.use(bodyParser());
    us.express_server.use(morgan())
    us.express_server.use(errorHandler({ dumpExceptions: true, showStack: true }));
    us.express_server.use(express.static(path.join(__dirname, 'public')));
    us.express_server.disable('etag');//Prevents 304s

    require('./ajax/routes').add_routes(us);

    us.express_server.get('*', process_session(false), function(req, res) {
        res.render('index', {
            custom_fields: JSON.stringify(us.minodb.custom_fields),
            ui_path: "/ui/",
            user: JSON.stringify(req.user)
        });
    })
}

module.exports = UIServer;