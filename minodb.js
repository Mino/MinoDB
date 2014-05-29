var express = require('express');
var connect = require('connect');
var http = require('http');
var path = require('path');

var settings = require('./settings');
var DataStore = require('./datastore');
var api = require('./api/api');
var process_session = require('./utils/process_session');
var logger = require('tracer').console();

function MinoDB(config){
    var mdb = this;

    logger.log(config);

    mdb.config = config;

    mdb.ds = new DataStore({
        address: mdb.config.db_address
    })
}

MinoDB.prototype.connect = function(callback){
    var mdb = this;

    mdb.ds.connect(function(err){
        if(err) throw err;

        callback();
    })
}

MinoDB.prototype.ui_server = function(){
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
            path: "/minodb/",
            page_data: {
                user: req.user
            }
        });
    })

    return server;
}

module.exports = MinoDB;