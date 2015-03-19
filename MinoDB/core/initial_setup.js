var logger = require('tracer').console();
var SaveObject = require('./handlers/SaveHandler/SaveObject');
var User = require('./models/User');
var Session = require('../ui_server/models/Session');
var Permission = require('./handlers/AddPermissionsHandler/Permission');
var Type = require('./models/Type');

module.exports = function(api, callback){

    new api.handlers.save(api, {
        "username": "Mino"
    }, {
        "objects": [
            {
                "name": "Mino",
                "path": "/",
                "folder": true
            }
        ]
    }, function(mino_save_err, mino_save_res){
        logger.log(JSON.stringify(mino_save_err,null,4), mino_save_res);

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
                    "name": "sessions",
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
    	        bypass_type_checks: true,
                bypass_path_checks: true
    	    })

    	    so.do_saving(function(save_object, error, save_details){
    	        logger.log(save_object, error, save_details);

                api.handlers.save_type(api, {
                    "username": "Mino"
                }, {
                    type: User.rule_definition
                }, function(user_type_err, user_type_res){

                    logger.log(JSON.stringify(user_type_err,null,4), user_type_res);

                    api.handlers.save_type(api, {
                        "username": "Mino"
                    }, {
                        type: Session.rule_definition
                    }, function(session_type_err, session_type_res){
                        logger.log(JSON.stringify(session_type_err,null,4), session_type_res);
                        
                        api.handlers.save_type(api, {
                            "username": "Mino"
                        }, {
                            type: Permission.rule_definition
                        }, function(perm_type_err, perm_type_res){
                            logger.log(JSON.stringify(perm_type_err,null,4), perm_type_res);
                            callback();
                        });
                    })
                })
    	    })
        })
    })
}