var logger = require('tracer').console();
var FieldVal = require('fieldval');
var BasicVal = require('fieldval-basicval');

var security = require('../security');

User.systemUsers = [
    "Mino",
    "Admin",
    "Public"
];

function User(obj) {
    var user = this;

    user.id = obj._id;

    var data = obj.mino_user;

    user.username = data.username;
    user.email = data.email;
    user.salted_password = data.salted_password;
    user.password_salt = data.password_salt;
}

User.rule_definition = {
    name: "mino_user",
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
        name: "salted_password",
        display_name: "Salted Password",
        type: "string",
        min_length: 8
    },{
        name: "password_salt",
        display_name: "Password Salt",
        type: "string",
        min_length: 8
    }]
};
User.rule = new ValidationRule();
User.rule.init(User.rule_definition);


User.sign_in_rule_definition = {
    name: "mino_user",
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
        type: "string"
    }]
};
User.sign_in_rule = new ValidationRule();
User.sign_in_rule.init(User.sign_in_rule_definition);

User.username_validator = [
    BasicVal.no_whitespace(),
    BasicVal.start_with_letter()
]

User.validate = function(data, creation){
    var user_error = User.sign_in_rule.validate(data);
    logger.log(user_error);

    var validator = new FieldVal(data, user_error);
    validator.get("username", User.username_validator);

    return validator.end();
}

User.prototype.create_save_data = function(callback){
    var user = this;

    var build_obj = function(){
        var to_save = {
            username: user.username,
            email: user.email,
            salted_password: user.salted_password,
            password_salt: user.password_salt
        }
        callback(null, to_save);
    }

    if(user.password){
        security.generate_salted_password(user.password, function(hash, salt){
            delete user.password;
            user.salted_password = hash;
            user.password_salt = salt;
            build_obj();
        });
    } else {
        build_obj();
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
                    "_id": user.id,
                    "name": user.username,
                    "path": "/Mino/users/",
                    "mino_user": to_save
                }
            ]
        }, function(save_err, save_res){
            logger.log(save_err, save_res);

            callback(save_err, save_res);
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
    logger.log("username ",username);
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
        if(get_res && get_res.objects && get_res.objects[0]){
            return callback(null, new User(get_res.objects[0]));
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

    var user = new User({
        mino_user: data
    });
    user.save(api, callback);
}

module.exports = User;