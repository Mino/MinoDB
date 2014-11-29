var errors = require('../../../../errors')
var Validator = require('fieldval');
var BasicVal = require('fieldval-basicval');
var PathPermissionChecker = require('../../models/PathPermissionChecker');
var Constants = require('../../../../common_classes/Constants');
var logger = require('tracer').console();

function SearchHandler(api, user, parameters, callback){
    var sh = this;

    sh.api = api;
    sh.user = user;
    sh.parameters = parameters;
    sh.callback = callback;

    sh.path_permission_checker = new PathPermissionChecker(sh);

    sh.validator = new Validator(parameters);

    sh.paths = sh.validator.get("paths", BasicVal.array(true));
    sh.start = sh.validator.get("start", BasicVal.integer(false), BasicVal.minimum(0));
    if(sh.start===undefined){
        sh.start = 0;
    }
    sh.limit = sh.validator.get("limit", BasicVal.integer(false), BasicVal.minimum(1), BasicVal.maximum(1000));
    if(sh.limit===undefined){
        sh.limit = 10;
    }
    sh.include_subfolders = sh.validator.get("include_subfolders", BasicVal.boolean(false));
    if(sh.include_subfolders===undefined){
        sh.include_subfolders = false;
    }
    sh.query = sh.validator.get("query", BasicVal.object(false));
    if(sh.query===undefined){
        sh.query = {};
    }

    var error = sh.validator.end();
    if(error){
        sh.callback(error);
        return;
    } else {
        sh.do_search(function(err,res){
            // logger.log(err);
            // logger.log(res);
            callback(err, res);
        })
    }
}

SearchHandler.prototype.do_search = function(callback){
    var sh = this;

    var db = sh.api.ds;


    var path_validator = new FieldVal(null);
    for(var i = 0; i < sh.paths.length; i++){
        (function(i){
            var sh = this;

            var path = new Path();
            var path_error = path.init(sh.paths[i]);
            logger.log(path_error);

            sh.path_permission_checker.check_permissions_for_path(path,function(status){
                if(status===Constants.WRITE_PERMISSION || status===Constants.READ_PERMISSION){
                    //All good
                } else {
                    path_validator.invalid(i, errors.NOT_FOUND_OR_NO_PERMISSION_TO_ACCESS);
                }
            });
        }).call(sh,i);
    }

    sh.path_permission_checker.retrieve_permissions(function(){

        var path_error = path_validator.end();
        if(path_error){
            sh.validator.invalid("paths", path_error);
            sh.callback(sh.validator.end());
            return;
        }

        sh.query.path = {
            "$in": sh.paths
        };

        var error;
        var results;
        var have_results;
        var count;
        var have_count;
        var done = function(){
            if(have_results && have_count){

                if(error){
                    callback(error);
                    return;
                }

                callback(null,{
                    objects: results,
                    total: count,
                    limit: sh.limit,
                    start: sh.start
                });
            }
        }

        var mongo_query = db.object_collection.find(sh.query,
        {

        });

        mongo_query.toArray(function(search_err, search_res){
            logger.log(search_err, search_res);
            if(search_err){
                error = search_err;
            } else {
                results = search_res;
            }
            have_results = true;
            done();
        });

        mongo_query.count(function(err, res_count){
            logger.log(err, res_count);
            if(err){
                error = err;
            } else {
                count = res_count;
            }
            have_count = true;
            done();
        })
    });
}

module.exports = SearchHandler;