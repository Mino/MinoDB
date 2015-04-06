var logger = require('mino-logger');

module.exports = function(ui_server){
	
	return function(req,res){

		ui_server.auth.sign_out(res);

	    res.json({
	    	success: true
	    });
	}
}