var express = require('express');
var connect = require('connect');
var http = require('http');
var path = require('path');

var settings = require('./settings');
var api = require('./api/api');
var process_session = require('./utils/process_session');
var logger = require('tracer').console();

var db = require('./database');

db.connect(function(err){
    if(err) throw err;

    var server = express();
    server.set('port', process.env.PORT || 5001);
    server.set('views', path.join(__dirname, 'views'));
    server.set('view engine', 'jade')
    server.use(connect.compress());
    server.use(express.methodOverride());
    server.use(express.cookieParser());
    server.use(express.bodyParser());
    server.use(express.static(path.join(__dirname, 'public')));
    server.use(express.logger('dev'));
    server.use(express.errorHandler());

    require('./ajax/routes').add_routes(server);
    require('./api/routes').add_routes(server);

    server.get('/*', process_session(false), function(req, res) {
        res.render('index', {
            page_data: {
                "user": req.user
            }
        });
    })

    http.createServer(server).listen(server.get('port'), function() {
        console.log('Server started on port ' + server.get('port'));
    });
})