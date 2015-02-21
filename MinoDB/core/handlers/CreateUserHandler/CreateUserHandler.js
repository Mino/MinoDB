var errors = require('../../../../errors')
var Validator = require('fieldval');
var BasicVal = require('fieldval-basicval');
var Path = require('../../../../common_classes/Path')
var User = require('../../models/User');
var FVRule = require('fieldval-rules');
var logger = require('tracer').console();

function CreateUserHandler(api, user, parameters, callback){
    var cuh = this;

    cuh.api = api;
    cuh.user = user;
    cuh.parameters = parameters;
    cuh.callback = callback;

    cuh.validator = new Validator(parameters);

    var output = {};

    logger.log("STARTED CUH");

    cuh.validator.get_async("user", [BasicVal.object(true), function(val, emit, done){
        logger.log("Passed object test",val);
    	User.create(val, api, function(user_err, user_res){
            logger.log(user_err,user_res);
    	    logger.log(JSON.stringify(user_err, null, 4), user_res);
    	    output.user = user_res;
	    	done(user_err);
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