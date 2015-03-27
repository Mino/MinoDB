var errors = require('../../../../errors')
var FieldVal = require('fieldval');
var BasicVal = FieldVal.BasicVal;
var Path = require('../../../../common_classes/Path')
var User = require('../../models/User');
var FVRule = require('fieldval-rules');
var logger = require('tracer').console();


function create_user_folders(user, api, callback) {
    logger.log(user);
    new api.handlers.save(api, {
        "username": api.minodb.root_username
    }, {
        "objects": [
            {
                "name": user.username,
                "path": "/",
                "folder": true
            }
        ]
    }, function(save_err, save_res){
        logger.log(JSON.stringify(save_err,null,4), save_res);

        new api.handlers.save(api, {
            "username": user.username
        }, {
            "objects": [
                {
                    "name": "permissions",
                    "path": "/"+user.username+"/",
                    "folder": true
                }
            ]
        }, function(save_err, save_res){
            logger.log(JSON.stringify(save_err,null,4), save_res);


            new api.handlers.save(api, {
                "username": user.username
            }, {
                "objects": [
                    {
                        "name": "sent",
                        "path": "/"+user.username+"/permissions/",
                        "folder": true
                    },{
                        "name": "received",
                        "path": "/"+user.username+"/permissions/",
                        "folder": true
                    }
                ]
            }, function(save_err, save_res){
                logger.log(JSON.stringify(save_err,null,4), save_res);
                callback(save_err, save_res);
            })
        });
    });
}

function CreateUserHandler(api, user, parameters, callback){
    var cuh = this;

    cuh.api = api;
    cuh.user = user;
    cuh.parameters = parameters;
    cuh.callback = callback;

    cuh.validator = new FieldVal(parameters);

    var output = {};

    logger.log("STARTED CUH");

    cuh.validator.get_async("user", [BasicVal.object(true), function(val, emit, done){
        logger.log("Passed object test",val);
        var options = {
            path: "/" + api.minodb.root_username + "/users/",
            mino_username: api.minodb.root_username 
        }
    	User.create(val, api, options, function(user_err, user_res){
            create_user_folders(val, api, function(err, res) {
                logger.log(user_err,user_res);
                logger.log(JSON.stringify(user_err, null, 4), user_res);
                output.user = user_res;
                done(user_err);    
            });
    	});
    }])

    cuh.validator.end(function(error){
        logger.log(error);
    	if(error){
    		callback(error);
    		return;
    	}

    	callback(null, output);
    })
}

module.exports = CreateUserHandler;