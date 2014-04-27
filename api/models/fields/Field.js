var logger = require('tracer').console();

var have_subclasses = false;
var TextField;

// public TypeVersion parentType;
// public String name;
// public String description;
// public boolean required;
// public boolean deprecated;
// public boolean isSearchParam;
// public String fieldTypeName;
// public Boolean isArray = false; //By default
// public Integer minimumArraySize;
// public Integer maximumArraySize;
// public int existsFilter = 0; //1 = Enforce existance. 2 = Force abscence
// public JSONObject json;
// public JSONObject detailedjson;
// protected ValidatorObject fieldErrors = new ValidatorObject();

var FieldVal = require('../../../../FieldVal/fieldval-js/lib/fieldval');

function Field(json, for_search) {
    var field = this;

    if (!for_search) {
        //The object that this field will create
        field.output = {};
    }

    field.json = json;
    field.for_search = for_search;
    field.validator = new Validator(json);

    field.name = field.validator.get("name", "string", true);
    field.display_name = field.validator.get("display_name", "string", true);
    field.type = field.validator.get("type", "string", true);
    field.required = field.validator.get("required", "boolean", false) || false;

    if (json != null) {
        var exists = field.validator.get("exists", "boolean", false);
        if (exists != null) {
            existsFilter = exists ? 1 : 2;
        }
    }
}

Field.get_subclasses = function() {
    TextField = require('./TextField');
}

Field.prototype.addToQuery = function(filter_builder, field_prefix, field_name, condition) {

}

Field.prototype.doExistanceCheck = function(filter_builder, field_prefix, field_name, condition) {
    //If existsFilter == 0 then do nothing
    if (this.existsFilter == 1) {
        bqb.must(FilterBuilders.existsFilter(fieldPrefix + fieldName));
    } else if (this.existsFilter == 2) {
        bqb.mustNot(FilterBuilders.existsFilter(fieldPrefix + fieldName));
    }
}

Field.prototype.addToElasticMap = function(elasticFieldsMap) {

}

Field.create_field = function(parent_type, json, for_search) {

    if (!have_subclasses) {
        Field.get_subclasses();
    }

    var field = null;

    if (json.type === "Boolean") {
        field = new BooleanField(json, for_search)
    } else if (json.type === "Choice") {
        field = new ChoiceField(json, for_search)
    } else if (json.type === "Counter") {
        field = new CounterField(json, for_search)
    } else if (json.type === "Date") {
        field = new DateField(json, for_search)
    } else if (json.type === "Date & Time") {
        field = new DateTimeField(json, for_search)
    } else if (json.type === "Email") {
        field = new EmailField(json, for_search)
    } else if (json.type === "Link") {
        field = new LinkField(json, for_search)
    } else if (json.type === "Location") {
        field = new LocationField(json, for_search)
    } else if (json.type === "Number") {
        field = new NumberField(json, for_search)
    } else if (json.type === "Tree") {
        field = new TreeField(json, for_search)
    } else if (json.type === "Text") {
        field = new TextField(json, for_search)
    } else if (json.type === "URL") {
        field = new URLField(json, for_search)
    } else if (json.type === "User") {
        field = new UserField(json, for_search)
    } else if (json.type === "Type") {
        field = new TypeField(json, for_search)
    } else {
        //Create a generic field to create the correct errors for the generic fields
        var field = new Field(json, for_search);
        field.validator.invalid("type", {
            "error": -1
        });

        return [field.validator.end(), null];
    }

    var init_res = field.init();
    if (init_res != null) {
        return [init_res, null];
    }

    return [null, field];

    // boolean isSaving = parentType.savingJSON != null;

    // String fieldType = Validator.fieldString("Field Type", fieldJSON, fieldErrors, true);
    // JSONObject parameters = Validator.fieldObject("Parameters", fieldJSON, fieldErrors, false);
    // if (fieldType != null) {

    //     if (parameters == null) {
    //         parameters = new JSONObject();
    //     }

    //     String rawParameters = null;

    //     if (isSaving) {
    //         rawParameters = parameters.toString();
    //     }

    //     try {
    //         createdField = Field.instantiateField(fieldType, parameters, for_search);
    //         if (createdField == null) {
    //             isSaving = false;
    //             fieldErrors.getOrMakeInvalid().put("Field Type", new ValidatorError(20).error);
    //         } else {
    //             if (isSaving) {
    //                 createdField.json = new JSONObject();
    //                 createdField.detailedjson = new JSONObject();
    //                 createdField.json.put("Field Type", fieldType);
    //                 createdField.detailedjson.put("Field Type", fieldType);

    //                 createdField.json.put("Parameters", new RawJSON(rawParameters));
    //                 createdField.detailedjson.put("Parameters", new RawJSON(rawParameters));
    //             }

    //             createdField.parentType = parentType;
    //         }
    //     } catch (ValidatorError fe) {
    //         fieldErrors.getOrMakeInvalid().put("Parameters", fe.error);
    //         isSaving = false;
    //     }

    // } else {
    //     fieldErrors.getOrMakeInvalid().put("Parameters", new ValidatorError(21).error);
    //     isSaving = false;
    // }

    // boolean fieldRequired = true;
    // Boolean fieldRequiredObject = Validator.fieldBoolean("Required", fieldJSON, fieldErrors, true);
    // if (fieldRequiredObject != null) {
    //     if (isSaving) {
    //         createdField.json.put("Required", fieldRequiredObject);
    //         createdField.detailedjson.put("Required", fieldRequiredObject);
    //     }
    //     fieldRequired = fieldRequiredObject.booleanValue();
    // }

    // boolean fieldDeprecated = false;
    // Boolean deprecatedObject = Validator.fieldBoolean("Deprecated", fieldJSON, fieldErrors, false);
    // if (deprecatedObject != null) {
    //     fieldDeprecated = deprecatedObject.booleanValue();
    // }

    // String fieldName = Validator.fieldString("Name", fieldJSON, fieldErrors, true);
    // if (fieldName != null) {
    //     if (!Common.isValidFieldName(fieldName)) {
    //         fieldErrors.getOrMakeInvalid().put("Name", new ValidatorError(55).error);
    //     } else {
    //         if (existingFields.containsKey(fieldName)) {
    //             fieldErrors.getOrMakeInvalid().put("Name", new ValidatorError(56).error);
    //         } else {
    //             existingFields.put(fieldName, createdField);

    //             if (isSaving) {
    //                 createdField.json.put("Name", fieldName);
    //                 createdField.detailedjson.put("Name", fieldName);
    //             }
    //         }
    //     }
    // }

    // String fieldDescription = Validator.fieldString("Description", fieldJSON, fieldErrors, false);
    // if (fieldDescription != null) {
    //     if (fieldDescription.length() == 0) {
    //         fieldDescription = null;
    //     } else if (fieldDescription.length() > 200) {
    //         fieldErrors.getOrMakeInvalid().put("Description", new ValidatorError(148).error);
    //     } else {
    //         if (isSaving) {
    //             createdField.detailedjson.put("Description", fieldDescription);
    //         }
    //     }
    // }

    // Boolean getIsArray = Validator.fieldBoolean("Array", fieldJSON, fieldErrors, false);
    // if (getIsArray != null && getIsArray.booleanValue()) {
    //     if (isSaving) {
    //         createdField.json.put("Array", getIsArray);
    //         createdField.detailedjson.put("Array", getIsArray);
    //     }
    // }

    // if (getIsArray != null && getIsArray.booleanValue() && createdField != null && (createdField instanceof CounterField)) {
    //     fieldErrors.getOrMakeInvalid().put("Array", new ValidatorError(110).error);
    // }

    // if (!(fieldRequired) && (createdField instanceof CounterField)) {
    //     fieldErrors.getOrMakeInvalid().put("Required", new ValidatorError(111).error);
    // }


    // Integer getMinimumArraySize = Validator.fieldInteger("Minimum Array Size", fieldJSON, fieldErrors, false);
    // if (getMinimumArraySize != null) {
    //     if (getIsArray == null || !(getIsArray.booleanValue())) {
    //         fieldErrors.getOrMakeInvalid().put("Minimum Array Size", new ValidatorError(68).error);
    //     } else {
    //         if (getMinimumArraySize < 0 || getMinimumArraySize > 1000) {
    //             fieldErrors.getOrMakeInvalid().put("Minimum Array Size", new ValidatorError(69).error);
    //         } else if (isSaving) {
    //             createdField.json.put("Minimum Array Size", getMinimumArraySize);
    //             createdField.detailedjson.put("Minimum Array Size", getMinimumArraySize);
    //         }
    //     }
    // }

    // Integer getMaximumArraySize = Validator.fieldInteger("Maximum Array Size", fieldJSON, fieldErrors, false);
    // if (getMaximumArraySize != null) {
    //     if (getIsArray == null || !(getIsArray.booleanValue())) {
    //         fieldErrors.getOrMakeInvalid().put("Maximum Array Size", new ValidatorError(68).error);
    //     } else {
    //         if (getMaximumArraySize > 1000 || getMaximumArraySize < 0 || (getMinimumArraySize != null && getMinimumArraySize > getMaximumArraySize)) {
    //             fieldErrors.getOrMakeInvalid().put("Minimum Array Size", new ValidatorError(69).error);
    //         } else if (isSaving) {
    //             createdField.json.put("Maximum Array Size", getMaximumArraySize);
    //             createdField.detailedjson.put("Maximum Array Size", getMaximumArraySize);
    //         }
    //     }
    // }

    // if (getMaximumArraySize == null) {
    //     getMaximumArraySize = 1000;
    // }

    // Validator.finalErrorCheck(fieldJSON, fieldErrors);

    // if (createdField != null) {
    //     createdField.name = fieldName;
    //     createdField.fieldTypeName = fieldType;
    //     createdField.required = fieldRequired;
    //     createdField.deprecated = fieldDeprecated;
    //     createdField.isArray = (getIsArray != null ? getIsArray : false);
    //     createdField.minimumArraySize = getMinimumArraySize;
    //     createdField.maximumArraySize = getMaximumArraySize;
    // }

    // return createdField;

}

// Field.prototype.setDeprecated = function(boolean deprecated) {
//     this.deprecated = deprecated;
//     this.json.put("Deprecated", deprecated);
//     this.detailedjson.put("Deprecated", deprecated);
// }


// public Object parseIfPossible = function(Object value) {
//     return value;
// }

// public Object checkFieldInFieldMap = function(SaveObject item, JSONObject savingFields, JSONObject fields, ValidatorInterface vi, boolean allowDeprecated) {

//     if (this.isArray != null && this.isArray.booleanValue()) {

//         JSONArray itemArray = Validator.fieldArray(this.name, fields, vi, this.required);

//         if (itemArray != null) {

//             if (!allowDeprecated && this.deprecated) {
//                 //Don't allow saving of fields that are deprecated
//                 vi.getOrMakeInvalid().put(this.name, new ValidatorError(183).error);

//             } else {

//                 try {
//                     if (this.minimumArraySize != null && itemArray.length() < this.minimumArraySize) {
//                         vi.getOrMakeInvalid().put(this.name, new ValidatorError(70, new JSONObject("{'Minimum Array Size':" + minimumArraySize + "}")).error);
//                     } else if (itemArray.length() > this.maximumArraySize) {
//                         vi.getOrMakeInvalid().put(this.name, new ValidatorError(71, new JSONObject("{'Maximum Array Size':" + maximumArraySize + "}")).error);
//                     } else {

//                         JSONObject invalidMap = new JSONObject();

//                         int index = 0;

//                         ListIterator < Object > li = itemArray.listIterator();

//                         while (li.hasNext()) {
//                             try {
//                                 Object obj = li.next();
//                                 Object parsed = parseIfPossible(obj);
//                                 checkValidity(parsed);
//                                 if (parsed != obj) {
//                                     li.set(parsed);
//                                 }
//                             } catch (ValidatorError fe) {
//                                 invalidMap.put("" + index, fe.error);
//                             }
//                             index++;
//                         }

//                         if (invalidMap.length() != 0) {
//                             JSONObject invalidWrapper = new JSONObject();
//                             invalidWrapper.put("Invalid", invalidMap);
//                             vi.getOrMakeInvalid().put(this.name, new ValidatorError(0, invalidWrapper).error);
//                         }

//                         return itemArray;

//                     }
//                 } catch (JSONException je) {
//                     ServerDaemon.error(je);
//                 }
//             }

//         }

//         return null;

//     } else {
//         return checkSingleFieldinFieldMap(item, savingFields, fields, vi, allowDeprecated);
//     }
// }

// Field.prototype.checkSingleFieldinFieldMap = function(fo, savingFields, fields, vi, allowDeprecated) {
//     Object param = Validator.fieldValue(this.name, fields, vi, this.required);
//     if (param != null) {
//         if (!allowDeprecated && this.deprecated) {
//             //Don't allow saving of fields that are deprecated
//             vi.getOrMakeInvalid().put(this.name, new ValidatorError(183).error);

//         } else {
//             try {
//                 param = parseIfPossible(param);
//                 if (param == null && required) {
//                     vi.getOrMakeInvalid().put(this.name, new ValidatorError(3).error);
//                 }
//                 checkValidity(param);
//                 return param;
//             } catch (ValidatorError fe) {
//                 vi.getOrMakeInvalid().put(this.name, fe.error);
//             }
//         }
//     }
//     return null;
// }

// Field.prototype.checkValidity = function(value) {

// }

module.exports = Field;