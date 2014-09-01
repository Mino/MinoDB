var logger = require('tracer').console();

module.exports = function(ui_server){
	
	return function(req, res){

		var api = ui_server.minodb.api;

	    logger.log(req.body);

		api.call({
			username: "TestUser"
		}, req.body ,function(api_err, api_res){
			logger.log(api_err);
			logger.log(api_res);
	        if(api_err){
	            res.json(api_err);
	            return;
	        }
	        res.json(api_res);
	        return;
		})
	}
}