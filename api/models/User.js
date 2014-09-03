var logger = require('tracer').console();
var FieldVal = require('fieldval');
var BasicVal = require('fieldval-basicval');

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

User.rule = new ValidationRule();
User.rule.init({
    name: "mino.user",
    display_name: "User",
    type: "object",
    fields: [{
        name: "username",
        display_name: "Username",
        type: "string",
        min_length: 3,
        max_length: 20
    },{
        name: "email",
        display_name: "Email",
        type: "email"
    },{
        name: "password",
        display_name: "Password",
        type: "string",
        min_length: 8
    }]
});

User.username_validator = [
    BasicVal.no_whitespace(),
    BasicVal.start_with_letter()
]

User.validate = function(data, creation){
    var user_error = User.rule.validate(data);

    validator.get("username", User.username_validator);

    return user_error;
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

    user.create_save_data(function(err, to_save){

        new api.handlers.save(api, {
            "username": "Mino"
        }, {
            "objects": [
                {  
                    
                    "name": user.username,
                    "path": "/Mino/users/",
                    "mino.user": to_save
                }
            ]
        }, function(save_err, save_res){
            logger.log(save_err, save_res);

            // callback(null, new User(get_res));
        })
    });
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

        if(get_err){
            callback(get_err);
            return;
        }
        if(get_res && get_res[0]){
            return callback(null, new User(get_res));
        }
        callback(null, null);
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