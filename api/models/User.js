var logger = require('tracer').console();
var FieldVal = require('fieldval');
var bval = require('fieldval-basicval');

var security = require('../security');

User.systemUsers = [
    "Mino",
    "Admin",
    "Public"
];

function User(data) {
    var user = this;

    user.data = data;

    user.username = data.username;
    user.email = data.email;
    user.password = data.password;
}

User.validate = function(data, creation){
    var validator = new FieldVal(data);

    validator.get("username", bval.string(true), bval.min_length(3));
    validator.get("email", bval.string(true), bval.email());

    if(creation){
        validator.get("password", bval.string(true), bval.min_length(8));
    }

    return validator.end();
}

User.prototype.create_save_data = function(callback){
    var user = this;

    var to_save = JSON.parse(JSON.stringify(user.data));

    if(user.password){
        security.generate_salted_password(user.password, function(hash, salt){
            delete to_save.password;
            to_save.salted_password = hash;
            to_save.password_salt = salt;
            callback(null, to_save);
        });
    } else {
        callback(null, to_save);
    }
}

User.prototype.save = function(api, callback){
    var user = this;

    // user.create_save_data(function(err, to_save){
    //     logger.log(err, to_save);
    //     api.ds.users_collection.insert(to_save, function(insert_err, insert_res){
    //         logger.log(insert_err, insert_res);
    //         callback(insert_err, insert_res);
    //     })
    // });

    new api.handlers.save(api, {
        "username": "Mino"
    }, {
        "objects": [
            {
                "name": user.username,
                "path": "/Mino/users/"
            }
        ]
    }, function(save_err, save_res){
        logger.log(save_err, save_res);

        // callback(null, new User(get_res));
    })
}

User.prototype.is_system_user = function(toCheck) {
    for (var systemUser in User.systemUsers) {
        if (systemUser == toCheck) {
            return true;
        }
    }
    return false;
}

User.get = function(username, api, callback){
    new api.handlers.get(api, {
        "username": "Mino"
    }, {
        "addresses": [
            "/Mino/users/"+username
        ]
    }, function(get_err, get_res){
        logger.log(get_err, get_res);

        // callback(null, new User(get_res));
    })
}

User.create = function(data, api, callback){
    
    var error = User.validate(data, true);
    if(error){
        callback(error,null);
        return;
    }

    var user = new User(data);
    user.save(api, callback);
}

module.exports = User;