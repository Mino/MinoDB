extend(NestedField, Field);
function NestedField(details, parent){
	var field = this;
	field.parent = parent;
	NestedField.superConstructor.call(this, details);
}

NestedField.prototype.getValue = function(){
	var field = this;
	var parent = field.parent;
	var fieldIndex = parent.fields.indexOf(field);
	var parentArrayValue = parent.getValue();
	if(parentArrayValue!=null){
		return parentArrayValue[fieldIndex];
	}
	return null;
}

NestedField.prototype.editing = function(){
	var field = this;
	var parent = field.parent;

	if(field.editable){
		return parent.editing();
	} 
	return false;
}




function ArrayField(field,details){
	var arrayField = this;
	arrayField.field = field;
	arrayField.details = details;

	arrayField.nestedFieldDetails = JSON.parse(JSON.stringify(arrayField.details.field));
	arrayField.nestedFieldDetails['Array'] = false;
	arrayField.nestedFieldDetails['Nested'] = true;
	
	arrayField.element = $("<div />");

	arrayField.table = $("<div />")
	.addClass("sectiontable")
	.appendTo(arrayField.element);

	arrayField.addButton = $("<button />").addClass("mino_button").text("Add")
	.on('tap',function(){
		arrayField.createField();
	})
	.appendTo(arrayField.element);

	arrayField.fields = [];

	arrayField.createFields();
}

ArrayField.prototype.updateView = function(){	
	var arrayField = this;

	if(arrayField.editing()){
		arrayField.addButton.show();
	} else {
		arrayField.addButton.hide();
	}


	var currentValue = arrayField.getValue();

	if(currentValue!=null){
		var new_fields_array = [];

		for(var i=0; i<currentValue.length; i++){
			var field = arrayField.fields[i];
			if(field==null){
				field = arrayField.createField();
			}
			field.updateView();
			new_fields_array.push(field);
		}

		if(currentValue.length<arrayField.fields.length){
			for(var i=currentValue.length; i<arrayField.fields.length; i++){
				var field = arrayField.fields[i];
				field.removeElement();
			}
		}

		arrayField.fields = new_fields_array;
	}

}

ArrayField.prototype.createFields = function(){
	var arrayField = this;

	var fieldType = arrayField.fieldType;
	var fieldDetailsArray = arrayField.getValue();

	arrayField.fields = [];
	arrayField.table.empty();

	for(var i in fieldDetailsArray){
		 arrayField.createField();
	}
}

ArrayField.prototype.createField = function(){
	var arrayField = this;

	var field = new NestedField(
		arrayField.nestedFieldDetails,
		arrayField
	);

	arrayField.fields.push(field);

	field.appendTo(arrayField.table);

	return field;
}

ArrayField.prototype.getValue = function(field){
	var arrayField = this;
	return arrayField.field.getValue();
}

ArrayField.prototype.editing = function(){
	var arrayField = this;
	return arrayField.field.editing();
}

ArrayField.prototype.removeNested = function(field){
	var arrayField = this;

	var fieldIndex = arrayField.fields.indexOf(field);
	arrayField.fields.splice(fieldIndex, 1);

	field.removeElement();
}



ArrayField.prototype.error = function(error){
	var arrayField = this;

	if(error['Invalid']!=undefined){
		var invalid = error['Invalid'];
		for(var i in invalid){
			var field = arrayField.fields[i];
			if(field!=null){
				field.error(invalid[i]);
			}
		}
	}

	if(error['Missing']!=undefined){
		var invalid = error['Missing'];
		for(var i in invalid){
			var field = arrayField.fields[i];
			if(field!=null){
				field.error(invalid[i]);
			}
		}
	}
}

ArrayField.prototype.hideErrors = function(){
	var arrayField = this;

	for(var i in arrayField.fields){
		var field = arrayField.fields[i];
		field.hideErrors();
	}
}

ArrayField.prototype.compile = function(){
	var arrayField = this;

	var compiledObject = [];
	for(var i in arrayField.fields){
		var field = arrayField.fields[i];
		var compiledField = field.compile();
		compiledObject.push(compiledField);
	}
	return compiledObject;
}