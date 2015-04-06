var logger = require('mino-logger');

exports.add_routes = function(auth_server) {

	var config_server = auth_server.config_server;

	var get_config_endpoint = require('./endpoints/get_config')(auth_server);

    config_server.post('/ajax/get_config', auth_server.minodb_auth.process_session({required: true}), get_config_endpoint);
}