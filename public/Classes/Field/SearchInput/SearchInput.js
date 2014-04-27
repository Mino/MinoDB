extend(SearchAttributeField, Field);
function SearchAttributeField(details, searchInput){
	var field = this;
	field.searchInput = searchInput;
	SearchAttributeField.superConstructor.call(this, details);
}

SearchAttributeField.prototype.getValue = function(){
	var field = this;
	var searchInput = field.searchInput;

	return searchInput.getValue(field.name);
}

SearchAttributeField.prototype.editing = function(){
	var field = this;
	return true;
}



function SearchInput(field,details){
	var searchInput = this;
	searchInput.field = field;
	searchInput.details = details;
	searchInput.element = $("<table />").addClass("searchTable").addClass("sectiontable");
	searchInput.fieldType = details.field['Field Type'];
	searchInput.fields = {};
	searchInput.createFields();
}

SearchInput.prototype.updateView = function(){	
	var searchInput = this;

	for(var i in searchInput.fields){
		var field = searchInput.fields[i];
		field.updateView();
	}
}

SearchInput.prototype.createFields = function(){
	var searchInput = this;

	var fieldType = searchInput.fieldType;
	var fieldDetailsArray = [];

	searchInput.fields = {};
	searchInput.element.empty();

	if(fieldType=="Text"){
		fieldDetailsArray.push({
			"Name" : "Query",
			"Field Type" : "Text",
			"Required" : false
		});
		fieldDetailsArray.push({
			"Name" : "Phrase",
			"Field Type" : "Text",
			"Required" : false
		});
		fieldDetailsArray.push({
			"Name" : "Prefix",
			"Field Type" : "Text",
			"Required" : false
		});
		fieldDetailsArray.push({
			"Name" : "Equal To",
			"Field Type" : "Text",
			"Required" : false
		});
		fieldDetailsArray.push({
			"Name" : "Case-Insensitive Prefix",
			"Field Type" : "Text",
			"Required" : false
		});
		fieldDetailsArray.push({
			"Name" : "Case-Insensitive Equal To",
			"Field Type" : "Text",
			"Required" : false
		});
	} else if(fieldType=="Counter"){
		fieldDetailsArray.push({
			"Name" : "Minimum",
			"Field Type" : "Number",
			"Required" : false
		});
		fieldDetailsArray.push({
			"Name" : "Equal To",
			"Field Type" : "Number",
			"Required" : false
		});
		fieldDetailsArray.push({
			"Name" : "Maximum",
			"Field Type" : "Number",
			"Required" : false
		});
	} else if(fieldType=="Date & Time"){
		fieldDetailsArray.push({
			"Name" : "Earliest",
			"Field Type" : "Date & Time",
			"Required" : false
		});
		fieldDetailsArray.push({
			"Name" : "Equal To",
			"Field Type" : "Date & Time",
			"Required" : false
		});
		fieldDetailsArray.push({
			"Name" : "Latest",
			"Field Type" : "Date & Time",
			"Required" : false
		});
	} else if(fieldType=="Date"){
		fieldDetailsArray.push({
			"Name" : "Earliest",
			"Field Type" : "Date",
			"Required" : false
		});
		fieldDetailsArray.push({
			"Name" : "Equal To",
			"Field Type" : "Date",
			"Required" : false
		});
		fieldDetailsArray.push({
			"Name" : "Latest",
			"Field Type" : "Date",
			"Required" : false
		});
	} else if(fieldType=="Email"){
		fieldDetailsArray.push({
			"Name" : "Prefix",
			"Field Type" : "Text",
			"Required" : false
		});
		fieldDetailsArray.push({
			"Name" : "Equal To",
			"Field Type" : "Text",
			"Required" : false
		});
		fieldDetailsArray.push({
			"Name" : "Domain",
			"Field Type" : "Text",
			"Required" : false
		});
	} else if(fieldType=="URL"){
		fieldDetailsArray.push({
			"Name" : "Prefix",
			"Field Type" : "Text",
			"Required" : false
		});
		fieldDetailsArray.push({
			"Name" : "Equal To",
			"Field Type" : "Text",
			"Required" : false
		});
	} else if(fieldType=="Choice"){
		fieldDetailsArray.push({
			"Name" : "Equal To",
			"Field Type" : "Choice",
			"Parameters" : {
				"Choices" : searchInput.details['Parameters']['Choices']
			},
			"Required" : false
		});
	} else if(fieldType=="Boolean"){
		fieldDetailsArray.push({
			"Name" : "Equal To",
			"Field Type" : "Boolean",
			"Required" : false
		});
	} else if(fieldType=="Number"){
		fieldDetailsArray.push({
			"Name" : "Minimum",
			"Field Type" : "Number",
			"Required" : false
		});
		fieldDetailsArray.push({
			"Name" : "Equal To",
			"Field Type" : "Number",
			"Required" : false
		});
		fieldDetailsArray.push({
			"Name" : "Maximum",
			"Field Type" : "Number",
			"Required" : false
		});
	} else if(fieldType=="Location"){
		fieldDetailsArray.push({
			"Name" : "Distance From",
			"Field Type" : "Location",
			"Required" : false,
			"Parameters" : {
				"Distance From" : true
			}
		});
	} else if(fieldType=="User"){
		fieldDetailsArray.push({
			"Name" : "Prefix",
			"Field Type" : "Text",
			"Required" : false
		});
		fieldDetailsArray.push({
			"Name" : "Equal To",
			"Field Type" : "Text",
			"Required" : false
		});
		fieldDetailsArray.push({
			"Name" : "Case-Insensitive Prefix",
			"Field Type" : "Text",
			"Required" : false
		});
		fieldDetailsArray.push({
			"Name" : "Case-Insensitive Equal To",
			"Field Type" : "Text",
			"Required" : false
		});
	} else if(fieldType=="Tree"){
		fieldDetailsArray.push({
			"Name" : "Contains",
			"Field Type" : "Text",
			"Required" : false
		});
	} else if(fieldType=="Link"){
		fieldDetailsArray.push({
			"Name" : "Child Of",
			"Field Type" : "Link",
			"Parameters" : {
				"Folders Allowed" : true,
				"Paths Allowed" : true,
				"IDs Allowed" : false,
				"Items Allowed" : false
			},
			"Required" : false
		});
		fieldDetailsArray.push({
			"Name" : "Prefix",
			"Field Type" : "Text",
			"Required" : false
		});
		fieldDetailsArray.push({
			"Name" : "Equal To",
			"Field Type" : "Text",
			"Required" : false
		});
		fieldDetailsArray.push({
			"Name" : "Case-Insensitive Prefix",
			"Field Type" : "Text",
			"Required" : false
		});
		fieldDetailsArray.push({
			"Name" : "Case-Insensitive Equal To",
			"Field Type" : "Text",
			"Required" : false
		});
	}

	for(var i in fieldDetailsArray){

		var fieldDetails = fieldDetailsArray[i];
		 
		 var field = new SearchAttributeField(
			fieldDetails,
			searchInput
		);

		searchInput.fields[fieldDetails['Name']] = field;

		field.appendTo(searchInput.element);
	}
}

SearchInput.prototype.editing = function(){
	var searchInput = this;
	return true;
}

SearchInput.prototype.getValue = function(name){
	var searchInput = this;
	var gotValue = searchInput.field.getValue();
	if(gotValue==null){
		return null;
	}
	return gotValue[name];
}



SearchInput.prototype.error = function(error){
	var searchInput = this;

	if(error['Invalid']!=undefined){
		var invalid = error['Invalid'];
		for(var i in invalid){
			var field = searchInput.fields[i];
			if(field!=null){
				field.error(invalid[i]);
			}
		}
	}

	if(error['Missing']!=undefined){
		var invalid = error['Missing'];
		for(var i in invalid){
			var field = searchInput.fields[i];
			if(field!=null){
				field.error(invalid[i]);
			}
		}
	}
}

SearchInput.prototype.hideErrors = function(){
	var searchInput = this;

	for(var i in searchInput.fields){
		var field = searchInput.fields[i];
		field.hideErrors();
	}
}

SearchInput.prototype.compile = function(){
	var searchInput = this;

	var compiledObject = {};
	for(var i in searchInput.fields){
		var field = searchInput.fields[i];
		var compiledField = field.compile();
		if(compiledField!=null){
			compiledObject[i] = compiledField;
		}
	}
	return compiledObject;
}