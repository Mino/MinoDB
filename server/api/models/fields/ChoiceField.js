var logger = require('tracer').console();
var Field = require('./Field');
var FieldVal = require('../../../../../FieldVal/fieldval-js/fieldval');
var bval = FieldVal.BasicVal;

require('../../../../extend')(ChoiceField, Field);

function ChoiceField(name, json, for_search, validator) {
    var field = this;

    ChoiceField.superConstructor.call(this, name, json, for_search, validator);
}

ChoiceField.prototype.init = function() {
    var field = this;

    field.choices = field.validator.get("choices", bval.array(true));

    return field.validator.end();
}

ChoiceField.prototype.validate = function(validator){
    var field = this;

    var operators = [];
    if(field.choices){
        operators.push(bval.one_of(field.choices,{stop_on_error:false}));
    }

    var value = validator.get(field.name, bval.required(true), operators);

    return value;
}

module.exports = ChoiceField;