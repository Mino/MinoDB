var logger = require('tracer').console();
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var mustacheExpress = require('mustache-express');

function ConfigServer(plugin){
	var us = this;

	us.express_server = express();

    us.express_server.engine('mustache', mustacheExpress());
    us.express_server.set('views', path.join(__dirname, 'views'));
    us.express_server.set('view engine', 'mustache');

    us.express_server.use(bodyParser());
    us.express_server.use(express.static(path.join(__dirname, './public')));

    us.express_server.get('/*', function(req, res) {
        var original_url = req.originalUrl;
        var plugin_path = original_url.substring(0, original_url.length - req._parsedUrl.path.length) + '/'
        logger.log(original_url, plugin_path, req._parsedUrl.path);

        // throw "error";
        var params = {
            plugin_path: plugin_path,
        }
        res.render('index.mustache', params);
    });
}

module.exports = ConfigServer;