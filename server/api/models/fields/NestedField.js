var logger = require('tracer').console();
var Field = require('./Field');
var FieldVal = require('../../../../../FieldVal/fieldval-js/fieldval');
var bval = FieldVal.BasicVal;

require('../../../../extend')(NestedField, Field);

function NestedField(name, json, for_search, validator) {
    var field = this;

    logger.log(name);

    NestedField.superConstructor.call(this, name, json, for_search, validator);
}

NestedField.prototype.init = function() {
    var field = this;

    field.fields = {};

    var fields_json = field.validator.get("fields", bval.object(false));
    if (fields_json != null) {
        var fields_validator = new Validator(null);

        for (var name in fields_json) {
            var field_json = fields_json[name];

            var field_creation = Field.create_field(field, name, field_json, false);
            var err = field_creation[0];
            var nested_field = field_creation[1];

            if(err!=null){
                fields_validator.invalid(name,err);
            }

            field.fields[name] = nested_field;
        }

        var fields_error = fields_validator.end();
        if(fields_error!=null){
            field.validator.invalid("fields",fields_error);
        }
    }

    return field.validator.end();
}

NestedField.prototype.validate = function(validator){
    var field = this;

    var value = validator.get(field.name, bval.object(field.required));

    var inner_validator = new Validator(value);

    for(var name in field.fields){
        var nested_field = field.fields[name];

        nested_field.validate(inner_validator);
    }

    var inner_error = inner_validator.end();

    if(inner_error){
        validator.invalid(field.name, inner_error);
    }


    //Continue validating
}

module.exports = NestedField;