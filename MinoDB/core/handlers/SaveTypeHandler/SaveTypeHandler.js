var errors = require('../../../../errors');
var FieldVal = require('fieldval');
var BasicVal = FieldVal.BasicVal;
var Path = require('../../../../common_classes/Path');
var logger = require('mino-logger');

var Type = require('../../models/Type');

function SaveTypeHandler(api, user, parameters, callback){
    var sh = this;

    sh.api = api;
    sh.user = user;
    sh.callback = callback;

    sh.validator = new FieldVal(parameters);

    var type_data = sh.validator.get("type", BasicVal.object(true));
    if(type_data){
        var type_error = Type.validate(type_data);
        if(type_error!=null){
            sh.validator.invalid("type",type_error);
        }
    }

    var error = sh.validator.end();
    if(error){
        callback(error);
        return;
    }

    Type.get(type_data.name, api, function(get_err, existing_type){

        logger.debug(get_err, existing_type);

        if(existing_type){
            sh.type = existing_type;
        } else {
            sh.type = new Type({
                name: type_data.name
            });
        }

        sh.type.init(type_data);
        
        sh.type.save(api, function(save_err, save_res){
            
            logger.debug(save_err, save_res);
            
            callback(null,{
                success: true
            });
            return;
        });
    });
}

module.exports = SaveTypeHandler;