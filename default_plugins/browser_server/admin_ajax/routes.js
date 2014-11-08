var logger = require('tracer').console();

var process_session = require('../../../MinoDB/ui_server/process_session');

exports.add_routes = function(browser_server) {

	var config_server = browser_server.config_server;

	var get_config_endpoint = require('./endpoints/get_config')(browser_server);

    config_server.post('/ajax/get_config', process_session(browser_server,true), get_config_endpoint);
}