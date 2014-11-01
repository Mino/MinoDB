var logger = require('tracer').console();

var process_session = require('../../../MinoDB/ui_server/process_session');

exports.add_routes = function(browser_server) {

	var express_server = browser_server.express_server;

	var api_endpoint = require('./endpoints/api')(browser_server);

    express_server.post('/ajax/api', process_session(browser_server,true), api_endpoint);
}