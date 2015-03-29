var logger = require('tracer').console();
var FieldVal = require('fieldval');
var BasicVal = FieldVal.BasicVal;
var FVRule = require('fieldval-rules');

var security = require('../security');

User.systemUsers = [
    "Mino",
    "Admin",
    "Public"
];

function User(obj) {
    var user = this;

    user.id = obj._id;

    var data = obj.minodb_user;

    user.username = data.username;
    user.email = data.email;
    user.password = data.password;
    user.salted_password = data.salted_password;
    user.password_salt = data.password_salt;
}

User.rule_definition = {
    name: "minodb_user",
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
User.rule = new FVRule();
User.rule.init(User.rule_definition);


User.sign_in_rule_definition = {
    name: "minodb_user",
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
User.sign_in_rule = new FVRule();
logger.log(FVRule.prototype.validate+"");
User.sign_in_rule.init(User.sign_in_rule_definition);

//TODO add more checks for tilde, slashes, etc
User.username_validator = [
    BasicVal.string(true),
    BasicVal.no_whitespace(),
    BasicVal.start_with_letter()
]

User.validate = function(data, creation, callback){
    logger.log("User.validate");
    User.sign_in_rule.validate(data, function(user_error) {
        logger.log(user_error);

        var validator = new FieldVal(data, user_error);
        validator.get("username", User.username_validator);
        callback(validator.end());
    });
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

User.prototype.save = function(api, options, callback){
    var user = this;

    logger.log(arguments);
    console.trace();
    if (arguments.length == 2) {
        callback = options;
        options = undefined;
    }

    options = options || {};
    var minodb_username = options.minodb_username || api.minodb.root_username;
    var path = options.path || "/" + api.minodb.root_username + "/users/";

    user.create_save_data(function(err, to_save){

        logger.log(to_save);
        logger.log(user);
        new api.handlers.save(api, {
            "username": minodb_username
        }, {
            "objects": [
                {  
                    "_id": user.id,
                    "name": user.username,
                    "path": path,
                    "minodb_user": to_save
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

User.get = function(value, api, options, callback){
    logger.log(arguments);
    console.trace();
    if (arguments.length == 3) {
        callback = options;
        options = undefined;
    }

    options = options || {};
    var minodb_username = options.minodb_username || api.minodb.root_username;
    var identifier = options.identifier || "username";
    var path = options.path || "/" + api.minodb.root_username + "/users/";

    logger.log(minodb_username, identifier, path)

    var query = {}
    query["minodb_user."+identifier] = value;

    new api.handlers.search(api, {
        "username": minodb_username
    }, {
        "paths": [
            path
        ],
        query: query
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

User.create = function(data, api, options, callback){
    
    logger.log(arguments);
    if (arguments.length == 3) {
        callback = options;
        options = undefined;
    }

    logger.log("User.create");

    User.validate(data, true, function(error) {
        logger.log(error);
        if(error){
            callback(error,null);
            return;
        }

        var user = new User({
            minodb_user: data
        });
        user.save(api, options, function(err, res){

            logger.log(JSON.stringify(err,null,4), res);
            callback(err, res);

        });
    });

}

module.exports = User;