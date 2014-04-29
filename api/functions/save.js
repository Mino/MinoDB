var errors = require('../errors')
var Validator = require('../../../FieldVal/fieldval-js/lib/fieldval');
var bval = require('../../../FieldVal/fieldval-js/lib/fieldval').BasicVal;
var Path = require('../Models/Path')
var TypeVersion = require('../Models/TypeVersion');
var PathPermissionChecker = require('../Models/PathPermissionChecker');
var SaveObject = require('../Models/SaveObject')
var logger = require('tracer').console();

function SaveHandler(user, parameters, callback){
    var sh = this;

    sh.user = user;
    sh.parameters = parameters;
    sh.callback = callback;

    sh.save_objects = [];
    sh.types_to_retrieve = {};

    sh.path_permission_checker = new PathPermissionChecker(sh);

    sh.validator = new Validator(parameters);

    var objects = sh.validator.get("objects", "array", true, bval.each(function(object, index){
        logger.log(object);
        logger.log(index);

        sh.save_objects.push(new SaveObject(object,sh,index));
    }));

    logger.log(sh.types_to_retrieve);

    sh.retrieve_types();
    sh.path_permission_checker.retrieve_permissions(function(){
        for(var i = 0; i < sh.save_objects.length; i++){
            var save_object = sh.save_objects[i];

            if(!save_object.granted_new_path){
                save_object.validator.invalid("path",Validator.Error(errors.NO_WRITE_PERMISSION))
            }
            var error = save_object.final_error_check();
            if(error!=null){
                sh.validator.invalid(save_object.index, error);
            }
        }
        callback(sh.validator.end());
    });

    var error = sh.validator.end();
    // callback(error);
    return;
}

SaveHandler.prototype.request_type = function(type_name, save_object){
    var sh = this;

    var existing = sh.types_to_retrieve[type_name];
    if(existing===undefined){
        existing = [];
        sh.types_to_retrieve[type_name] = existing;
    }
    existing.push(save_object);
}

SaveHandler.prototype.check_permissions_for_path = function(path, save_object, old_path){
    var sh = this;

    sh.path_permission_checker.check_permissions_for_path(path, save_object, old_path);
}

SaveHandler.prototype.retrieve_types = function(){
    var sh = this;

    //TODO replace mocking
    var person_type = new TypeVersion("person");
    person_type.init({
        "description": "A person type",
        "name": "person",
        "display_name": "Person",
        "fields": [{
            "name": "first_name",
            "display_name": "First Name",
            "type": "Text",
            "min_length": 2,
            "max_length": 32
        },{
            "name": "last_name",
            "display_name": "Last Name",
            "type": "Text",
            "min_length": 2,
            "max_length": 32
        }]
    });

    for(var i in sh.types_to_retrieve){
        var save_objects = sh.types_to_retrieve[i];
        if(i==="person"){
            for(var k = 0; k < save_objects.length; k++){
                var save_object = save_objects[k];
                save_object.got_type(null, person_type);
            }
        }
    }

    for(var i = 0; i < sh.save_objects.length; i++){
        var save_object = sh.save_objects[i];

        var error = save_object.final_error_check();
        if(error!=null){
            sh.validator.invalid(save_object.index, error);
        }
    }
}

module.exports = function(user, parameters, callback){
    new SaveHandler(user, parameters, callback);
};

    // public int totalNumberOfObjectsSaving;
    // public int newIDs;
    // public FolderExistanceChecker folderExistanceChecker;
    // private TypeRetriever typeRetriever;
    // private boolean performPrivilegeChecks = true;
    // public boolean allowDeprecated = true;


//     this.totalNumberOfObjectsSaving = 0;
//     this.newIDs = 0;
//     this.typeRetriever = new TypeRetriever(this.user);
//     this.savingValidator = new ValidatorObject(true);
//     this.folderExistanceChecker = new FolderExistanceChecker();
//     this.clusterTypeSaver = new ClusterTypeSaver(typeRetriever, client);

//     var saving = [];

//     Boolean allowDeprecatedValue = Validator.fieldBoolean("Allow Deprecated Fields", this.parameters, this, false);
//     if (allowDeprecatedValue != null) {
//         this.allowDeprecated = allowDeprecatedValue;
//     }

//     if (objectArray != null) {

//         totalNumberOfObjectsSaving = objectArray.length();

//         savingObjects = new SaveObject[totalNumberOfObjectsSaving];
//         int saveIndex = 0;

//         ListIterator < Object > iterator = objectArray.listIterator();
//         while (iterator.hasNext()) {
//             int index = iterator.nextIndex();
//             Object thisObject = iterator.next();
//             if (thisObject instanceof JSONObject) {
//                 try {
//                     SaveObject item = new SaveObject((JSONObject) thisObject, this, index, this.performPrivilegeChecks);
//                     savingObjects[saveIndex] = item;
//                     if (item.path != null) {
//                         if (!item.folder) {
//                             if (item.numberOfTypes > 0) {
//                                 String userFolder = item.path.objectNames[0];
//                                 clusterTypeSaver.addItem(userFolder, item.allTypeKeys.myArrayList);
//                                 //If saving in app folder then need to save into app search cluster too
//                             }
//                         }
//                     }
//                     saveIndex++;
//                 } catch (JSONException e) {
//                     ServerDaemon.error(e);
//                     ValidatorError err = new ValidatorError(5);
//                     savingValidator.getOrMakeInvalid().put("" + index, err.error);
//                 }
//             } else {
//                 ValidatorError err = new ValidatorError(2);
//                 savingValidator.getOrMakeInvalid().put("" + index, err.error);
//             }
//         }
//     }

//     this.typeRetriever.run();
//     this.folderExistanceChecker.run();

//     for (int i = 0; i < savingObjects.length; i++) {
//         SaveObject obj = savingObjects[i];
//         if (obj != null) {
//             obj.finalCheck();
//         }
//     }

//     try {
//         Validator.finalErrorCheck(null, savingValidator);
//     } catch (ValidatorError fe) {
//         this.getOrMakeInvalid().put("Objects", fe.error);
//     }

//     //Repeat check as objects have now been checked for privileges
//     Validator.finalErrorCheck(this.parameters, this);

//     //Can throw ValidatorError
//     this.clusterTypeSaver.run();

//     if (newIDs > 0) {
//         int idIndex = 0;
//         long[] ids = IDPool.getIDs(newIDs);
//         for (int i = 0; i < savingObjects.length; i++) {
//             SaveObject obj = savingObjects[i];
//             if (obj.isNewID) {
//                 obj.id = ids[idIndex];
//                 idIndex++;
//             }
//         }
//     }

//     this.addUnitCost(this.saveSaveObjects(savingObjects));

//     JSONObject toReturn = new JSONObject();

//     toReturn.put("Objects", objectArray);
//     return toReturn;
// }

// private int saveSaveObjects(SaveObject[] savingObjects) {

//     Double cost = 0.0;

//     try {

//         boolean completeFreePass = false;
//         while (!completeFreePass) {
//             completeFreePass = true;
//             for (int i = 0; i < savingObjects.length; i++) {
//                 SaveObject obj = savingObjects[i];
//                 if (!obj.doSaving(client)) {
//                     completeFreePass = false;
//                 }
//             }
//         }

//     } catch (Exception ex) {
//         ServerDaemon.error(ex);
//     }

//     Client elasticClient = ElasticSearchNode.getInstance().getClient();

//     org.elasticsearch.action.bulk.BulkRequestBuilder bulkRequest = elasticClient.prepareBulk();


//     //WHEN MULTI CLUSTER SEARCHING IS ENABLED, THIS WILL NEED TO DIFFERENTIATE BETWEEN CLUSTERS
//     for (int i = 0; i < savingObjects.length; i++) {
//         SaveObject obj = savingObjects[i];
//         if (obj.shouldIndex) {

//             obj.savingJSON.put("Types", obj.allTypeKeys);

//             if (obj.oldAppFolder != null) {
//                 bulkRequest.add(
//                     elasticClient
//                     .prepareDelete(ServerDaemon.firstClusterName, "minoobject", "APP:" + obj.id)
//                     .setRouting("App." + obj.withinAppFolderName)
//                 );
//             }

//             if (obj.oldUserFolder != null) {
//                 bulkRequest.add(
//                     elasticClient
//                     .prepareDelete(ServerDaemon.firstClusterName, "minoobject", "" + obj.id)
//                     .setRouting("User." + obj.oldUserFolder)
//                 );
//             }

//             obj.savingJSON.put("App Routing", false);
//             String compiledUserObjectString = obj.savingJSON.toString();
//             cost += SaveRequestHandler.costPerItem + SaveRequestHandler.costPerType * obj.numberOfTypes + SaveRequestHandler.costPerCharacter * compiledUserObjectString.length();

//             bulkRequest.add(
//                 elasticClient
//                 .prepareIndex(ServerDaemon.firstClusterName, "minoobject", "" + obj.id).setVersion(obj.versionNum - 1)
//                 .setVersionType(VersionType.EXTERNAL) //Versioning needs fixing (The case where a later version is saved first needs supporting)
//                 .setSource(compiledUserObjectString)
//                 .setRouting("User." + obj.fullPath.objectNames[0])
//             ); //.setRefresh(true);

//             if (obj.withinAppFolderName != null) {
//                 obj.savingJSON.put("App Routing", true);
//                 String compiledAppObjectString = obj.savingJSON.toString();
//                 bulkRequest.add(
//                     elasticClient
//                     .prepareIndex(ServerDaemon.firstClusterName, "minoobject", "APP:" + obj.id).setVersion(obj.versionNum - 1)
//                     .setVersionType(VersionType.EXTERNAL) //Versioning needs fixing (The case where a later version is saved first needs supporting)
//                     .setSource(compiledAppObjectString)
//                     .setRouting("App." + obj.withinAppFolderName)
//                 ); //.setRefresh(true);
//             }
//         }
//     }

//     if (bulkRequest.numberOfActions() > 0) {

//         //bulkRequest.setRefresh(true);

//         ListenableActionFuture < BulkResponse > bulkResponseFuture = bulkRequest.execute();

//         BulkResponse bulkResponse = bulkResponseFuture.actionGet();
//         if (bulkResponse.hasFailures()) {
//             /* Can be caused by normal usage (versioning throws 
//              * errors if earlier version is saved last in the case
//              * of a conflict).
//              */
//             //ServerDaemon.error(new Exception(bulkResponse.buildFailureMessage()));
//         }

//     }

//     return cost.intValue();
// }

// public void objectRequiresNewID(SaveObject obj) {
//     this.newIDs++;
// }

// public void reportObjectHasErrors(SaveObject obj) {
//     JSONObject invalid = savingValidator.getOrMakeInvalid();
//     invalid.put("" + obj.l1Index, obj.requestJSON);
// }

// public TypeRetriever getTypeRetriever() {
//     return this.typeRetriever;
// }

// public FolderExistanceChecker getFolderExistanceChecker() {
//     return this.folderExistanceChecker;
// }

// public String getCurrentTime() {
//     return Common.getDateTimeString(Common.SECONDSDATEFORMAT);
// }

