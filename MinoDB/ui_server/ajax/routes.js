var logger = require('mino-logger');

exports.add_routes = function(ui_server) {

	var express_server = ui_server.express_server;
	
	express_server.post('/ajax/login', require('./endpoints/login')(ui_server))
	express_server.post('/ajax/sign_out', require('./endpoints/sign_out')(ui_server))
}