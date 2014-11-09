var logger = require('tracer').console();

module.exports = function(ui_server){
	
	return function(req,res){

		res.clearCookie('mino_token', {
	        path: '/'
	    });

	    res.json({
	    	success: true
	    });
	}
}