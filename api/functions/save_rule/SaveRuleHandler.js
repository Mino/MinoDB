var errors = require('../../../errors')
var Validator = require('fieldval');
var bval = require('fieldval-basicval');
var Path = require('../../../common_classes/Path')
var ValidationRule = require('fieldval-rules');
var logger = require('tracer').console();

function SaveRuleHandler(api, user, parameters, callback){
    var sh = this;

    sh.api = api;
    sh.user = user;
    sh.callback = callback;

    sh.validator = new Validator(parameters);

    var rule = sh.validator.get("rule", bval.object(true));
    if(rule){

        sh.rule = new ValidationRule();
        var rule_error = sh.rule.init(rule);
        if(rule_error){
            sh.validator.invalid("rule",rule_error);
        }
    }

    var error = sh.validator.end();
    if(error){
        callback(error);
        return;
    }

    var db = api.ds;

    db.rule_collection.insert(rule, function(err, response){
        logger.log(err);
        logger.log(response);
    });



    callback(null,{
        success: true
    })
    return;
}

module.exports = SaveRuleHandler;