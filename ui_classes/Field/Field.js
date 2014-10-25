var blurClass = 'blur';

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function isArray(obj) {
    return obj.constructor == Array;
}

function isEmptyObject(object){
	for(key in object){
		return false;
	}
	return true;
}

function compileErrorString(errorObject){
	var string = errorObject['Error'];
	for(key in errorObject){
		string = string.replace('__'+key+'__',errorObject[key]);
	}
	return string;
}

function Field(details){
	var field = this;
	
	field.editable = true;
	field.nested = false;
	field.standalone = false;
	field.hintText = "";
	field.required = true;
	field.array = false;
	field.search = false;
	field.htmlFormName = null;
	field.onChangeCallback = null;
	field.onFocusCallback = null;
	field.parameters = details['Parameters'];

	field.element = $("<div />").addClass("field");

	if(details['HTMLFormName']!=undefined){
		field.htmlFormName = details['HTMLFormName'];
	}
	if(details['Editable']==false){
		field.editable = false;
	}
	if(details['Nested']!=undefined){
		field.nested = details['Nested'];		
	}
	if(details['Standalone']!=undefined){
		field.standalone = details['Standalone'];		
	}
	if(details['Hint']!=undefined){
		field.hintText = details['Hint'];
	}
	if(details['Required']==false){
		field.required = false;
	}
	if(details['Array']==true){
		field.array = true;
	}
	if(field.parameters==undefined){
		field.parameters = {};
	}

	field.type = details['Field Type'];
	field.name = details['Name'];
	field.description = details['Description'];
	field.deprecated = details['Deprecated'];
	if(field.deprecated==null){
		field.deprecated = false;
	}

	field.valueField = $("<div />")
	.addClass("tablevaluefield")
	.addClass("minofield")
	.data("object",field);

	field.inputDetails ={
		'hintText' : field.hintText,
		'field' : details,
		'Parameters' : details['Parameters']
	};

	field.createElement();

	field.updateView();
}

Field.prototype.createElement = function(){
	var field = this;

	if(field.array){

		field.input = new ArrayField(field, field.inputDetails);
		field.input.element.appendTo(field.valueField);

		field.valueField.addClass("arrayValueField");

	} else if(	
 		field.type=="Text" || 
 		field.type=="Type" || 
 		field.type=="Number" || 
 		field.type=="URL" || 
 		field.type=="Email" || 
 		field.type=="User" || 
 		field.type=="Version" || 
 		field.type=="Date & Time" || 
 		field.type=="Date"
 	){
		//!FieldType: Generic Text
		field.input = new TextField(field, field.inputDetails);
		field.input.element.appendTo(field.valueField);


	} else if(	
 		field.type=="Password"
 	){
		//!FieldType: Password
		field.input = new PasswordField(field, field.inputDetails);
		field.input.element.appendTo(field.valueField);


	} else if(	
 		field.type=="Choice"
 	){
		//!FieldType: Choice
		field.input = new ChoiceField(field, field.inputDetails);
		field.input.element.appendTo(field.valueField);


	} else if(	
 		field.type=="Counter"
 	){
		//!FieldType: Counter
		field.input = new CounterField(field, field.inputDetails);
		field.input.element.appendTo(field.valueField);


	} else if(	
 		field.type=="Boolean"
 	){
		//!FieldType: Boolean
		field.input = new BooleanField(field, field.inputDetails);
		field.input.element.appendTo(field.valueField);


	} else if(	
		field.type=="ID"
 	){
		//!FieldType: ID
		field.input = new IDField(field, field.inputDetails);
		field.input.element.appendTo(field.valueField);



	} else if(	
		field.type=="Link"
 	){
		//!FieldType: LINK
		field.input = new LinkField(field, field.inputDetails);
		field.input.element.appendTo(field.valueField);



	} else if(	
		field.type=="Tree"
 	){
		//!FieldType: TREE
		field.input = new TreeField(field, field.inputDetails);
		field.input.element.appendTo(field.valueField);



	} else if(	
		field.type=="Location"
 	){
		//!FieldType: TREE
		field.input = new LocationField(field, field.inputDetails);
		field.input.element.appendTo(field.valueField);



	} else if(	
		field.type=="Parameters"
 	){
		//!FieldType: PARAMETERS
		field.input = new ParametersField(field, field.inputDetails);
		field.input.element.appendTo(field.valueField);

		field.valueField.addClass("nestedValueField");

	} else {
		alert("Unavailable field type requested: "+field.type);
	}

	
	var tooltipDiv = $("<div />")
	.append(
		$("<span />")
		.addClass("bold")
		.text(field.type)
	)
	
	if(field.description!=undefined){
		tooltipDiv.append(
			$("<p />")
			.text(field.description)
			.css("width","200px")
			.css("word-wrap","break-word")
		)
	}
	
	if(field.parameters!=undefined && !isEmptyObject(field.parameters)){
		
		for(paramInd in field.parameters){

			var paramVal = field.parameters[paramInd];
			if( Object.prototype.toString.call( paramVal ) === '[object Array]' ) {
				var list = "";
				for(i in paramVal){
					if(list!=""){
						list+=", ";
					}
					list += paramVal[i];
				}
				paramVal = list;
			}

			tooltipDiv.append(
				$("<p>")
				.append(
					$("<span />")
					.addClass("bold")
					.html("-"+ paramInd + " : <br />")
				).append(
					$("<span />")
					.text(paramVal)
				)
			)
		}
	}
	
	if(!field.nested && !field.standalone){
		
		field.titleRow = $("<div />")
		.addClass("titleRow")
		.appendTo(field.element);

		field.titleRow.append(
			field.nameTD = $("<div />")
			.addClass("name")
			.append(
				field.titleFieldDiv = $("<div />")
				.addClass("tabletitlefield")
				.append(
					field.titleText = $("<div />")
					.append(
						$("<span />")
						.addClass("fieldName")
						.text(field.name)	
					)
				)
			)
		);

		field.titleText
		.append(
			field.fieldRequiredSpan = $("<span />")
			.addClass("fieldRequiredSpan")
		)
		
		if(field.required){
			field.fieldRequiredSpan.text("*");
		}

		if(field.deprecated){
			var deprecatedDiv = $("<div />")
			.append(
				$("<span />")
				.addClass("bold")
				.text("Deprecated ")
			)
			.append(
				$("<div />").text("This field has been removed from the type.")
			)

			field.titleText
			.append(
				field.deprecatedLabel = $("<span />").addClass("deprecatedLabel").text("[Deprecated]")
			);

			var deprecatedTooltip = new Tooltip(deprecatedDiv,field.deprecatedLabel);
		}

		var tooltip = new Tooltip(tooltipDiv);
		
		field.titleText
		.append(
			tooltip.element
		)
	}

	field.inputRow = $("<div />")
	.addClass("inputRow")
	.appendTo(field.element);

	if(!field.standalone){
		field.inputRow.addClass("separatedNameValueRow")
	}

	field.inputRow.append(
		field.valueTD = $("<div />").append(field.valueField)
	)
	
	field.errorElement = $("<div />")
	.addClass("errorRow")
	.append(
		$("<div />")
		.append(
			field.errorTextDiv = $("<div />")
		)
	)
	.appendTo(field.element)
	.hide()
	
	if(field.nested){
		field.nameTD = field.valueTD;//Allows the same editing procedure to be used in .error()
		field.inputRow.append(
			field.valueTD = $("<div />")
			.addClass("deleteRowButtonHolder")
			.append(
				field.removeButton = $("<button />")
				.addClass("mino_button")
				.addClass("redmino_button")
				.addClass("deleteRowButton")
				.text("×").on('tap',function(){
					console.log(field.parent);
					field.parent.removeNested(field);
				})
				.hide()
			)
		);
	}

	if(field.standalone){
		field.nameTD = field.valueTD;//Allows the same editing procedure to be used in .error()
	}

}

Field.prototype.appendTo = function(element){
	var field = this;
	field.element.appendTo(element);
}

Field.prototype.show = function(){
	var field = this;
	field.element.show();
	if(field.inputRow.hasClass("error")){
		field.errorElement.show();
	}
}

Field.prototype.hide = function(){
	var field = this;
	field.element.hide();
}

Field.prototype.onFocus = function(){

}

Field.prototype.onChange = function(){

}

Field.prototype.editing = function(){
	var field = this;
	return field.editable;
}
	
Field.prototype.updateView = function(){
	var field = this;
	if(field.nested){
		if(field.editing()){
			field.removeButton.show();
		} else {
			field.removeButton.hide();
		}
	}
	field.input.updateView();
}

Field.prototype.compile = function(){
	var field = this;
	return field.input.compile();
}

Field.prototype.hideErrors = function(error){
	var field = this;

	field.element.removeClass("error");
	field.errorElement.hide();

	if(field.type=="Parameters" || field.type=="Location" || field.array){
		field.input.hideErrors();
	}
}

Field.prototype.error = function(error){
	var field = this;

	field.element.addClass("error");
	field.errorElement.show();
	field.errorTextDiv.text(compileErrorString(error));

	if(field.type=="Parameters" || field.type=="Location" || field.array){
		field.input.error(error);
	}
}

Field.prototype.removeElement = function(){
	var field = this;

	field.element.remove();
}

Field.prototype.customErrorFunction = function(){
	var field = this;

}

Field.prototype.getValue = function(){
	return null;
}

Field.prototype.setValue = function(val){
	var field = this;

	var oldGet = field.getValue;

	field.getValue = function(){
		return val;
	}
	field.updateView();

	field.getValue = oldGet;
}






extend(ItemField, Field);
function ItemField(details, fieldSection){
	var field = this;
	field.fieldSection = fieldSection;
	ItemField.superConstructor.call(this, details);
}

ItemField.prototype.getValue = function(){
	var field = this;
	var fieldSection = field.fieldSection;

	return fieldSection.getValue(field.name);
}

ItemField.prototype.editing = function(){
	var field = this;
	var fieldSection = field.fieldSection;
	if(field.editable){
		return fieldSection.itemView.editing;
	} 
	return false;
}


extend(BaseItemField, Field);
function BaseItemField(details, itemView){
	var field = this;
	field.itemView = itemView;
	BaseItemField.superConstructor.call(this, details);
}

BaseItemField.prototype.getValue = function(){
	var field = this;
	var itemView = field.itemView;

	return itemView.object[field.name];
}

BaseItemField.prototype.editing = function(){
	var field = this;
	var itemView = field.itemView;
	if(field.editable){
		return itemView.editing;
	} 
	return false;
}

