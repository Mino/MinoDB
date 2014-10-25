var logger = require('tracer').console();

exports.add_routes = function(browser_server) {

	var express_server = browser_server.express_server;

    express_server.post('/ajax/api', require('./endpoints/api')(browser_server))
}