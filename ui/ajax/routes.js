var logger = require('tracer').console();

exports.add_routes = function(ui_server) {

	var express_server = ui_server.express_server;

    express_server.post('/ajax/', function(req, res){

    	var api = ui_server.minodb.api;

        logger.log(req.body);

    	api.call({
    		username: "TestUser"
    	}, req.body ,function(api_err, api_res){
    		logger.log(api_err);
    		logger.log(api_res);
    		res.json(api_res)
    	})
    })

}