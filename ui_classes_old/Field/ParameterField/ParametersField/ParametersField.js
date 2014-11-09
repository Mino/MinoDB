function ParametersField(field,details){
	var parameters = this;
	parameters.field = field;
	parameters.element = $("<div />").addClass("sectiontable");
	parameters.fieldType = "";
	parameters.fields = {};
}

ParametersField.prototype.updateView = function(){	
	var parameters = this;

	var currentFieldType = parameters.field.editor.attributeFields['Field Type'].compile();

	if(parameters.fieldType!=currentFieldType){
		parameters.fieldType = currentFieldType;
		parameters.createFields();
	}

	for(var i in parameters.fields){
		var field = parameters.fields[i];
		field.updateView();
	}
}

ParametersField.prototype.createFields = function(){
	var parameters = this;

	var fieldType = parameters.fieldType;
	var fieldDetailsArray = [];

	parameters.fields = {};
	parameters.element.empty();

	if(fieldType=="Text"){
		fieldDetailsArray.push({
			"Name" : "Minimum Length",
			"Field Type" : "Number",
			"Description" : "The minimum number of characters the value must consist of.",
			"Required" : false
		});
		fieldDetailsArray.push({
			"Name" : "Maximum Length",
			"Field Type" : "Number",
			"Description" : "The maximum number of characters the value must consist of.",
			"Required" : false
		});
	} else if(fieldType=="URL"){
		fieldDetailsArray.push({
			"Name" : "Prefix",
			"Field Type" : "Text",
			"Description" : "A URL that the value must start with. A prefix of \"http://example.com/\" would only allow values such as \"http://example.com/people/john\".",
			"Required" : false
		});
	} else if(fieldType=="Number"){
		fieldDetailsArray.push({
			"Name" : "Minimum",
			"Field Type" : "Number",
			"Description" : "The minimum (inclusive) value.",
			"Required" : false
		});
		fieldDetailsArray.push({
			"Name" : "Maximum",
			"Field Type" : "Number",
			"Description" : "The maximum (inclusive) value.",
			"Required" : false
		});
		fieldDetailsArray.push({
			"Name" : "Integer",
			"Field Type" : "Boolean",
			"Description" : "Whether or not the value must be an integer (whole number).",
			"Required" : false
		});
	} else if(fieldType=="Choice"){
		fieldDetailsArray.push({
			"Name" : "Choices",
			"Field Type" : "Text",
			"Description" : "The choices that are available for selection.",
			"Array" : true,
			"Required" : false
		});
	} else if(fieldType=="Boolean"){

	} else if(fieldType=="User"){

	} else if(fieldType=="Tree"){

	} else if(fieldType=="Email"){
		fieldDetailsArray.push({
			"Name" : "Domain",
			"Field Type" : "Text",
			"Description" : "The domain that the email address must use.",
			"Required" : false
		});
	} else if(fieldType=="Date"){
		fieldDetailsArray.push({
			"Name" : "Earliest",
			"Field Type" : "Date",
			"Description" : "The earliest (inclusive) date in the format YYYY-MM-DD.",
			"Required" : false
		});
		fieldDetailsArray.push({
			"Name" : "Latest",
			"Field Type" : "Date",
			"Description" : "The latest (inclusive) date in the format YYYY-MM-DD.",
			"Required" : false
		});
	} else if(fieldType=="Date & Time"){
		fieldDetailsArray.push({
			"Name" : "Earliest",
			"Field Type" : "Date & Time",
			"Description" : "The earliest (inclusive) date & time in the format YYYY-MM-DD HH:MM:SS.",
			"Required" : false
		});
		fieldDetailsArray.push({
			"Name" : "Latest",
			"Field Type" : "Date & Time",
			"Description" : "The latest (inclusive) date & time in the format YYYY-MM-DD HH:MM:SS.",
			"Required" : false
		});
	} else if(fieldType=="Link"){
		fieldDetailsArray.push({
			"Name" : "IDs Allowed",
			"Field Type" : "Boolean",
			"Description" : "Whether or not ID values can be used.",
			"Required" : false
		});
		fieldDetailsArray.push({
			"Name" : "Paths Allowed",
			"Field Type" : "Boolean",
			"Description" : "Whether or not Path values can be used.",
			"Required" : false
		});
		fieldDetailsArray.push({
			"Name" : "Items Allowed",
			"Field Type" : "Boolean",
			"Description" : "Whether or not Item Paths can be used.",
			"Required" : false
		});
		fieldDetailsArray.push({
			"Name" : "Folders Allowed",
			"Field Type" : "Boolean",
			"Description" : "Whether or not Folder Paths can be used.",
			"Required" : false
		});
		fieldDetailsArray.push({
			"Name" : "Recommended Types",
			"Field Type" : "Text",
			"Array" : true,
			"Description" : "(Not yet implemented). Types (USERNAME.TYPENAME) or Type Versions (USERNAME.TYPENAME.VERSION) that should be present in the selected Item.",
			"Required" : false
		});
		fieldDetailsArray.push({
			"Name" : "Child Of",
			"Field Type" : "Link",
			"Description" : "The Folder that any Path that is used must be within.",
			"Required" : false,
			"Parameters" : {
				"IDs Allowed" : false,
				"Paths Allowed" : true,
				"Items Allowed" : false,
				"Folders Allowed" : true
			}
		});
	}

	for(var i in fieldDetailsArray){

		var fieldDetails = fieldDetailsArray[i];

		console.log(parameters);
		 
		var field = new ParameterField(
			fieldDetails,
			parameters
		);

		parameters.fields[fieldDetails['Name']] = field;

		field.appendTo(parameters.element);
	}
}

ParametersField.prototype.editing = function(){
	var parameters = this;
	return parameters.field.editor.editing();
}

ParametersField.prototype.getValue = function(name){
	var parameters = this;
	var paramVal = parameters.field.getValue();
	if(paramVal!=null){
		return parameters.field.getValue()[name];
	}
	return null;
}



ParametersField.prototype.error = function(error){
	var parameters = this;

	if(error['Invalid']!=undefined){
		var invalid = error['Invalid'];
		for(var i in invalid){
			var field = parameters.fields[i];
			if(field!=null){
				field.error(invalid[i]);
			}
		}
	}

	if(error['Missing']!=undefined){
		var invalid = error['Missing'];
		for(var i in invalid){
			var field = parameters.fields[i];
			if(field!=null){
				field.error(invalid[i]);
			}
		}
	}
}

ParametersField.prototype.hideErrors = function(){
	var parameters = this;

	for(var i in parameters.fields){
		var field = parameters.fields[i];
		field.hideErrors();
	}
}

ParametersField.prototype.compile = function(){
	var parameters = this;

	var compiledObject = {};
	for(var i in parameters.fields){
		var field = parameters.fields[i];
		var compiledField = field.compile();
		if(compiledField!=null){
			compiledObject[i] = compiledField;
		}
	}
	return compiledObject;
}