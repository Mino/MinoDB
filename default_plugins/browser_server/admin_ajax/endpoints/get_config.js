var logger = require('mino-logger');

module.exports = function(browser_server){
	
	return function(req, res){
		res.json(browser_server.info());
	}
}