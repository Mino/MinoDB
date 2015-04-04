var logger = require('tracer').console();
var FieldVal = require('fieldval');
var BasicVal = FieldVal.BasicVal;
var FVRule = require('fieldval-rules');

var security = require('../security');

function User(obj) {
    var user = this;

    if (obj) {
        user.id = obj._id;
        user.path = obj.path;

        var data = obj.minodb_user;

        user.username = data.username;
        user.email = data.email;
        user.password = data.password;
        user.salted_password = data.salted_password;
        user.password_salt = data.password_salt;
    }
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

User.validate = function(data, callback){
    logger.log("User.validate");
    User.sign_in_rule.validate(data, function(user_error) {
        logger.log(user_error);

        var validator = new FieldVal(data, user_error);
        validator.get("username", User.username_validator);
        callback(validator.end());
    });
}

User.prototype.to_minodb_object = function(callback){
    var user = this;

    var build_obj = function(){

        var minodb_object = {  
            "_id": user.id,
            "name": user.username,
            "path": user.path,
            "minodb_user": {
                username: user.username,
                email: user.email,
                salted_password: user.salted_password,
                password_salt: user.password_salt
            }
        }

        callback(null, minodb_object);
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
    user.to_minodb_object(function(err, minodb_object){
        logger.log("saving", minodb_object);
        logger.log(user);
        new api.handlers.save(api, {
            "username": minodb_username
        }, {
            "objects": [
                minodb_object   
            ]
        }, function(save_err, save_res){
            logger.log(save_err, save_res);

            callback(save_err, save_res);
        })
    });
}

module.exports = User;