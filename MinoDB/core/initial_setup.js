var logger = require('tracer').console();
var SaveObject = require('./handlers/SaveHandler/SaveObject');
var User = require('./models/User');
var Session = require('../ui_server/models/Session');
var Permission = require('./handlers/AddPermissionsHandler/Permission');
var Type = require('./models/Type');

module.exports = function(api, callback){

    new api.handlers.save(api, {
        "username": api.minodb.root_username
    }, {
        "objects": [
            {
                "name": api.minodb.root_username,
                "path": "/",
                "folder": true
            }
        ]
    }, function(mino_save_err, mino_save_res){
        logger.log(JSON.stringify(mino_save_err,null,4), mino_save_res);

        new api.handlers.save(api, {
            "username": api.minodb.root_username
        }, {
            "objects": [
                {
                    "name": "types",
                    "path": "/" + api.minodb.root_username + "/",
                    "folder": true
                },
                {
                    "name": "sessions",
                    "path": "/" + api.minodb.root_username + "/",
                    "folder": true
                },
                {
                    "name": "users",
                    "path": "/" + api.minodb.root_username + "/",
                    "folder": true
                }
            ]
        }, function(save_err, save_res){
            logger.log(JSON.stringify(save_err,null,4), save_res);

    	    //Save the "mino_type" type definition without checks
    	    var so = new SaveObject({
    	        "name": "mino_type",
    	        "path": "/" + api.minodb.root_username + "/types/",
    	        "mino_type": Type.rule_definition
    	    },{//Mocking the SaveHandler
    	        api: api,
    	        user: {
    	            username: api.minodb.root_username
    	        }
    	    },0,{
    	        bypass_type_checks: true,
                bypass_path_checks: true
    	    })

    	    so.do_saving(function(save_object, error, save_details){
    	        logger.log(save_object, error, save_details);

                api.handlers.save_type(api, {
                    "username": api.minodb.root_username
                }, {
                    type: User.rule_definition
                }, function(user_type_err, user_type_res){

                    logger.log(JSON.stringify(user_type_err,null,4), user_type_res);

                    api.handlers.save_type(api, {
                        "username": api.minodb.root_username
                    }, {
                        type: Session.rule_definition
                    }, function(session_type_err, session_type_res){
                        logger.log(JSON.stringify(session_type_err,null,4), session_type_res);
                        
                        api.handlers.save_type(api, {
                            "username": api.minodb.root_username
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