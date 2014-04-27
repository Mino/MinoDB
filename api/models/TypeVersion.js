var logger = require('tracer').console();
var Field = require('./Fields/Field');
var FieldVal = require('../../../FieldVal/fieldval-js/lib/fieldval');

function TypeVersion(full_name) {
    var tv = this;
    tv.full_name = full_name;
    tv.name = full_name;
    tv.fields = {};
}

//Performs validation required for saving
TypeVersion.prototype.init_for_saving = function(json) {
    var tv = this;

    return tv.validate(json);
}


//Just creates fields for validation - does not validate type
TypeVersion.prototype.init = function(json) {
    var tv = this;
    //TODO
    var fields_json = json.fields;

    tv.process_fields(fields_json, false);

    return null;
}

TypeVersion.prototype.validate = function(json) {
    var tv = this;

    tv.validator = new Validator(json);

    tv.name = tv.validator.get("name", "string", true);
    tv.display_name = tv.validator.get("display_name", "string", true);
    tv.description = tv.validator.get("description", "string", false);
    tv.required_types = tv.validator.get("required_types", "array", false);
    //TODO validate required types

    var fields_json = tv.validator.get("fields", "array", true);
    if (fields_json != null) {
        var fields_error = tv.process_fields(fields_json, true);
        if(fields_error!=null){
            tv.validator.invalid("fields",fields_error);
        }
    }

    var error = tv.validator.end();
    return error;
}

TypeVersion.prototype.process_fields = function(fields_json, validate) {
    var tv = this;

    var fields_validator = new Validator(null);

    for (var i = 0; i < fields_json.length; i++) {
        var field_json = fields_json[i];

        var field_creation = Field.create_field(tv, field_json, false);
        var err = field_creation[0];
        var field = field_creation[1];

        if(err!=null){
            fields_validator.invalid(""+i,err);
        }

        tv.fields[field.name] = field;
    }

    return fields_validator.end();
}

TypeVersion.prototype.validate_object = function(save_object){
    var tv = this;

    var this_type_contents = save_object.json[tv.full_name];


    var validator = new Validator(this_type_contents);

    for(var i in tv.fields){
        var field = tv.fields[i];
        field.validate(validator);
    }

    return validator.end();
}

module.exports = TypeVersion;

// public HashMap < String, ValueField > fieldMap;
// public ArrayList < ValueField > fieldList;
// ValidatorObject validatorObject;
// public String name = null;
// public String description = null;
// public String partialName = null;
// public String fullVersionName = null;
// JSONArray requiredTypes = null;
// public String beingSavedUsername = null;
// public String typeCreatorUsername = null;
// public JSONObject savingJSON = null;
// public JSONObject savingDetailedJSON = null;
// public HashMap < String, Object > elasticFieldsMap = null;
// public JSONArray savingFields = null;
// public JSONArray savingDetailedFields = null;
// TypeVersion.prototype.forMappingCreation = false;
// public Long revision = 0L; //0 indicates original version (no modifications)
// TypeVersion.prototype.removeDeprecatedFields = false;

// //Enforces that the specified version number must be the next one for the type
// TypeVersion.prototype.strictVersioning = true;

// TypeVersion.prototype.isInitialized = false;

// public TypeVersion(String fullVersionName) {
//     this.fullVersionName = fullVersionName;
//     String[] split = fullVersionName.split("\\.");
//     typeCreatorUsername = split[0];
//     partialName = split[0] + "." + split[1];
//     validatorObject = new ValidatorObject();
//     savingJSON = null; //Don't save anything (being used, rather than created)
// }

// public TypeVersion(String fullName, String username) { //username can be null if the invoker wants the json, but not validation of version numbers
//     this.partialName = fullName;
//     if (this.partialName != null) {
//         String[] split = this.partialName.split("\\.");
//         typeCreatorUsername = split[0];
//     }
//     validatorObject = new ValidatorObject();
//     beingSavedUsername = username;
//     savingJSON = new JSONObject();
//     savingDetailedJSON = new JSONObject();
//     elasticFieldsMap = new HashMap < String, Object > ();
// }

// public TypeVersion(String fullName, Boolean forMappingCreation) {
//     this.partialName = fullName;
//     if (this.partialName != null) {
//         String[] split = this.partialName.split("\\.");
//         typeCreatorUsername = split[0];
//     }
//     validatorObject = new ValidatorObject();
//     savingJSON = null;
//     savingDetailedJSON = null;
//     elasticFieldsMap = new HashMap < String, Object > ();
// }

// TypeVersion.prototype.setVersion = function(version) {
//     var tv = this;
//     this.fullVersionName = this.partialName + "." + version;

//     if (savingJSON != null) {
//         savingJSON.put("Full Name", this.fullVersionName);
//     }
//     if (savingDetailedJSON != null) {
//         savingDetailedJSON.put("Full Name", this.fullVersionName);
//     }
// }

// TypeVersion.prototype.setRevision = function(revision) {
//     var tv = this;
//     if (savingJSON != null) {
//         savingJSON.put("Revision", revision);
//     }
//     if (savingDetailedJSON != null) {
//         savingDetailedJSON.put("Revision", revision);
//     }
// }

// TypeVersion.prototype.setRemoveDeprecatedFields = function(removeDeprecatedFields) {
//     var tv = this;
//     this.removeDeprecatedFields = removeDeprecatedFields;
// }

// TypeVersion.prototype.setStrictVersioning = function(strictVersioning) {
//     var tv = this;
//     this.strictVersioning = strictVersioning;
// }

// TypeVersion.prototype.initialize = function(json) {
//     var tv = this;

//     this.isInitialized = true;
//     this.fieldMap = new HashMap < String, ValueField > ();
//     this.fieldList = new ArrayList < ValueField > ();
//     JSONArray fields = null;

//     name = Validator.fieldString("Name", typeVersion, validatorObject, true);
//     if (name != null) {
//         if (!Common.isValidShortTypeName(name)) {
//             validatorObject.getOrMakeInvalid().put("Name", new ValidatorError(18).error);
//         } else {
//             if (savingJSON != null) {
//                 savingJSON.put("Name", name);
//                 savingDetailedJSON.put("Name", name);
//             }
//         }
//     }

//     description = Validator.fieldString("Description", typeVersion, validatorObject, false);
//     if (description != null) {
//         if (description.length() == 0) {
//             description = null;
//         } else if (description.length() > 200) {
//             validatorObject.getOrMakeInvalid().put("Description", new ValidatorError(148).error);
//         } else {
//             if (savingJSON != null) {
//                 savingDetailedJSON.put("Description", description);
//             }
//         }
//     }

//     Long setRevision = Validator.fieldLong("Revision", typeVersion, validatorObject, false);
//     if (setRevision != null) {
//         revision = setRevision;
//     }

//     String fullNameField = Validator.fieldString("Full Name", typeVersion, validatorObject, true);
//     if (fullNameField != null) {

//         if (beingSavedUsername != null) {

//             if (Common.isValidTypeName(fullNameField)) {
//                 if (!Common.isValidTypeName(fullNameField, beingSavedUsername)) {
//                     validatorObject.getOrMakeInvalid().put("Full Name", new ValidatorError(47).error);
//                 }
//                 this.partialName = fullNameField;
//             } else if (Common.isValidTypeVersionName(fullNameField)) {
//                 String[] split = Common.splitTypeVersionName(fullNameField);
//                 if (!split[0].equals(beingSavedUsername)) {
//                     validatorObject.getOrMakeInvalid().put("Full Name", new ValidatorError(49).error);
//                 } else {
//                     this.partialName = split[0] + "." + split[1];
//                     this.fullVersionName = fullNameField;
//                     Integer specifiedVersion = Integer.parseInt(split[2]);
//                     Object currentVersion = CouchbasePool.getInstance().getCache().get(CouchbasePool.toKVTypeVersionNumKey(this.partialName));
//                     if (currentVersion == null && specifiedVersion != 1) {
//                         if (this.strictVersioning) {
//                             validatorObject.getOrMakeInvalid().put("Full Name", new ValidatorError(180).error);
//                         } else {
//                             validatorObject.getOrMakeInvalid().put("Full Name", new ValidatorError(61).error);
//                         }
//                     } else if (currentVersion != null) {
//                         Integer currentVersionInteger = Integer.parseInt((String) currentVersion);

//                         JSONObject currentVersionError = new JSONObject();
//                         currentVersionError.put("Current Version", currentVersionInteger);

//                         if (this.strictVersioning && currentVersionInteger != specifiedVersion - 1) {
//                             validatorObject.getOrMakeInvalid().put("Full Name", new ValidatorError(180, currentVersionError).error);
//                         } else if (currentVersionInteger < specifiedVersion - 1 || currentVersionInteger > specifiedVersion) {
//                             //Not current version or next version
//                             validatorObject.getOrMakeInvalid().put("Full Name", new ValidatorError(61, currentVersionError).error);
//                         }
//                     }
//                 }
//             } else {
//                 validatorObject.getOrMakeInvalid().put("Full Name", new ValidatorError(47).error);
//             }
//         } else {
//             String[] split = fullNameField.split("\\.");

//             if (split.length != 3) {
//                 ServerDaemon.error(new Exception());
//                 throw new ValidatorError(5);
//             }
//             this.fullVersionName = fullNameField;
//             this.partialName = split[0] + "." + split[1];
//         }

//         if (savingJSON != null) {
//             savingJSON.put("Full Name", this.fullVersionName);
//             savingDetailedJSON.put("Full Name", this.fullVersionName);
//         }

//     }

//     requiredTypes = Validator.fieldArray("Required Types", typeVersion, validatorObject, false);
//     if (requiredTypes != null) {

//         ValidatorObject requiredValidator = new ValidatorObject();
//         boolean hadError = false;
//         int requiredIndex = 0;
//         if (requiredTypes.length() > 0) {
//             ListIterator < Object > iterator = requiredTypes.listIterator();
//             while (iterator.hasNext()) {
//                 Object thisSplit = iterator.next();
//                 if (
//                     (thisSplit == null || thisSplit == JSONObject.NULL) || !(
//                         Common.isValidTypeVersionName((String) thisSplit) ||
//                         Common.isValidTypeName((String) thisSplit)
//                     )
//                 ) {
//                     requiredValidator.getOrMakeInvalid().put("" + requiredIndex, new ValidatorError(47).error);
//                 }
//                 requiredIndex++;
//             }
//         }

//         try {
//             Validator.finalErrorCheck(null, requiredValidator);
//         } catch (ValidatorError fe) {
//             hadError = true;
//             validatorObject.getOrMakeInvalid().put("Required Types", new ValidatorError(0, fe.error).error);
//         }

//         if (!hadError) {
//             if (savingJSON != null) {
//                 savingJSON.put("Required Types", requiredTypes);
//                 savingDetailedJSON.put("Required Types", requiredTypes);
//             }
//         }

//     } else {
//         if (savingJSON != null) {
//             savingJSON.put("Required Types", new JSONArray());
//             savingDetailedJSON.put("Required Types", new JSONArray());
//         }
//     }

//     fields = Validator.fieldArray("Fields", typeVersion, validatorObject, true);
//     if (fields != null) {
//         try {
//             if (fields.length() == 0) {
//                 throw new ValidatorError(89);
//             }

//             if (savingJSON != null) {
//                 savingDetailedFields = new JSONArray();
//                 savingDetailedJSON.put("Fields", savingDetailedFields);

//                 savingFields = new JSONArray();
//                 savingJSON.put("Fields", savingFields);
//             }
//             createFields(fields);

//             if (this.elasticFieldsMap != null) {
//                 this.createElasticFieldMap();
//             }

//         } catch (ValidatorError fe) {
//             validatorObject.getOrMakeInvalid().put("Fields", fe.error);
//         }
//     }

//     Validator.finalErrorCheck(typeVersion, validatorObject);
// }

// TypeVersion.prototype.createElasticFieldMap = function() {
//     var tv = this;

//     //Although this method isn't called by the initialize method unless elasticFieldsMap!=null, it can be called from elsewhere
//     if (this.elasticFieldsMap == null) {
//         this.elasticFieldsMap = new HashMap < String, Object > ();
//     }
//     for (ValueField field: this.fieldList) {
//         field.addToElasticMap(this.elasticFieldsMap);
//     }
// }

// TypeVersion.prototype.createFields = function(fields) {
//     var tv = this;

//     JSONObject erroneousFields = null;

//     int counter = 0;

//     HashMap < String, ValueField > allFields = new HashMap < String, ValueField > ();

//     ListIterator < Object > iter = fields.listIterator();
//     while (iter.hasNext()) {
//         Object thisObject = iter.next();
//         try {
//             if (thisObject instanceof JSONObject) {
//                 ValueField thisField = ValueField.createField(this, (JSONObject) thisObject, allFields, false);
//                 if (this.removeDeprecatedFields && thisField.deprecated) {
//                     //Don't add the field.
//                 } else {
//                     this.fieldMap.put(thisField.name, thisField);
//                     this.fieldList.add(thisField);
//                     if (this.savingJSON != null) {
//                         this.savingDetailedFields.put(thisField.detailedjson);
//                         this.savingFields.put(thisField.json);
//                     }
//                 }
//             } else {
//                 throw new ValidatorError(17); //THE FIELD ISN'T AN OBJECT
//             }
//         } catch (ValidatorError fe) {
//             if (erroneousFields == null) {
//                 erroneousFields = new JSONObject();
//             }
//             erroneousFields.put("" + counter, fe.error);
//         }
//         counter++;
//     }

//     if (erroneousFields != null) {
//         JSONObject invalidWrapper = new JSONObject();
//         invalidWrapper.put("Invalid", erroneousFields);
//         throw new ValidatorError(22, invalidWrapper);
//     }
// }

// TypeVersion.prototype.checkValidityOfSearchParameters = function(handler, parameters) {
//     var tv = this;

//     ValidatorObject vo = new ValidatorObject();

//     for (Entry < String, Object > searchParam: parameters.entries()) {
//         if (!fieldMap.containsKey(searchParam.getKey())) {
//             vo.getOrMakeUnrecognized().put(searchParam.getKey(), new ValidatorError(4).error);
//         } else { //Did recognize field

//         }
//     }

//     Validator.finalErrorCheck(parameters, vo);

// }

// TypeVersion.prototype.hasSortableFieldNamed = function(checkFieldName) {
//     var tv = this;

//     ListIterator < ValueField > iterator = this.fieldList.listIterator();
//     while (iterator.hasNext()) {
//         ValueField field = iterator.next();
//         if (field.name.equals(checkFieldName)) {
//             if (field.isArray != null && field.isArray) {
//                 throw new ValidatorError(130);
//             }
//             return true;
//         }
//     }
//     throw new ValidatorError(131);
// }

// TypeVersion.prototype.check_item = function(item, fields, toSave, allowDeprecated) {
//     var tv = this;

//     if (this.requiredTypes != null) {

//         ListIterator < Object > iterator = requiredTypes.listIterator();
//         while (iterator.hasNext()) {
//             Object requiredNameObj = iterator.next();

//             String requiredName = (String) requiredNameObj;

//             if (!item.typeVersionContents.containsKey(requiredName)) {

//                 boolean found = false;

//                 if (Common.isValidTypeName(requiredName)) {
//                     for (String keyName: item.typeVersionContents.keySet()) {
//                         if ((keyName.length() > requiredName.length()) && keyName.substring(0, requiredName.length()).equals(requiredName)) {
//                             found = true;
//                         }
//                     }
//                 }

//                 if (!found) {
//                     JSONObject jo = new JSONObject();
//                     jo.put("Required By", this.fullVersionName);
//                     item.getOrMakeMissing().put(requiredName, new ValidatorError(51, jo).error);
//                 }
//             }
//         }
//     }
//     ValidatorObject vo = new ValidatorObject();

//     for (ValueField field: this.fieldList) {

//         Object saving = field.checkFieldInFieldMap(item, toSave, fields, vo, allowDeprecated);

//         if (saving != null) {
//             toSave.put(field.name, saving);
//         }

//     }
//     Validator.finalErrorCheck(fields, vo);

// }