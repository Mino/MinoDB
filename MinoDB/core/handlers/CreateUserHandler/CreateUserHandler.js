var errors = require('../../../../errors');
var FieldVal = require('fieldval');
var BasicVal = FieldVal.BasicVal;
var Path = require('../../../../common_classes/Path');
var FVRule = require('fieldval-rules');
var logger = require('mino-logger');


function create_user_folders(user, api, callback) {
    logger.debug(user);
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
        logger.debug(JSON.stringify(save_err,null,4), save_res);
        callback(save_err, save_res);
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

    logger.debug("STARTED CUH");

    cuh.validator.get_async("user", [BasicVal.object(true), function(val, emit, done){
        logger.debug("Passed object test",val);
        var options = {
            path: "/" + api.minodb.root_username + "/users/",
            minodb_username: api.minodb.root_username 
        };
        var auth = api.minodb.get_plugin('minodb_auth');
    	auth.create_user(val, function(user_err, user_res){
            create_user_folders(val, api, function(err, res) {
                logger.debug(user_err,user_res);
                logger.debug(JSON.stringify(user_err, null, 4), user_res);
                output.user = user_res;
                done(user_err);    
            });
    	});
    }]);

    cuh.validator.end(function(error){
        logger.debug(error);
    	if(error){
    		callback(error);
    		return;
    	}

    	callback(null, output);
    });
}

module.exports = CreateUserHandler;