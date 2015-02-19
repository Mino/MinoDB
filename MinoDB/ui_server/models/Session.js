var logger = require('tracer').console();
var FieldVal = require('fieldval');
var BasicVal = FieldVal.BasicVal;

function Session(obj) {
    var session = this;

    session.id = obj._id;

    var data = obj.mino_session;

    session.username = data.username;
    session.key = data.key;
}

Session.rule_definition = {
    name: "mino_session",
    display_name: "Session",
    type: "object",
    fields: [{
        name: "username",
        display_name: "Username",
        type: "string",
        min_length: 3,
        max_length: 20
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
        username: session.username,
        key: session.key
    }
    callback(null, to_save);
}

Session.prototype.save = function(api, callback){
    var session = this;

    session.create_save_data(function(err, to_save){

        new api.handlers.save(api, {
            "username": "Mino"
        }, {
            "objects": [
                {  
                    "_id": session.id,
                    "name": "~id~",
                    "path": "/Mino/sessions/",
                    "mino_session": to_save
                }
            ]
        }, function(save_err, save_res){
            logger.log(save_err, save_res);

            callback(save_err, save_res);
        })
    });
}

Session.get = function(username, api, callback){
    logger.log("username ",username);
    new api.handlers.get(api, {
        "username": "Mino"
    }, {
        "addresses": [
            "/Mino/sessions/"+username
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

Session.create = function(data, api, callback){

    var session = new Session({
        mino_session: data
    });
    session.save(api, callback);
}

module.exports = Session;