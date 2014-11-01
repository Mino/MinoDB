var logger = require('tracer').console();

module.exports = function(ui_server, require_session) {

    return function(req, res, next) {

    	var fail = function(){
    		logger.log("fail");
    		if(require_session){
    			logger.log("/mino/?redirect="+req.originalUrl);
	    		res.redirect("/mino/?redirect="+req.originalUrl);
	    		return;
	    	}
    		next();
    	}

    	logger.log("PROCESSING SESSION",req.originalUrl);
    	var current_token = req.cookies.mino_token;
    	logger.log("current_token ",current_token);
    	if(!current_token){
    		logger.log("A");
    		fail();
    		return;
    	}

    	var split = current_token.split("-");
    	if(split.length!==2){
    		logger.log("B");
    		fail();
    		return;
    	}

    	var id = split[0];
    	var key = split[1];

    	var api = ui_server.minodb.api;
    	new api.handlers.get(api, {
	        "username": "Mino"
	    }, {
	        "addresses": [
	            "/Mino/sessions/"+id
	        ]
	    }, function(get_err, get_res){
	        logger.log(get_err, get_res);

	        if(get_res && get_res.objects && get_res.objects[0]){
	        	var session = get_res.objects[0];
	        	if(session.mino_session && session.mino_session.key && session.mino_session.key===key){
	        		req.user = {
	        			username: session.mino_session.username
	        		}
	        		logger.log("SIGNED IN AS ",req.user)
	        		logger.log("C");
	        		next();
	        		return;
				}
	        }

	        logger.log("D");
	        fail();
	        return;
		});

		logger.log("E");
    }
}