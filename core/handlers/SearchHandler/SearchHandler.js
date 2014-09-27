var errors = require('../../../errors')
var Validator = require('fieldval');
var BasicVal = require('fieldval-basicval');
var PathPermissionChecker = require('../../models/PathPermissionChecker');
var logger = require('tracer').console();

function SearchHandler(api, user, parameters, callback){
    var sh = this;

    console.trace();

    logger.log(api, user, parameters, callback);

    sh.api = api;
    sh.user = user;
    sh.parameters = parameters;
    sh.callback = callback;

    sh.path_permission_checker = new PathPermissionChecker(sh);

    sh.validator = new Validator(parameters);

    sh.paths = sh.validator.get("paths", BasicVal.array(true));

    sh.path_permission_checker.retrieve_permissions(function(){

    });

    logger.log(arguments);

    var error = sh.validator.end();
    if(error){
        sh.callback(error);
        return;
    } else {
        sh.do_search(function(err,res){
            logger.log(err);
            logger.log(res);
            callback(err, res);
        })
    }
}

SearchHandler.prototype.do_search = function(callback){
    var sh = this;

    var db = sh.api.ds;

    db.object_collection.find({
        "path": {
            "$in": sh.paths
        }
    },{

    }).toArray(function(search_err, search_res){
        logger.log(search_err, search_res);
        callback(null, {
            "objects": search_res
        })
    });
}

module.exports = SearchHandler;