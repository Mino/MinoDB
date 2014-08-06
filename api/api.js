var Validator = require('fieldval');
var bval = require('fieldval-basicval');
var logger = require('tracer').console();

var SaveObject = require('./handlers/SaveHandler/SaveObject');
var Type = require('./models/Type');

var DataStore = require('./datastore');

function API(minodb, db_address){
	var api = this;

	api.minodb = minodb;

    api.ds = new DataStore({
        address: db_address
    })

    api.connect(function(){
        logger.log("API CONNECTED");
    })

    api.handlers = {
        "get": require('./handlers/GetHandler/GetHandler.js'),
        "save": require('./handlers/SaveHandler/SaveHandler.js'),
        "search": require('./handlers/SearchHandler/SearchHandler.js'),
        "save_type": require('./handlers/SaveTypeHandler/SaveTypeHandler.js')
    }
}

API.prototype.connect = function(callback){
    var api = this;

    api.ds.connect(function(err){
        if(err) throw err;

        // var User = require('./models/User');
        // User.get("testuser", api, function(get_err, get_user){
        //     logger.log(get_err, get_user);
        // })
        // User.create({
        //     username: "testuser",
        //     email: "test@minocloud.com",
        //     password: "my_password"
        // }, api, function(user_err, user_res){
        //     logger.log(user_err, user_res);
        // })

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
        })

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
        })

        callback();
    })
}

API.prototype.call = function(user, request, callback){
	var api = this;

    var api_val = new FieldVal(request);

    var function_name = api_val.get("function", bval.string(true), bval.one_of(api.handlers));
    var parameters = api_val.get("parameters", bval.object(true));

    var handler = api.handlers[function_name];

    var error = api_val.end();
    if(error){
        callback(error);
        return;
    }

    if (handler != null) {
        var handler_callback = function(error, response) {
            logger.log(JSON.stringify(error, null, 4));
            logger.log(JSON.stringify(response, null, 4));
            if (error != null) {
                return callback(api_val.invalid("parameters", error).end());
            } else {
                callback(null, response);
            }
        };
        new handler(api, user, parameters, handler_callback)
    }
}

module.exports = API;