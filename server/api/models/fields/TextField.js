var logger = require('tracer').console();
var Field = require('./Field');
var FieldVal = require('../../../../../FieldVal/fieldval-js/fieldval');
var bval = FieldVal.BasicVal;

require('../../../../extend')(TextField, Field);

function TextField(name, json, for_search, validator) {
    var field = this;

    TextField.superConstructor.call(this, name, json, for_search, validator);
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

    var operators = [];
    if(field.min_length){
        operators.push(bval.min_length(field.min_length));
    }
    if(field.max_length){
        operators.push(bval.max_length(field.max_length));
    }

    var value = validator.get(field.name, bval.string(field.required), operators);

    logger.log(value);
    //Continue validating
}

module.exports = TextField;