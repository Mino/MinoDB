var logger = require('tracer').console();
var FieldVal = require('fieldval');
var BasicVal = FieldVal.BasicVal;
var FVRule = require("fieldval-rules");

function Session(obj) {
    var session = this;

    session.id = obj._id;

    var data = obj.minodb_session;

    session.user_id = data.user_id;
    session.key = data.key;
}

Session.rule_definition = {
    name: "minodb_session",
    display_name: "Session",
    type: "object",
    fields: [{
        name: "user_id",
        display_name: "User id",
        type: "string"
    },{
        name: "key",
        display_name: "Key",
        type: "string",
        min_length: 32
    }]
};
Session.rule = new FVRule();
Session.rule.init(Session.rule_definition);

Session.prototype.create_save_data = function(callback){
    var session = this;

    var to_save = {
        user_id: session.user_id,
        key: session.key
    }
    logger.log("to_save", to_save);
    callback(null, to_save);
}

Session.prototype.save = function(api, options, callback){
    var session = this;
    logger.log(arguments);

    if (arguments.length == 2) {
        callback = options;
        options = undefined;
    }
    
    options = options || {};
    var path = options.path || "/" + api.minodb.root_username + "/sessions/";
    var minodb_username = options.minodb_username || api.minodb.root_username;

    session.create_save_data(function(err, to_save){

        logger.log(err, to_save);

        var session_object = {  
            "_id": session.id,
            "name": "~id~",
            "path": path,
            "minodb_session": to_save
        }

        new api.handlers.save(api, {
            "username": minodb_username
        }, {
            "objects": [
                session_object
            ]
        }, function(save_err, save_res){
            logger.log(save_err, save_res);
            if (save_err) {
                callback(save_err);
            } else {
                session.id = save_res.objects[0]._id;
                callback(null, session);
            }
        })
    });
}

Session.get = function(session_id, api, options, callback){
    logger.log(arguments);

    if (arguments.length == 3) {
        callback = options;
        options = undefined;
    }

    optinos = options || {};
    var path = options.path || "/" + api.minodb.root_username + "/sessions/";
    var minodb_username = options.minodb_username || api.minodb.root_username;

    new api.handlers.get(api, {
        "username": minodb_username
    }, {
        "addresses": [
            path+session_id
        ]
    }, function(get_err, get_res){
        logger.log(get_err, get_res);

        if(get_err){
            callback(get_err);
            return;
        }
        if(get_res && get_res.objects && get_res.objects[0]){
            return callback(null, new Session(get_res.objects[0]));
        }
        callback(null, null);
    })
}

Session.create = function(data, api, options, callback){
    logger.log(arguments);
    if (arguments.length == 3) {
        callback = options;
        options = {};
    }
    console.trace();
    var session = new Session({
        minodb_session: data
    });
    session.save(api, options, callback);
}

module.exports = Session;