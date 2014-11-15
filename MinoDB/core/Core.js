var logger = require('tracer').console();
var Validator = require('fieldval');
var BasicVal = require('fieldval-basicval');

var DataStore = require('./datastore');

function Core(minodb, db_address){
	var core = this;

	core.minodb = minodb;

    core.ds = new DataStore({
        address: db_address
    })

    core.connect(function(){
        logger.log("API CONNECTED");
    })

    core.handlers = {
        "get": require('./handlers/GetHandler/GetHandler.js'),
        "save": require('./handlers/SaveHandler/SaveHandler.js'),
        "search": require('./handlers/SearchHandler/SearchHandler.js'),
        "save_type": require('./handlers/SaveTypeHandler/SaveTypeHandler.js'),
        "delete": require('./handlers/DeleteHandler/DeleteHandler.js'),
        "add_permissions": require('./handlers/AddPermissionsHandler/AddPermissionsHandler.js')
    }

    core.connected = false;
    core.connect_callbacks = [];
}

Core.prototype.call_connect_callbacks = function(){
    var core = this;

    logger.log("CALLING CORE CONNECT CALLBACKS");
    for(var i = 0; i < core.connect_callbacks.length; i++){
        core.connect_callbacks[i]();
    }
}

Core.prototype.connect = function(callback){
    var core = this;

    core.ds.connect(function(err){
        if(err) throw err;

        logger.log("CORE CONNECTED");

        require('./initial_setup')(core.minodb.api, function(){

            var User = require('./models/User');
            User.get("testuser", core.minodb.api, function(get_err, get_user){
                logger.log(get_err, get_user);
            })

            User.create({
                username: "testuser",
                email: "test@minocloud.com",
                password: "my_password"
            }, core.minodb.api, function(user_err, user_res){
                logger.log(user_err, user_res);
            })

            User.create({
                username: "otheruser",
                email: "otheruser@minocloud.com",
                password: "other_password"
            }, core.minodb.api, function(user_err, user_res){
                logger.log(user_err, user_res);
            })

            new core.handlers.delete(core.minodb.api, {
                "username": "testuser"
            }, {
                "addresses": [
                    // "795"
                    "/testuser/test/My Blank Item"
                ]
            }, function(save_err, save_res){
                logger.log(JSON.stringify(save_err,null,4), save_res);
            })

            core.connected = true;
            for(var i = 0; i < core.connect_callbacks.length; i++){
                logger.log("CALLING CONNECTED CALLBACK ",i);
                core.connect_callbacks[i]();
            }

            callback();
        })
    })
}

Core.prototype.on_connected = function(callback){
    var core = this;

    if(core.connected){
        callback();
        return;
    }
    core.connect_callbacks.push(callback);
}

Core.prototype.call = function(user, request, callback){
	var core = this;

    core.on_connected(function(){

        logger.log("Core.call connected");

        var api_val = new FieldVal(request);

        var function_name = api_val.get("function", BasicVal.string(true), BasicVal.one_of(core.handlers));
        var parameters = api_val.get("parameters", BasicVal.object(true));

        var handler = core.handlers[function_name];

        var error = api_val.end();
        if(error){
            callback(error);
            return;
        }

        if (handler != null) {
            var handler_callback = function(error, response) {
                // logger.log(JSON.stringify(error, null, 4));
                // logger.log(JSON.stringify(response, null, 4));
                if (error != null) {
                    return callback(api_val.invalid("parameters", error).end());
                } else {
                    callback(null, response);
                }
            };
            new handler(core, user, parameters, handler_callback)
        }
    });
}

module.exports = Core;