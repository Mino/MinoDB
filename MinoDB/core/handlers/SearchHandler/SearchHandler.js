var errors = require('../../../../errors')
var Validator = require('fieldval');
var BasicVal = require('fieldval-basicval');
var PathPermissionChecker = require('../../models/PathPermissionChecker');
var Constants = require('../../../../common_classes/Constants');
var logger = require('tracer').console();

var SearchOperator = require('./SearchOperator');

function SearchHandler(api, user, parameters, callback){
    var sh = this;

    sh.api = api;
    sh.user = user;
    sh.parameters = parameters;
    sh.callback = callback;

    sh.path_permission_checker = new PathPermissionChecker(sh);

    sh.validator = new Validator(parameters);

    sh.paths = sh.validator.get("paths", BasicVal.array(true));
    sh.query = sh.validator.get("query", BasicVal.object(false));
    if(sh.query!==undefined){
        var operator = new SearchOperator();
        var error = operator.init(sh.query, sh);
        logger.log(error);
        if(error){
            sh.validator.invalid("query", error);
        }
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

        db.object_collection.find({
            "path": {
                "$in": sh.paths
            }
        },{

        }).toArray(function(search_err, search_res){
            // logger.log(search_err, search_res);
            callback(null, {
                "objects": search_res
            })
        });
    });
}

module.exports = SearchHandler;