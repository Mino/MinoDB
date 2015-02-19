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
        "get": require('./handlers/GetHandler/GetHandler'),
        "save": require('./handlers/SaveHandler/SaveHandler'),
        "search": require('./handlers/SearchHandler/SearchHandler'),
        "save_type": require('./handlers/SaveTypeHandler/SaveTypeHandler'),
        "delete": require('./handlers/DeleteHandler/DeleteHandler'),
        "add_permissions": require('./handlers/AddPermissionsHandler/AddPermissionsHandler'),
        "create_user": require('./handlers/CreateUserHandler/CreateUserHandler')
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

        var api_val = new Validator(request);

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