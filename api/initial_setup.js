var logger = require('tracer').console();
var SaveObject = require('./handlers/SaveHandler/SaveObject');
var Type = require('./models/Type');

module.exports = function(api, callback){

    new api.handlers.save(api, {
        "username": "Mino"
    }, {
        "objects": [
            {
                "name": "types",
                "path": "/Mino/",
                "folder": true
            },
            {
                "name": "users",
                "path": "/Mino/",
                "folder": true
            }
        ]
    }, function(save_err, save_res){
        logger.log(JSON.stringify(save_err,null,4), save_res);

	    //Save the "mino_type" type definition without checks
	    var so = new SaveObject({
	        "name": "mino_type",
	        "path": "/Mino/types/",
	        "mino_type": Type.rule_definition
	    },{//Mocking the SaveHandler
	        api: api,
	        user: {
	            username: "Mino"
	        }
	    },0,{
	        bypass_checks: true
	    })

	    so.do_saving(function(save_object, error, save_details){
	        logger.log(save_object, error, save_details);

	        callback();
	    })
    })
}