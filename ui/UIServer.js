var express = require('express');
var connect = require('connect');
var http = require('http');
var path = require('path');

var logger = require('tracer').console();
var process_session = require('./process_session');

function UIServer(minodb){
	var us = this;

	us.minodb = minodb;

	us.express_server = express();

    us.express_server.set('views', path.join(__dirname, 'views'));
    us.express_server.set('view engine', 'jade')
    us.express_server.use(connect.compress());
    us.express_server.use(express.methodOverride());
    us.express_server.use(express.cookieParser());
    us.express_server.use(express.bodyParser());
    us.express_server.use(express.static(path.join(__dirname, 'public')));
    us.express_server.use(express.logger('dev'));
    us.express_server.use(express.errorHandler());
    us.express_server.disable('etag');//Prevents 304s

    require('./ajax/routes').add_routes(us);

    us.express_server.get('*', process_session(false), function(req, res) {
        res.render('index', {
            ui_path: "/ui/",
            page_data: {
                user: req.user
            }
        });
    })
}

module.exports = UIServer;