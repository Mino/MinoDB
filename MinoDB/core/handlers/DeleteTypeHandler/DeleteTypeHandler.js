var errors = require('../../../../errors');
var FieldVal = require('fieldval');
var BasicVal = FieldVal.BasicVal;
var Path = require('../../../../common_classes/Path');
var logger = require('mino-logger');

var Type = require('../../models/Type');

function DeleteTypeHandler(api, user, parameters, callback){
    var dth = this;

    dth.api = api;
    dth.user = user;
    dth.callback = callback;

    dth.validator = new FieldVal(parameters);

    var type_name = dth.validator.get("type_name", Type.NAME_CHECKS);

    var error = dth.validator.end();
    if(error){
        callback(error);
        return;
    }

    var db = dth.api.ds;

    db.object_collection.remove(
        {
            "full_path": "/" + api.minodb.root_username + "/types/"+type_name
        },
        function(err,response){

            if(err){
                callback(
                    dth.validator.error(errors.DELETE_TYPE_FAILED).end()
                );
            } else {
                logger.debug(err, response);

                if(response===0){
                    //There was no type
                    dth.validator.invalid("type_name",errors.NOT_FOUND_OR_NO_PERMISSION_TO_MODIFY);
                    callback(dth.validator.end());
                } else {
                    callback(null,{
                        success: true
                    });
                }
            }
        }
    );
}

module.exports = DeleteTypeHandler;