var logger = require('tracer').console();
var Field = require('./Fields/Field');
var FieldVal = require('../../../FieldVal/fieldval-js/lib/fieldval');
var bval = require('../../../FieldVal/fieldval-js/lib/fieldval').BasicVal;
var validators = require('../validators');

function SaveObject(json, handler, index){
	var so = this;
	so.json = json;
	so.handler = handler;
	so.index = index;
	logger.log(so.index);

	so.waiting_for_types = {};

	so.validator = new FieldVal(json);

	so.id = so.validator.get("id","integer",false,bval.minimum(1));
	so.path = so.validator.get("path","string",true,validators.path);
	so.name = so.validator.get("name","string",true,bval.not_empty(true));
	so.folder = so.validator.get("folder","boolean",false);

	var unrecognized = so.validator.get_unrecognized();

	for(var i = 0; i < unrecognized.length; i++){
		var key = unrecognized[i];
		so.handler.request_type(key, so);
	}
}

SaveObject.prototype.got_type = function(error, type){
	var so = this;

	so.validator.recognized(type.name);

	logger.log("got type: ");
	logger.log(type);

	var error = type.validate_object(so);

	logger.log(error);
	if(error!=null){
		so.validator.invalid(type.name, error);
	}
}

SaveObject.prototype.final_error_check = function(){
	var so = this;

	return so.validator.end();
}

module.exports = SaveObject;


// function SaveObject(){

//     static String idCharSeq = "~ID~";
//     static String idReplacedCharSeq = "ID";
//     public boolean hasIDInName = false;
//     public String withinAppFolderName = null;
//     public int appPathRemovalLength = 0;
//     public ArrayList < CounterObject > counterObjects;
//     public HashMap < String, JSONObject > typeVersionContents;
//     public String name;
//     public Long id;
//     public Path path;
//     public Path fullPath;
//     public Boolean folder = false;

//     public boolean parentFolderExists = false;

//     /* Used to prevent a known errornous item from actually saving. 
//      * Used in a scenario where errors have already been found, but
//      * validation errors are needed anyway.
//      */
//     public Boolean forceError = false;

//     public SaveRequestHandler handler;
//     public int l1Index;
//     public int numberOfTypes;
//     public boolean performPrivilegeChecks = false;
//     public JSONObject savingJSON;
//     public boolean isNewID;
//     public JSONObject requestJSON;

//     boolean finishedSaving = false;
//     public boolean shouldIndex = false;
//     public String createdTimeString = null;
//     public String lastUpdatedTimeString = null;
//     public Path oldFullPath = null;

//     public Path conditionalPreviousPath = null;
//     public Boolean conditionalAllowSubfolder = null;
//     public Boolean conditionalAllowMove = null;
//     public Long conditionalVersion = null;

//     private Boolean allowDeprecated;

//     public JSONArray allTypeKeys = new JSONArray();

//     private SaveObjectPrivilegeRetriever newPathPrivilegeRetriever;
//     private SaveObjectPrivilegeRetriever oldPathPrivilegeRetriever;

//     private JSONObject counterResults = null;

//     public SaveObject(JSONObject json, SaveRequestHandler handler, int l1Index, boolean performPrivilegeChecks) throws JSONException {
//         this.handler = handler;
//         this.l1Index = l1Index;

//         counterObjects = new ArrayList < CounterObject > ();

//         this.performPrivilegeChecks = performPrivilegeChecks;
//         this.requestJSON = json;

//         this.client = CouchbasePool.getInstance().getCache();

//         savingJSON = new JSONObject();

//         //Used to prevent item saving successfully
//         forceError = Validator.fieldBoolean("Force Error", json, this, false);
//         if (forceError == null) {
//             forceError = false;
//         }

//         id = Validator.fieldLong("ID", json, this, false);
//         if (id != null) {
//             if (id < 1) {
//                 this.getOrMakeInvalid().put("ID", new ValidatorError(38).error);
//             } else {
//                 savingJSON.put("ID", id);
//             }
//             isNewID = false;
//         } else {
//             isNewID = true;
//             id = (long) 0;
//             this.handler.objectRequiresNewID(this);
//             savingJSON.put("ID", 0);
//         }

//         name = Validator.fieldString("Name", json, this, true);
//         if (name != null) {

//             String idRemoved = name.replace(SaveObject.idCharSeq, SaveObject.idReplacedCharSeq);
//             if (!idRemoved.equals(name)) {
//                 hasIDInName = true;
//             }

//             if (performPrivilegeChecks && !Common.isValidSavingObjectName(idRemoved)) {
//                 this.getOrMakeInvalid().put("Name", new ValidatorError(59).error);
//             }
//             savingJSON.put("Name", name);
//         }


//         folder = Validator.fieldBoolean("Folder", json, this, false);
//         if (folder == null) {
//             folder = false;
//         }
//         if (folder) {
//             savingJSON.put("Folder", true);
//         } else {
//             savingJSON.put("Folder", false);
//         }

//         //folder must be done before path in order to run getFullPath();
//         String pathString = Validator.fieldString("Path", json, this, true);
//         if (pathString != null) {
//             try {
//                 path = new Path(pathString);

//                 if (name != null) {
//                     fullPath = path.pathForChildWithName(name, this.folder);

//                     if (performPrivilegeChecks) {
//                         int additional = 0;
//                         if (hasIDInName) {
//                             //Checks with the IDPool that the highest possible ID this object is likely to obtain fits the name length
//                             Long highestPossibleID = IDPool.getLastID();
//                             String stringRepresentationOfHighestID = highestPossibleID.toString();
//                             int stringLength = stringRepresentationOfHighestID.length();
//                             if (stringLength > 3) {
//                                 additional = stringLength + 1;
//                             }
//                         }
//                         if ((fullPath.toString().getBytes().length + additional) > Common.maximumAllowedPathLength) {
//                             this.getOrMakeInvalid().put("Name", new ValidatorError(126).error);
//                         }
//                     }

//                     if (path.length() >= 3) {
//                         if (path.objectNames[1].equals("Apps")) {
//                             appPathRemovalLength = 1 + path.objectNames[0].length() + 1 + path.objectNames[1].length();

//                             this.withinAppFolderName = path.objectNames[2];
//                             savingJSON.put("App Path", path.toString().substring(appPathRemovalLength));
//                             savingJSON.put("App Full Path", fullPath.toString().substring(appPathRemovalLength));
//                         }
//                     }

//                     savingJSON.put("Path", path.toString());
//                     savingJSON.put("Full Path", this.fullPath.toString());

//                     this.handler.getFolderExistanceChecker().addSaveObject(this);

//                     if (performPrivilegeChecks) {
//                         this.newPathPrivilegeRetriever = new SaveObjectPrivilegeRetriever(this.client, this.handler.user.username, path);
//                     }
//                 }
//             } catch (ValidatorError fe) {
//                 this.getOrMakeInvalid().put("Path", new ValidatorError(8).error);
//             }
//         }

//         /*publicVal = Validator.fieldBoolean("Public", json, this, true,true);
// 		if(publicVal!=null){
// 			if(publicVal){
// 				savingJSON.put("Public", true);
// 			} else {
// 				savingJSON.put("Public", false);
// 			}
// 		}*/

//         JSONObject conditionObject = Validator.fieldObject("Conditions", json, this, false);
//         if (conditionObject != null) {
//             if (this.id == 0) {
//                 this.getOrMakeInvalid().put("Conditions", new ValidatorError(139).error);
//             } else {
//                 ValidatorObject conditionVal = new ValidatorObject();

//                 this.conditionalAllowMove = Validator.fieldBoolean("Allow Move", conditionObject, conditionVal, false);

//                 boolean didTryConditionalPath = false;
//                 String conditionalPathString = Validator.fieldString("Previous Path", conditionObject, conditionVal, false);
//                 if (conditionalPathString != null) {
//                     didTryConditionalPath = true;
//                     if (this.conditionalAllowMove != null && !(this.conditionalAllowMove)) {
//                         conditionVal.getOrMakeInvalid().put("Previous Path", new ValidatorError(140).error);
//                     } else {
//                         try {
//                             this.conditionalPreviousPath = new Path(conditionalPathString);
//                         } catch (ValidatorError fe) {
//                             conditionVal.getOrMakeInvalid().put("Previous Path", new ValidatorError(8).error);
//                         }
//                     }
//                 }
//                 this.conditionalAllowSubfolder = Validator.fieldBoolean("Allow Subfolder", conditionObject, conditionVal, false);
//                 if (this.conditionalAllowSubfolder != null && !(didTryConditionalPath)) {
//                     conditionVal.getOrMakeInvalid().put("Allow Subfolder", new ValidatorError(137).error);
//                 }

//                 this.conditionalVersion = Validator.fieldLong("Previous Version", conditionObject, conditionVal, false);
//                 if (this.conditionalVersion != null) {
//                     if (this.conditionalVersion < 1) {
//                         conditionVal.getOrMakeInvalid().put("Previous Version", new ValidatorError(138).error);
//                     }
//                 }

//                 try {
//                     Validator.finalErrorCheck(conditionObject, conditionVal);
//                 } catch (ValidatorError fe) {
//                     this.getOrMakeInvalid().put("Conditions", fe.error);
//                 }
//             }
//         }

//         Boolean allowDeprecatedValue = Validator.fieldBoolean("Allow Deprecated Fields", json, this, false);
//         if (allowDeprecatedValue != null) {
//             this.allowDeprecated = allowDeprecatedValue;
//         } else {
//             this.allowDeprecated = handler.allowDeprecated;
//         }

//         Validator.fieldString("Full Path", json, this, false);
//         Validator.fieldString("App Path", json, this, false);
//         Validator.fieldString("App Full Path", json, this, false);
//         Validator.fieldString("Created", json, this, false);
//         Validator.fieldString("Last Updated", json, this, false);
//         Validator.fieldValue("Version", json, this, false);

//         String currentTime = handler.getCurrentTime();

//         lastUpdatedTimeString = currentTime;

//         if (isNewID) {
//             createdTimeString = currentTime;
//             savingJSON.put("Created", createdTimeString);
//             if (!this.folder) {
//                 savingJSON.put("Last Updated", lastUpdatedTimeString);
//                 savingJSON.put("Version", 1);
//             }
//         } else {
//             savingJSON.put("Created", "");
//             if (!this.folder) {
//                 savingJSON.put("Last Updated", lastUpdatedTimeString);
//                 savingJSON.put("Version", 0);
//             }
//         }

//         String[] keysToRemove = new String[json.length()];
//         this.numberOfTypes = 0;

//         if (!performPrivilegeChecks) {

//             Iterator < Entry < String, Object >> keys = json.entries().iterator();
//             while (keys.hasNext()) {
//                 Entry < String, Object > thisPair = keys.next();
//                 String typeName = thisPair.getKey();
//                 if (Common.isValidTypeVersionName(typeName)) {
//                     //Type Retriever must be used so that it can retrieve types for ClusterTypeSaver
//                     handler.getTypeRetriever().requestTypeVersionNameWithListener(typeName, null);
//                     this.savingJSON.put(typeName, thisPair.getValue());
//                     keysToRemove[this.numberOfTypes] = typeName;
//                     allTypeKeys.put(typeName);
//                     this.numberOfTypes++;
//                 }
//             }

//         } else {

//             if (folder != null && folder) {
//                 Iterator < Entry < String, Object >> keys = json.entries().iterator();
//                 while (keys.hasNext()) {
//                     Entry < String, Object > thisPair = keys.next();
//                     if (Common.isValidTypeVersionName(thisPair.getKey())) {
//                         this.getOrMakeInvalid().put(thisPair.getKey(), new ValidatorError(25).error);
//                         keysToRemove[this.numberOfTypes] = thisPair.getKey();
//                         this.numberOfTypes++;
//                     }
//                 }
//             } else {

//                 Iterator < Entry < String, Object >> keys = json.entries().iterator();
//                 typeVersionContents = new HashMap < String, JSONObject > ();
//                 while (keys.hasNext()) {
//                     Entry < String, Object > thisPair = keys.next();
//                     String typeName = thisPair.getKey();
//                     if (Common.isValidTypeVersionName(typeName)) {
//                         Object value = thisPair.getValue();
//                         JSONObject typeContents = null;
//                         if (value instanceof JSONObject) {
//                             typeContents = (JSONObject) value;
//                         } else if (value instanceof JSONArray && ((JSONArray) value).length() == 0) {
//                             typeContents = new JSONObject();
//                         } else {
//                             this.getOrMakeInvalid().put(typeName, new ValidatorError(26).error);
//                         }

//                         if (typeContents != null) {
//                             typeVersionContents.put(typeName, typeContents);
//                             handler.getTypeRetriever().requestTypeVersionNameWithListener(typeName, this);
//                         }

//                         keysToRemove[this.numberOfTypes] = typeName;
//                         allTypeKeys.put(typeName);
//                         this.numberOfTypes++;
//                     }
//                 }
//             }

//         }

//         for (int i = 0; i < this.numberOfTypes; i++) {
//             json.remove(keysToRemove[i]);
//         }
//     }

//     public void addCounterObject(CounterObject co) {
//         counterObjects.add(co);
//     }









//     public boolean hasMovedParent = false;
//     public String oldUserFolder = null; //If anything but null, the object has left this user
//     public String oldAppFolder = null; //If anything but null, the object left this app folder
//     public String newAppFolder = null; //If anything but null, the object has entered this app folder
//     public boolean hasAnOldPath = false;

//     public int stage = 1;

//     private double randomSeedForBlank = Math.random();

//     //Stage 1
//     Future < Boolean > didAddIDFuture;
//     Future < Boolean > didAddNextIDFuture;

//     //Stage 2
//     boolean didAddID = false;
//     boolean didCreateNewPath = false;
//     boolean didAddNextID = false;
//     Future < CASValue < Object >> casGetIDFuture;
//     Future < CASValue < Object >> casGetPathFuture;
//     Future < Object > idGetFuture;
//     OperationFuture < Boolean > addBlankPathFuture;
//     OperationFuture < Boolean > didUnlockIDFuture = null;
//     OperationFuture < Boolean > didUnlockNewPathFuture = null;
//     OperationFuture < Boolean > didUnlockOldPathFuture = null;

//     //Stage 3
//     boolean forceUnlockOfNewPath = false;
//     boolean gotNewPathLock = false;
//     boolean gotIDLock = false;
//     CASValue < Object > idCASValue;
//     Future < Boolean > didAddNewPathFuture;
//     Future < Boolean > didAddChildCountFuture;
//     Future < Long > didIncreaseParentFuture;

//     //Stage 4
//     boolean gotOldPathLock = false;
//     boolean oldFullPathIsEqual = false;
//     public Path oldParentPath = null;
//     boolean didAddChildCount;
//     Long didIncreaseParent;
//     boolean didAddNewPath;
//     Future < CASValue < Object >> oldPathCASFuture;

//     //Stage 5
//     CASValue < Object > newPathCAS;
//     CASValue < Object > oldPathCAS;
//     Future < Long > getNewVersionNumFuture;

//     //Stage 6
//     public long versionNum;
//     Future < Boolean > didAddVersionFuture;
//     Future < Long > didDecreaseParentFuture;
//     Future < Boolean > didDeleteOldPathFuture;
//     OperationFuture < Boolean > didPreDeleteUnlockOfOldPath;
//     Future < CASResponse > didSaveIDFuture;
//     Future < CASResponse > didSavePathFuture;

//     //Stage 7
//     boolean didAddVersion;
//     boolean didDeleteOldPath;
//     boolean idSaveSuccess;
//     boolean pathSaveSuccess;




//     private void revertChanges(CouchbaseClient client) {

//         if (this.didAddID) {
//             client.delete(CouchbasePool.toKVIDKey(id));
//         }
//         if (this.didAddNextID) {
//             client.delete(CouchbasePool.toKVIDNextKey(id));
//         }


//         if (idCASValue != null) {
//             client.asyncUnlock(CouchbasePool.toKVIDKey(id), idCASValue.getCas());
//         }
//         if (newPathCAS != null) {
//             client.asyncUnlock(CouchbasePool.toKVPathKey(this.fullPath.toString()), newPathCAS.getCas());
//         }
//         if (oldPathCAS != null) {
//             client.asyncUnlock(CouchbasePool.toKVPathKey(this.oldFullPath.toString()), oldPathCAS.getCas());
//         }

//         if (didAddNewPath) {
//             try {
//                 client.delete(CouchbasePool.toKVPathKey(this.fullPath.toString())).get();
//             } catch (Exception e) {
//                 ServerDaemon.error(e);
//             }
//         }
//         if (folder) {
//             if (didAddChildCount) {
//                 client.delete(CouchbasePool.toKVChildCountKey(this.fullPath.toString()));
//             }
//         }

//         if (isNewID || hasMovedParent) {
//             client.asyncDecr(CouchbasePool.toKVChildCountKey(this.path.toString()), 1);
//         } else {

//         }
//         if (didAddVersion) {
//             client.delete(CouchbasePool.toKVIDVersionKey(id + "/" + versionNum));
//         }
//     }

//     public boolean doSaving(CouchbaseClient client) throws InterruptedException, ExecutionException, TimeoutException, JSONException { //returns true if saving is complete

//         if (finishedSaving) {
//             return true;
//         }

//         if (stage == 1) {

//             if ((this.performPrivilegeChecks && !newPathPrivilegeRetriever.isGranted()) || (!parentFolderExists)) {
//                 //This user cannot write to the new path
//                 this.getOrMakeInvalid().put("Path", new ValidatorError(32).error);
//             }

//             if (this.hasIDInName) {
//                 name = name.replace(idCharSeq, "" + id);
//                 try {
//                     this.fullPath = this.path.pathForChildWithName(this.name, this.folder);
//                 } catch (ValidatorError e) {
//                     ServerDaemon.error(e);
//                 }
//                 savingJSON.put("Name", name);
//                 savingJSON.put("Full Path", this.fullPath.toString());
//                 if (this.withinAppFolderName != null) {
//                     savingJSON.put("App Full Path", fullPath.toString().substring(appPathRemovalLength));
//                 }
//             }

//             if (isNewID) {
//                 savingJSON.put("ID", id);

//                 //Add the "ID"
//                 didAddIDFuture = client.add(CouchbasePool.toKVIDKey(id), 0, "" + id + "/NEW");

//                 //Add the counter for "ID" to hold the current version number
//                 didAddNextIDFuture = client.add(CouchbasePool.toKVIDNextKey(id), 0, "1");
//             }
//         }

//         if (stage == 2) {

//             if (isNewID) {
//                 if (!this.didAddIDFuture.isDone() || !this.didAddNextIDFuture.isDone()) {
//                     return false;
//                 }
//                 this.didAddID = this.didAddIDFuture.get(10, TimeUnit.SECONDS);
//                 this.didAddNextID = this.didAddNextIDFuture.get(10, TimeUnit.SECONDS);
//                 if (!(this.didAddID && this.didAddNextID)) {
//                     requestJSON.useMapOf(new ValidatorError(39).error);
//                     revertChanges(client);
//                     finishedSaving = true;
//                     return true;
//                 }
//             }

//             if (didUnlockIDFuture != null) {
//                 didUnlockIDFuture.get();
//                 didUnlockIDFuture = null;
//             }
//             if (didUnlockNewPathFuture != null) {
//                 didUnlockNewPathFuture.get();
//                 didUnlockNewPathFuture = null;
//             }
//             if (didUnlockOldPathFuture != null) {
//                 didUnlockOldPathFuture.get();
//                 didUnlockOldPathFuture = null;
//             }

//             didAddNewPathFuture = client.add(CouchbasePool.toKVPathKey(this.fullPath.toString()), 30, "BLANK" + randomSeedForBlank);
//             if (folder) {
//                 //Add the child counter for the "Full Path"
//                 didAddChildCountFuture = client.add(CouchbasePool.toKVChildCountKey(this.fullPath.toString()), 0, "0");
//             }

//             //Lock for 3 seconds
//             if (casGetIDFuture == null) {
//                 casGetIDFuture = client.asyncGetAndLock(CouchbasePool.toKVIDKey(id), 3);
//                 idGetFuture = client.asyncGet(CouchbasePool.toKVIDKey(id));
//             }

//         }

//         if (stage == 3) {

//             if (!this.didAddNewPathFuture.isDone()) {
//                 return false;
//             }

//             didAddNewPath = didAddNewPathFuture.get(10, TimeUnit.SECONDS);
//             if (folder) {
//                 didAddChildCount = didAddChildCountFuture.get(10, TimeUnit.SECONDS);
//             }

//             idCASValue = casGetIDFuture.get(10, TimeUnit.SECONDS);
//             Object idGet = idGetFuture.get(10, TimeUnit.SECONDS);

//             if (idGet == null) {
//                 //ID doesn't exist
//                 this.getOrMakeInvalid().put("ID", new ValidatorError(80).error);
//             }

//             hasAnOldPath = false;
//             gotIDLock = false; {
//                 if (idCASValue.getValue() != null) {
//                     gotIDLock = true;


//                     if (casGetPathFuture == null) {
//                         casGetPathFuture = client.asyncGetAndLock(CouchbasePool.toKVPathKey(this.fullPath.toString()), 3);
//                     }

//                     if (isNewID) {
//                         hasAnOldPath = false;
//                     } else {
//                         String[] versionAndCreated = Common.splitIDValueToVersionAndPathAndCreated((String) idCASValue.getValue());
//                         String versionString = versionAndCreated[0];
//                         try {
//                             Path latestOldPath = new Path(versionAndCreated[1]);
//                             if (oldFullPath == null || !oldFullPath.toString().equals(latestOldPath.toString())) {
//                                 oldFullPath = latestOldPath;
//                                 if (oldFullPath.isFolder() != this.folder) {
//                                     this.getOrMakeInvalid().put("Folder", new ValidatorError(97).error);
//                                 }
//                                 if (performPrivilegeChecks) {
//                                     this.oldPathPrivilegeRetriever = new SaveObjectPrivilegeRetriever(client, this.handler.user.username, oldFullPath);
//                                 }
//                             }


//                             hasAnOldPath = !(oldFullPath.toString().equals(this.fullPath.toString()));
//                             if (hasAnOldPath) {
//                                 if (oldPathCASFuture == null) {
//                                     oldPathCASFuture = client.asyncGetAndLock(CouchbasePool.toKVPathKey(oldFullPath.toString()), 3);
//                                 }
//                             }


//                         } catch (ValidatorError fe) {
//                             ServerDaemon.error(fe);
//                         }
//                     }

//                 } else {
//                     casGetIDFuture = null;
//                 }
//             }

//         }

//         if (stage == 4) {


//             this.forceUnlockOfNewPath = false;
//             gotNewPathLock = false;

//             if (casGetPathFuture != null) {

//                 if (!this.casGetPathFuture.isDone()) {
//                     return false;
//                 }

//                 newPathCAS = casGetPathFuture.get(10, TimeUnit.SECONDS);

//                 {
//                     if (newPathCAS.getValue() != null) {
//                         String newPathKeyContents = (String) newPathCAS.getValue();
//                         if (newPathKeyContents.equals("BLANK" + randomSeedForBlank)) {
//                             //The lock has been placed on a newly created path for this instance
//                         } else if (Common.hasPrefix(newPathKeyContents, "BLANK")) {
//                             //Should unlock because this path has been created by another instance and this instance just created a lock on it
//                             this.forceUnlockOfNewPath = true;
//                         } else if (!Common.hasPrefix(newPathKeyContents, this.id + "/")) {
//                             this.getOrMakeInvalid().put("Name", new ValidatorError(43).error);
//                         }
//                         gotNewPathLock = true;
//                     } else {
//                         casGetPathFuture = null;
//                     }
//                 }
//             }




//             gotOldPathLock = false;
//             if (hasAnOldPath) {
//                 oldPathCAS = oldPathCASFuture.get();

//                 if (oldPathCAS.getValue() != null) {
//                     gotOldPathLock = true;
//                 } else {
//                     oldPathCASFuture = null;
//                 }

//                 if (this.oldPathPrivilegeRetriever != null) {
//                     //The oldPathPrivilegeRetriever can be null if the check has already been performed (multiple attempts at locking the same path)
//                     if (!this.oldPathPrivilegeRetriever.isGranted()) {
//                         this.getOrMakeInvalid().put("ID", new ValidatorError(80).error);
//                     }
//                 }
//             }

//             try {
//                 Validator.finalErrorCheck(null, this);
//             } catch (ValidatorError fe) {
//                 requestJSON.useMapOf(fe.error);
//                 revertChanges(client);
//                 finishedSaving = true;
//                 return true;
//             }

//             didUnlockIDFuture = null;
//             didUnlockNewPathFuture = null;
//             didUnlockOldPathFuture = null;

//             boolean didAcquireAllLocks = false;
//             if (hasAnOldPath) {
//                 didAcquireAllLocks = gotIDLock && gotNewPathLock && gotOldPathLock;
//             } else {
//                 didAcquireAllLocks = gotIDLock && gotNewPathLock;
//             }

//             if (this.forceUnlockOfNewPath == true) {
//                 didAcquireAllLocks = false;
//             }

//             if (!didAcquireAllLocks) {
//                 //Release all acquired locks
//                 if (gotIDLock) {
//                     didUnlockIDFuture = client.asyncUnlock(CouchbasePool.toKVIDKey(id), idCASValue.getCas());
//                     casGetIDFuture = null;
//                 }
//                 if (gotNewPathLock) {
//                     didUnlockNewPathFuture = client.asyncUnlock(CouchbasePool.toKVPathKey(this.fullPath.toString()), newPathCAS.getCas());
//                     casGetPathFuture = null;
//                 }
//                 if (gotOldPathLock) {
//                     didUnlockOldPathFuture = client.asyncUnlock(CouchbasePool.toKVPathKey(this.oldFullPath.toString()), oldPathCAS.getCas());
//                     oldPathCASFuture = null;
//                 }
//                 stage = 2;
//                 return false;
//             }

//             if (!isNewID) {
//                 String idVal = (String) idCASValue.getValue();
//                 String[] versionAndCreated = Common.splitIDValueToVersionAndPathAndCreated(idVal);
//                 this.createdTimeString = versionAndCreated[2];
//                 savingJSON.put("Created", createdTimeString);
//                 String versionString = versionAndCreated[0];

//                 if (this.conditionalVersion != null) {
//                     String[] versionSplit = Common.splitToIDAndVersionString(versionString);
//                     if (!this.conditionalVersion.toString().equals(versionSplit[1])) {
//                         requestJSON.useMapOf(new ValidatorError(143).error);
//                         revertChanges(client);
//                         finishedSaving = true;
//                         return true;
//                     }
//                 }

//                 String oldVersionPath = versionAndCreated[1];
//                 if (!oldVersionPath.equals(oldFullPath.toString())) {
//                     requestJSON.useMapOf(new ValidatorError(104).error);
//                     revertChanges(client);
//                     finishedSaving = true;
//                     return true;
//                 }
//             }
//         } else if (stage == 5) {
//             if (!isNewID) {
//                 oldParentPath = oldFullPath.parentPath();

//                 if (this.conditionalPreviousPath != null) {
//                     boolean isValid = true;
//                     if (oldParentPath.length() < this.conditionalPreviousPath.length()) {
//                         isValid = false;
//                     } else if (
//                         this.conditionalAllowSubfolder != null && !(this.conditionalAllowSubfolder) && oldParentPath.length() != this.conditionalPreviousPath.length()) {
//                         isValid = false;
//                     } else {
//                         for (int i = 0; i < this.conditionalPreviousPath.length(); i++) {
//                             if (!this.conditionalPreviousPath.objectNames[i].equals(oldParentPath.objectNames[i])) {
//                                 isValid = false;
//                                 break;
//                             }
//                         }
//                     }
//                     if (!isValid) {
//                         requestJSON.useMapOf(new ValidatorError(142).error);
//                         finishedSaving = true;
//                         this.revertChanges(client);
//                         return true;
//                     }
//                 }

//                 if (oldFullPath.toString().equals(this.fullPath.toString())) {
//                     oldFullPathIsEqual = true;
//                 } else {

//                     if (this.conditionalAllowMove != null && !(this.conditionalAllowMove)) {
//                         requestJSON.useMapOf(new ValidatorError(141).error);
//                         finishedSaving = true;
//                         this.revertChanges(client);
//                         return true;
//                     } else {

//                         //New path is different.
//                         if (folder) { //Folders cannot be moved or renamed.

//                             requestJSON.useMapOf(new ValidatorError(46).error);
//                             finishedSaving = true;
//                             this.revertChanges(client);
//                             return true;
//                         }
//                         hasMovedParent = !oldParentPath.toString().equals(this.path.toString());
//                         if (hasMovedParent) {

//                             if (oldFullPath.length() >= 3) {
//                                 if (oldParentPath.objectNames[1].equals("Apps")) {
//                                     this.oldAppFolder = oldParentPath.objectNames[2];
//                                 }
//                             }
//                             if (this.path.length() >= 3) {
//                                 if (this.path.objectNames[1].equals("Apps")) {
//                                     this.newAppFolder = path.objectNames[2];
//                                 }
//                             }
//                             if (this.oldAppFolder != null && this.newAppFolder != null) {
//                                 if (this.oldAppFolder.equals(this.newAppFolder)) {
//                                     this.oldAppFolder = null;
//                                     this.newAppFolder = null;
//                                 }
//                             }
//                             if (!this.path.objectNames[0].equals(this.oldFullPath.objectNames[0])) {
//                                 //Moved between users
//                                 this.oldUserFolder = this.oldFullPath.objectNames[0];
//                             }

//                             //Increase the child counter for the "Path"
//                             this.didIncreaseParentFuture = client.asyncIncr(CouchbasePool.toKVChildCountKey(this.path.toString()), 1);
//                         }

//                     }
//                 }

//             } else {
//                 //Increase the child counter for the "Path"
//                 this.didIncreaseParentFuture = client.asyncIncr(CouchbasePool.toKVChildCountKey(this.path.toString()), 1);
//             }

//         } else if (stage == 6) {

//             if (hasMovedParent || isNewID) {

//                 if (!this.didIncreaseParentFuture.isDone()) {
//                     return false;
//                 }

//                 Long parentChildCount = didIncreaseParentFuture.get(10, TimeUnit.SECONDS);
//                 if (parentChildCount < 1) {
//                     requestJSON.useMapOf(new ValidatorError(41).error);
//                     finishedSaving = true;
//                     this.revertChanges(client);
//                     return true;
//                 }
//             }

//             if (!isNewID) {
//                 //Increase "ID" version counter
//                 getNewVersionNumFuture = client.asyncIncr(CouchbasePool.toKVIDNextKey(id), 1);
//             }

//             for (CounterObject co: counterObjects) {
//                 String counterName = co.compileFullName();
//                 String memCounterName = CouchbasePool.toKVCounterKey(counterName);
//                 if (co.setTo == null) {
//                     co.membaseAddFuture(client.add(memCounterName, 0, "0"));
//                     co.membaseGetValueFuture(client.asyncGet(memCounterName));
//                 } else {
//                     co.membaseSaveFuture(client.set(memCounterName, 0, "" + co.setTo));
//                 }
//             }

//         } else if (stage == 7) {
//             if (isNewID) {
//                 versionNum = 1;
//             } else {

//                 if (!this.getNewVersionNumFuture.isDone()) {
//                     return false;
//                 }

//                 versionNum = getNewVersionNumFuture.get(10, TimeUnit.SECONDS);
//                 if (!this.folder) {
//                     savingJSON.put("Version", versionNum);
//                 }
//             }

//             if (counterObjects.size() != 0) {
//                 counterResults = new JSONObject();
//                 for (CounterObject co: counterObjects) {
//                     counterResults.put(co.fullName, co.finalProcessing());
//                 }
//             }

//             //Add the version
//             didAddVersionFuture = client.add(CouchbasePool.toKVIDVersionKey(id + "/" + versionNum), 0, this.savingJSON.toString());

//             //Save the "ID" if it hasn't been changed since it was CAS loaded
//             didSaveIDFuture = client.asyncCAS(CouchbasePool.toKVIDKey(id), idCASValue.getCas(), Common.buildIDValueFromIDVersionPathAndCreated("" + id + "/" + versionNum, this.fullPath.toString(), this.createdTimeString));

//             //Save the "Full Path" if it hasn't been changed since it was CAS loaded
//             didSavePathFuture = client.asyncCAS(CouchbasePool.toKVPathKey(this.fullPath.toString()), newPathCAS.getCas(), 0, ("" + id + "/" + versionNum), client.getTranscoder());

//             if (hasAnOldPath) {
//                 didPreDeleteUnlockOfOldPath = client.asyncUnlock(CouchbasePool.toKVPathKey(this.oldFullPath.toString()), oldPathCAS.getCas());
//                 didDeleteOldPathFuture = client.delete(CouchbasePool.toKVPathKey(this.oldFullPath.toString()));
//             }
//         } else if (stage == 8) {

//             if (!this.didAddVersionFuture.isDone() || !this.didSaveIDFuture.isDone() || !this.didSavePathFuture.isDone()) {
//                 return false;
//             }

//             didAddVersion = didAddVersionFuture.get(10, TimeUnit.SECONDS);
//             CASResponse idSave = didSaveIDFuture.get(10, TimeUnit.SECONDS);
//             CASResponse pathSave = didSavePathFuture.get(10, TimeUnit.SECONDS);

//             if (hasAnOldPath) {
//                 boolean didUnlockOldPath = didPreDeleteUnlockOfOldPath.get();
//                 didDeleteOldPath = didDeleteOldPathFuture.get();
//             }

//             if (!didAddVersion) {
//                 requestJSON.useMapOf(new ValidatorError(44).error);
//                 finishedSaving = true;
//                 this.revertChanges(client);
//                 return true;
//             }

//             idSaveSuccess = true;
//             pathSaveSuccess = true;

//             if (idSave.equals(CASResponse.OK)) {
//                 idSaveSuccess = true;
//             }
//             if (pathSave.equals(CASResponse.OK)) {
//                 pathSaveSuccess = true;
//             }

//             if (idSaveSuccess && pathSaveSuccess) {
//                 finishedSaving = true;
//                 shouldIndex = true;


//                 if (!isNewID) {
//                     if (hasMovedParent) {
//                         client.asyncDecr(CouchbasePool.toKVChildCountKey(oldParentPath.toString()), 1);
//                     }
//                 }


//                 try {
//                     requestJSON.put("ID", id);
//                     requestJSON.put("Name", this.name);
//                     requestJSON.put("Full Path", this.fullPath.toString());
//                     requestJSON.put("Created", this.createdTimeString);
//                     if (!this.folder) {
//                         requestJSON.put("Last Updated", this.lastUpdatedTimeString);
//                     }
//                     if (!this.folder) {
//                         requestJSON.put("Version", this.versionNum);
//                     }
//                     if (this.counterResults != null) {
//                         requestJSON.put("Counters", counterResults);
//                     }
//                 } catch (JSONException e) {
//                     ServerDaemon.error(e);
//                 }
//                 return true;
//             } else {
//                 requestJSON.useMapOf(new ValidatorError(42).error);
//                 finishedSaving = true;
//                 this.revertChanges(client);
//                 return true;
//             }

//         }

//         stage++;
//         return false;
//     }

//     public void reportFolderExistance(boolean doesExist) {
//         this.parentFolderExists = doesExist;
//     }

//     synchronized public void finalCheck() {
//         try {
//             Validator.finalErrorCheck(this.requestJSON, this, this.forceError);
//         } catch (ValidatorError fe) {
//             this.requestJSON.useMapOf(fe.error);
//             this.handler.reportObjectHasErrors(this);
//             return;
//         }
//     }

//     @
//     Override
//     public void typeVersionAvailable(TypeVersion thisTV) {
//         try {
//             JSONObject toSave = new JSONObject();
//             JSONObject contents = this.typeVersionContents.get(thisTV.fullVersionName);
//             thisTV.checkValidityOfItem(this, contents, toSave, this.allowDeprecated);
//             savingJSON.put(thisTV.fullVersionName, toSave);
//         } catch (ValidatorError fe) {
//             this.getOrMakeInvalid().put(thisTV.fullVersionName, fe.error);
//         }
//     }

//     @
//     Override
//     public void typeVersionNotAvailable(TypeVersion thisTV) {
//         this.getOrMakeInvalid().put(thisTV.fullVersionName, new ValidatorError(15).error);
//     }
// }