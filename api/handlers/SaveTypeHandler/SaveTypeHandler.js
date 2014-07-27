var errors = require('../../../errors')
var Validator = require('fieldval');
var bval = require('fieldval-basicval');
var Path = require('../../../common_classes/Path')
var ValidationRule = require('fieldval-rules');
var logger = require('tracer').console();

function SaveTypeHandler(api, user, parameters, callback){
    var sh = this;

    sh.api = api;
    sh.user = user;
    sh.callback = callback;

    sh.validator = new Validator(parameters);

    var type = sh.validator.get("type", bval.object(true));
    if(type){

        sh.type = new ValidationRule();
        var type_error = sh.type.init(type);
        if(type_error){
            sh.validator.invalid("type",type_error);
        }
    }

    var error = sh.validator.end();
    if(error){
        callback(error);
        return;
    }

    var db = api.ds;

    var name = type.name;

    logger.log(type);
    logger.log("name ",name);

    db.type_collection.update(
        {
            name: name
        },
        type,
        {
            upsert: true
        },
        function(err, response){
            logger.log(err);
            logger.log(response);
        }
    );



    callback(null,{
        success: true
    })
    return;
}

module.exports = SaveTypeHandler;