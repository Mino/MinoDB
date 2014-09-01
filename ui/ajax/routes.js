var logger = require('tracer').console();

exports.add_routes = function(ui_server) {

	var express_server = ui_server.express_server;

    express_server.post('/ajax/api', require('./endpoints/api')(ui_server))
    express_server.post('/ajax/login', require('./endpoints/login')(ui_server))

}