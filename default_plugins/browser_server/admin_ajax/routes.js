var logger = require('mino-logger');

exports.add_routes = function(browser_server) {

	var config_server = browser_server.config_server;

	var get_config_endpoint = require('./endpoints/get_config')(browser_server);

    config_server.post('/ajax/get_config', browser_server.auth.process_session({required: true}), get_config_endpoint);
}