var Constants, Common, FieldVal, BasicVal, errors;
if (typeof require != 'undefined') {
    Constants = require('../Constants');
    Common = require('../Common');
    FieldVal = require('fieldval');
    BasicVal = require('fieldval-basicval');
    errors = require('../errors')
}

function ID() {
    var id = this;

}

//Returns error or null
ID.prototype.init = function(id_string) {
    var id = this;

    id.id_string = id_string;

    var error = FieldVal.use_checks(id_string, [
        BasicVal.integer(true, {parse: true}),
        BasicVal.minimum(1)
    ],null,null,function(new_value){
        //new_value is the integer value
        console.log(new_value);
    });

    return error;
}

ID.prototype.toString = function() {
    var id = this;
    return id.id_string;
}

if (typeof module != 'undefined') {
    module.exports = ID;
}