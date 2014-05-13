var logger = require('tracer').console();
var Field = require('./Field');
var FieldVal = require('../../../../FieldVal/fieldval-js/fieldval');
var bval = FieldVal.BasicVal;

require('../../../extend')(TextField, Field);

function TextField(json, for_search) {
    var field = this;

    // public Integer maxLength = null;
    // public Integer minLength = null;
    // public String phrase = null;
    // public String equalTo = null;
    // public String caseInsensitiveEqualTo = null;
    // public String prefix = null;
    // public String caseInsensitivePrefix = null;
    // public String query = null;

    TextField.superConstructor.call(this, json, for_search);
}

TextField.prototype.init = function() {
    var field = this;

    field.min_length = field.validator.get("min_length", bval.integer(false));
    if (field.min_length != null) {
        if (field.for_search) {
            fieldErrors.getOrMakeInvalid().put("min_length", new ValidatorError(57).error);
        } else {
            field.output.min_length = field.min_length;
            if (field.min_length < 1) {
                fieldErrors.getOrMakeInvalid().put("min_length", new ValidatorError(24).error);
            }
        }
    }

    field.max_length = field.validator.get("max_length", bval.integer(false));
    if (field.max_length != null) {

        if (field.for_search) {
            fieldErrors.getOrMakeInvalid().put("max_length", new ValidatorError(57).error);
        } else {
            field.output.max_length = field.max_length;
            if (field.max_length < 1) {
                fieldErrors.getOrMakeInvalid().put("max_length", new ValidatorError(24).error);
            }

        }
    }

    field.phrase = field.validator.get("phrase", bval.string(false));
    if (field.phrase != null) {
        if (!for_search) {
            fieldErrors.getOrMakeInvalid().put("phrase", new ValidatorError(65).error);
        }
    }

    field.equal_to = field.validator.get("equal_to", bval.string(false));
    if (field.equal_to != null) {
        if (!for_search) {
            fieldErrors.getOrMakeInvalid().put("equal_to", new ValidatorError(65).error);
        }
    }

    field.ci_equal_to = field.validator.get("ci_equal_to", bval.string(false));
    if (field.ci_equal_to != null) {
        if (!for_search) {
            fieldErrors.getOrMakeInvalid().put("ci_equal_to", new ValidatorError(65).error);
        }
    }

    field.prefix = field.validator.get("prefix", bval.string(false));
    if (field.prefix != null) {
        if (!for_search) {
            fieldErrors.getOrMakeInvalid().put("prefix", new ValidatorError(65).error);
        }
    }

    field.ci_prefix = field.validator.get("ci_prefix", bval.string(false));
    if (field.ci_prefix != null) {
        if (!for_search) {
            fieldErrors.getOrMakeInvalid().put("ci_prefix", new ValidatorError(65).error);
        }
    }

    field.query = field.validator.get("query", bval.string(false));
    if (field.query != null) {
        if (!for_search) {
            fieldErrors.getOrMakeInvalid().put("query", new ValidatorError(65).error);
        }
    }

    return field.validator.end();
}

TextField.prototype.validate = function(validator){
    var field = this;

    var value = validator.get(field.name, bval.string(field.required));

    //Continue validating
}

// public void addToQuery(BoolFilterBuilder bqb, String fieldPrefix, String fieldName, Condition condition) {
//     if (phrase != null && !phrase.equals("")) {
//         condition.cost += SearchRequestHandler.costPerFilter;
//         bqb.must(FilterBuilders.queryFilter(QueryBuilders.matchPhrasePrefixQuery(fieldPrefix + fieldName, phrase))); //Partial prefix (expands last word = autocomplete document search)
//     }
//     if (equalTo != null) {
//         condition.cost += SearchRequestHandler.costPerFilter;
//         bqb.must(FilterBuilders.queryFilter(QueryBuilders.termQuery(fieldPrefix + fieldName + ".untouched", equalTo))); //Exactly equal to (case sensitive)
//     }
//     if (caseInsensitiveEqualTo != null) {
//         condition.cost += SearchRequestHandler.costPerFilter;
//         bqb.must(FilterBuilders.queryFilter(QueryBuilders.termQuery(fieldPrefix + fieldName + ".lowercase", caseInsensitiveEqualTo.toLowerCase()))); //Exactly equal to (case sensitive)
//     }
//     if (prefix != null && prefix.length() > 0) {
//         condition.cost += SearchRequestHandler.costPerFilter;
//         bqb.must(FilterBuilders.prefixFilter(fieldPrefix + fieldName + ".untouched", prefix)); //Whole value prefix (autocomplete single value, same as "phrase", but more strict as starting position must be the start of the value)
//     }
//     if (caseInsensitivePrefix != null && caseInsensitivePrefix.length() > 0) {
//         condition.cost += SearchRequestHandler.costPerFilter;
//         bqb.must(FilterBuilders.prefixFilter(fieldPrefix + fieldName + ".lowercase", caseInsensitivePrefix.toLowerCase())); //Whole value prefix (autocomplete single value, same as "phrase", but more strict as starting position must be the start of the value)
//     }
//     if (query != null) {
//         condition.cost += SearchRequestHandler.costPerFilter;
//         bqb.must(FilterBuilders.queryFilter(QueryBuilders.matchQuery(fieldPrefix + fieldName, query).operator(Operator.AND))); //Word search
//     }
// }

// public void addToElasticMap(HashMap < String, Object > elasticFieldsMap) {
//     HashMap < String, Object > last = new HashMap < String, Object > ();
//     last.put("type", "multi_field");

//     HashMap < String, Object > fieldsMap = new HashMap < String, Object > ();

//     HashMap < String, Object > analyzedField = new HashMap < String, Object > ();
//     analyzedField.put("type", "string");
//     analyzedField.put("analyzer", "snowballanalyzed");

//     HashMap < String, Object > nonanalyzedField = new HashMap < String, Object > ();
//     nonanalyzedField.put("type", "string");
//     nonanalyzedField.put("index", "not_analyzed");

//     HashMap < String, Object > lowercasenonanalyzedField = new HashMap < String, Object > ();
//     lowercasenonanalyzedField.put("type", "string");
//     lowercasenonanalyzedField.put("analyzer", "lowercaseunanalyzed");

//     fieldsMap.put("lowercase", lowercasenonanalyzedField);
//     fieldsMap.put("untouched", nonanalyzedField);
//     fieldsMap.put(this.name, analyzedField);


//     last.put("fields", fieldsMap);

//     elasticFieldsMap.put(this.name, last);
// }

// /**
//  * Method parseIfPossible.
//  * @param value Object
//  * @return Object
//  */
// public Object parseIfPossible(Object value) {

//     if (value instanceof String) {
//         if (((String) value).length() == 0) {
//             return null;
//         }
//     }
//     return value;
// }


// public void checkValidity(Object value) throws ValidatorError {

//     if (!(value instanceof String)) {
//         JSONObject expectedError = new JSONObject();
//         expectedError.put("Expected", "String");
//         throw new ValidatorError(2, expectedError);
//     }

//     String string = (String) value;

//     try {
//         if (minLength != null && string.length() < minLength) {
//             throw new ValidatorError(30, new JSONObject("{'Minimum Length':" + minLength + "}"));
//         }

//         if (maxLength != null && string.length() > maxLength) {
//             throw new ValidatorError(31, new JSONObject("{'Maximum Length':" + maxLength + "}"));
//         }
//     } catch (JSONException je) {
//         ServerDaemon.error(je);
//     }

// };

// }

module.exports = TextField;