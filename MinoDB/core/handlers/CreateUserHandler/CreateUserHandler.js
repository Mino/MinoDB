var errors = require('../../../../errors')
var FieldVal = require('fieldval');
var BasicVal = FieldVal.BasicVal;
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

    cuh.validator = new FieldVal(parameters);

    var output = {}

    cuh.validator.get_async("user", [BasicVal.object(true), function(val, emit, done){
    	User.create(val, api, function(user_err, user_res){
    	    logger.log(JSON.stringify(user_err, null, 4), user_res);
    	    output.user = user_res;
	    	done(user_err);
    	});
    }])

    cuh.validator.end(function(error){
    	if(error){
    		callback(error);
    		return;
    	}

    	callback(null, output);
    })
}

module.exports = CreateUserHandler;