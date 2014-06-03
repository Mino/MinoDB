function BooleanField(field,details){
	var booleanField = this;
	booleanField.field = field;
	
	booleanField.element = $("<input type=\"checkbox\" />")
	.addClass("minofieldinput")
	.on("change",function(){
		if(field.onChange!=null){
			field.onChange();
		}
	});	
}		
	
BooleanField.prototype.updateView = function(){
	var booleanField = this;
	var field = booleanField.field;

	if(field.getValue()){
		booleanField.element.attr("checked","checked");
	} else {
		booleanField.element.removeAttr("checked");
	}

	if(field.editing()==true){
		booleanField.element.removeAttr("disabled");
	} else {
		booleanField.element.attr("disabled","disabled");
	}
}
	
BooleanField.prototype.compile = function(){
	var booleanField = this;
	return booleanField.element.is(":checked");
}