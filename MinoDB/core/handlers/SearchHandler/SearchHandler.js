var errors = require('../../../../errors');
var FieldVal = require('fieldval');
var BasicVal = FieldVal.BasicVal;
var PathPermissionChecker = require('../../models/PathPermissionChecker');
var Path = require('../../../../common_classes/Path');
var Constants = require('../../../../common_classes/Constants');
var validators = require('../../validators');
var logger = require('mino-logger');

function SearchHandler(api, user, parameters, callback){
    var sh = this;

    sh.api = api;
    sh.user = user;
    sh.parameters = parameters;
    sh.callback = callback;

    sh.path_permission_checker = new PathPermissionChecker(sh);

    sh.validator = new FieldVal(parameters);

    sh.mongo_query = {};
    sh.query_and = [];

    sh.paths = sh.validator.get("paths", BasicVal.array(true));
    sh.skip = sh.validator.get("skip", BasicVal.integer(false), BasicVal.minimum(0));
    if(sh.skip===undefined){
        sh.skip = 0;
    }
    sh.limit = sh.validator.get("limit", BasicVal.integer(false), BasicVal.minimum(1));
    sh.include_subfolders = sh.validator.get("include_subfolders", BasicVal.boolean(false));
    if(sh.include_subfolders===undefined){
        sh.include_subfolders = false;
    }
    sh.query = sh.validator.get("query", BasicVal.object(false));
    if(sh.query){
        sh.query_and.push(sh.query);
    }

    sh.sort = sh.validator.get('sort', BasicVal.object(false), BasicVal.each(function(value) {
        if (value !== 1 && value !== -1) {
            return errors.INVALID_SORT_PARAM;
        }
    }));

    sh.text_search = sh.validator.get("text_search", BasicVal.string(false));
    if(sh.text_search){
        sh.query_and.push({"$text":{"$search":sh.text_search}});
    }

    var error = sh.validator.end();
    if(error){
        sh.callback(error);
        return;
    } else {
        sh.do_search(function(err,res){
            // logger.debug(err);
            // logger.debug(res);
            callback(err, res);
        });
    }
}

SearchHandler.prototype.do_search = function(callback){
    var sh = this;

    var db = sh.api.ds;


    var path_validator = new FieldVal(null);
    var validate_path = function(i) {
        var sh = this;

        var path;
        var path_error = validators.folder_path(sh.paths[i], function(emit_path){
            path = emit_path;
        });
        logger.debug(path_error);

        if(path_error){
            path_validator.invalid(i, path_error);
        } else {
            sh.path_permission_checker.check_permissions_for_path(path,function(status){
                if(status===Constants.WRITE_PERMISSION || status===Constants.READ_PERMISSION){
                    //All good
                } else {
                    path_validator.invalid(i, errors.NOT_FOUND_OR_NO_PERMISSION_TO_ACCESS);
                }
            });
        }
    };

    for(var i = 0; i < sh.paths.length; i++){
        validate_path.call(sh,i);
    }

    sh.path_permission_checker.retrieve_permissions(function(){

        var path_error = path_validator.end();
        if(path_error){
            sh.validator.invalid("paths", path_error);
            sh.callback(sh.validator.end());
            return;
        }

        if(sh.include_subfolders){
            var path_prefixes = [];
            for(var i = 0; i < sh.paths.length; i++){
                var path = sh.paths[i];
                var path_regex = path.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
                path_prefixes.push({
                    "path":{
                        "$regex": "^"+path_regex
                    }
                });
            }
            sh.mongo_query.$or = path_prefixes;
        } else {
            sh.mongo_query.path = {
                "$in": sh.paths
            };
        }

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
                    skip: sh.skip
                });
            }
        };

        var options = {
            skip: sh.skip,
            limit: sh.limit
        };

        if(sh.query_and.length>0){
            sh.mongo_query.$and = sh.query_and;
        }

        logger.debug(JSON.stringify(sh.mongo_query,null,4));
        logger.debug(options);

        var mongo_cursor = db.object_collection.find(sh.mongo_query,options);
        if (sh.sort) {
            mongo_cursor.sort(sh.sort);
        }
        mongo_cursor.toArray(function(search_err, search_res){
            logger.debug(search_err, search_res);
            if(search_err){
                error = search_err;
            } else {
                results = search_res;
            }
            have_results = true;
            done();
        })

        mongo_cursor.count(false,function(err, res_count){
            logger.debug(err, res_count);
            if(err){
                error = err;
            } else {
                count = res_count;
            }
            have_count = true;
            done();
        })
    });
};

module.exports = SearchHandler;