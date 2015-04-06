var logger = require('mino-logger');

exports.add_routes = function(browser_server) {

	var express_server = browser_server.express_server;

	var api_endpoint = require('./endpoints/api')(browser_server);

    express_server.post('/ajax/api', browser_server.auth.process_session({required:true}), api_endpoint);
}