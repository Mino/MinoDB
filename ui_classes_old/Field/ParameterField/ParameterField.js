extend(ParameterField, Field);
function ParameterField(details, parent){
	var field = this;
	field.parent = parent;
	ParameterField.superConstructor.call(this, details);
}

ParameterField.prototype.getValue = function(){
	var field = this;
	var parent = field.parent;
	return parent.getValue(field.name);
}

ParameterField.prototype.editing = function(){
	var field = this;
	var parent = field.parent;
	if(field.editable){
		return parent.editing();
	} 
	return false;
}
