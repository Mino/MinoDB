function TextField(field,details){
	var textField = this;
	textField.field = field;
	
	textField.initialized = false;
	textField.beforeKeyValue = null;
	textField.keyDownEvent = null;

	textField.element = $("<textarea />")
	.addClass("minofieldinput")
	.prop("title",details.hintText)
	.on("keydown",function(e){
		textField.beforeKeyValue = textField.element.val();
		textField.keyDownEvent = e;
	}).on("keyup",function(e){
		if(e.keyCode!=undefined && textField.keyDownEvent!=null){//Distinguish between a triggered and real event
			var afterKeyValue = textField.element.val();
			if(textField.beforeKeyValue!=null && afterKeyValue!=textField.beforeKeyValue){
				textField.field.onChange();
			}
		}
		textField.keyDownEvent = null;
	})
	.on("focus",function(){
		textField.field.onFocus();
	});

	if(field.htmlFormName!=undefined){
		textField.element.attr("name",field.htmlFormName);
	}
}

TextField.prototype.updateView = function(){
	var textField = this;
	var field = textField.field;

	textField.element.val(field.getValue());
	
	if(textField.initialized==false){
		textField.initialized = true;
		textField.element.autoResize({
		    maxHeight: 400,
		    minHeight: 0,
		    extraSpace: 0
		});
		
		setTimeout(function(){
			textField.element.hint();
		}, 1);
	}

	if(field.editing()==true){

		textField.element
		.addClass("minofieldinput")
		.removeClass("minofieldvalue")
		.prop("readonly",null)
		.prop("disabled",null)
		.trigger('keyup');

	} else {
		textField.element
		.removeClass("minofieldinput")
		.addClass("minofieldvalue")
		.prop("readonly","readonly")
		.prop("disabled","disabled")
		.trigger('keyup');
	}
}
	
TextField.prototype.compile = function(){
	var textField = this;

	if(!textField.element.hasClass(blurClass) && textField.element.val()!=""){
		return textField.element.val();
	}
	return null;
}
