var logger = require('mino-logger');
var FieldVal = require('fieldval');
var BasicVal = FieldVal.BasicVal;

var DataStore = require('./datastore');

function Core(minodb, db_address){
	var core = this;

	core.minodb = minodb;

    core.ds = new DataStore({
        address: db_address
    });

    core.handlers = {
        "get": require('./handlers/GetHandler/GetHandler'),
        "save": require('./handlers/SaveHandler/SaveHandler'),
        "delete": require('./handlers/DeleteHandler/DeleteHandler'),
        "search": require('./handlers/SearchHandler/SearchHandler'),
        "save_type": require('./handlers/SaveTypeHandler/SaveTypeHandler'),
        "delete_type": require('./handlers/DeleteTypeHandler/DeleteTypeHandler'),
        "create_user": require('./handlers/CreateUserHandler/CreateUserHandler')
    };

    core.connected = false;
    core.connect_callbacks = [];

    core.connect(function(){
        logger.debug("API CONNECTED");
    });
}

Core.prototype.call_connect_callbacks = function(){
    var core = this;

    logger.debug("CALLING CORE CONNECT CALLBACKS");
    for(var i = 0; i < core.connect_callbacks.length; i++){
        core.connect_callbacks[i]();
    }
};

Core.prototype.connect = function(callback){
    var core = this;

    core.ds.connect(function(err){
        if(err) throw err;

        logger.debug("CORE CONNECTED");

        require('./initial_setup')(core.minodb.api, function(){
            core.connected = true;
            for(var i = 0; i < core.connect_callbacks.length; i++){
                logger.debug("CALLING CONNECTED CALLBACK ",i);
                core.connect_callbacks[i]();
            }

            callback();
        });
    });
};

Core.prototype.close = function(callback){
    var core = this;

    core.ds.close(callback);
};

Core.prototype.on_connected = function(callback){
    var core = this;

    if(core.connected){
        callback();
        return;
    }
    core.connect_callbacks.push(callback);
};

Core.prototype.call = function(user, request, callback){
	var core = this;

    logger.debug("Core.call");

    core.on_connected(function(){

        logger.debug("Core.call connected");

        var api_val = new FieldVal(request);

        var function_name = api_val.get("function", BasicVal.string(true), BasicVal.one_of(core.handlers));
        var parameters = api_val.get("parameters", BasicVal.object(true));

        var handler = core.handlers[function_name];

        var error = api_val.end();
        if(error){
            callback(error);
            return;
        }

        if (handler !== null) {
            logger.debug("Calling handler as user", user, handler);
            var handler_callback = function(error, response) {
                logger.debug(JSON.stringify(error, null, 4));
                logger.debug(JSON.stringify(response, null, 4));
                if (error !== null) {
                    return callback(api_val.invalid("parameters", error).end());
                } else {
                    callback(null, response);
                }
            };
            new handler(core, user, parameters, handler_callback);
        }
    });
};

module.exports = Core;