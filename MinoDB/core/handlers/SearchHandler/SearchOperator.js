var logger = require('tracer').console();
var errors = require('../../../../errors')
var Validator = require('fieldval');
var BasicVal = require('fieldval-basicval');

function SearchOperator(data, handler){
	var so = this;
}

SearchOperator.prototype.init = function(data, handler){
	var so = this;

	so.handler = handler;
	so.data = data;

	so.type_keys = {};

	var validator = new Validator(data);

	validator.get("name", bval.required(false), bval.multiple([
		bval.string(true)
	],[
		bval.number(true)
	],[
		bval.boolean(true)
	],[
		function(value, emit){
			
		}
	]));

	var $eq = validator.get("$eq", BasicVal.string(false));
	var $neq = validator.get("$neq", BasicVal.string(false));

	var $or = validator.get("$or", BasicVal.array(false));

	var unrecognized = so.validator.get_unrecognized();

	for(var i = 0; i < unrecognized.length; i++){
		var key = unrecognized[i];
		so.type_keys[key] = so.json[key];
	}

	var error = validator.end();

	return error;
}

module.exports = SearchOperator;