function ChoiceField(field,details){
	var choiceField = this;
	choiceField.field = field;
	
	choiceField.element = $("<select />")
	.addClass("minofieldinput")
	.on("change",function(){
		if(field.onChange!=undefined){
			field.onChange();
		}
	});

	choiceField.choices = details['Parameters']['Choices'];
	choiceField.textOutput = (
		details['Parameters']['Text Output']==undefined ? 
		false 
		: 
		details['Parameters']['Text Output']
	); 
	
	if(choiceField.choices!=undefined){
		for(choiceindex in choiceField.choices){
			$(choiceField.element).append(
				$("<option />")
				.attr("value",choiceindex)
				.text(choiceField.choices[choiceindex])
			)
		}
	}

	if(field.htmlFormName!=undefined){
		choiceField.element.attr("name",field.htmlFormName);
	}
}		
	
ChoiceField.prototype.updateView = function(){
	var choiceField = this;
	var field = choiceField.field;

	var currentValue = field.getValue();
	if(choiceField.textOutput){
		var index = choiceField.choices.indexOf(currentValue);
		$($(choiceField.element).children("option")[index]).attr("selected","selected");
	} else {
		if(currentValue==""){
			currentValue=0;
		}
		$($(choiceField.element).children("option")[currentValue]).attr("selected","selected");
	}

	if(field.editing()){
		choiceField.element.removeAttr("disabled");
	} else {
		choiceField.element.attr("disabled","disabled");
	}
}
	
ChoiceField.prototype.compile = function(){
	var choiceField = this;
	var index = choiceField.element.val();

	if(choiceField.textOutput){
		return choiceField.choices[index];
	} else {
		return index;
	}
}