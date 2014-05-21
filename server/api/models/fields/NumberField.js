var logger = require('tracer').console();
var Field = require('./Field');
var FieldVal = require('../../../../../FieldVal/fieldval-js/fieldval');
var bval = FieldVal.BasicVal;

require('../../../../extend')(NumberField, Field);

function NumberField(name, json, for_search, validator) {
    var field = this;

    NumberField.superConstructor.call(this, name, json, for_search, validator);
}

NumberField.prototype.init = function() {
    var field = this;

    field.minimum = field.validator.get("minimum", bval.number(false));
    if (field.minimum != null) {
        if (!field.for_search) {
            field.output.minimum = field.minimum;
        }
    }

    field.maximum = field.validator.get("maximum", bval.number(false));
    if (field.maximum != null) {
        if (!field.for_search) {
            field.output.maximum = field.maximum;
        }
    }

    field.integer = field.validator.get("integer", bval.boolean(false));

    return field.validator.end();
}

NumberField.prototype.validate = function(validator){
    var field = this;

    var operators = [];
    if(field.minimum){
        operators.push(bval.minimum(field.minimum,{stop_on_error:false}));
    }
    if(field.maximum){
        operators.push(bval.maximum(field.maximum,{stop_on_error:false}));
    }
    if(field.integer){
        operators.push(bval.integer(false,{stop_on_error:false}));
    }

    var value = validator.get(field.name, bval.number(field.required), operators);

    return value;
}

module.exports = NumberField;