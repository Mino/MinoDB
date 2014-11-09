var logger = require('tracer').console();

var MinoSDK = require('minosdk');

module.exports = function(browser_server){
	
	return function(req, res){

		logger.log("req.user ",req.user);

		var sdk = new MinoSDK(req.user.username);
		sdk.set_local_api(browser_server.minodb.api);

		sdk.call(req.body ,function(api_err, api_res){
	        if(api_err){
	            res.json(api_err);
	            return;
	        }
	        res.json(api_res);
	        return;
		})
	}
}