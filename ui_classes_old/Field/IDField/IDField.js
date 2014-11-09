function IDField(field,details){	
	var idField = this;
	idField.field = field;
	idField.details = details;

	var inputName = "id_"+(Math.round(Math.random()*1024));

	idField.initialized = false;

	idField.inputBox = null;

	idField.element = $("<div />");
	
	idField.newIDDiv = $("<div />")
	.appendTo(idField.element);
			

	idField.newCheckbox = $("<input type=\"radio\">")
	.attr("name","radio"+inputName)
	.css("margin-right","10px")
	.change(function(){
		$(idField.inputBox).hide();
	})
	.appendTo(idField.newIDDiv);

	var newSpan = $("<span />")
	.text("New item ")
	.appendTo(idField.newIDDiv);
	
	idField.existingIDDiv = $("<div />")
	.appendTo(idField.element);


	
	idField.existingCheckbox = $("<input type=\"radio\">")
	.attr("name","radio"+inputName)
	.css("margin-right","10px")
	.change(function(){
		$(idField.inputBox).show();
	})
	.appendTo(idField.existingIDDiv);
	
	var existingSpan = $("<span />")
	.text("Existing item ")
	.appendTo(idField.existingIDDiv);
	
	idField.inputBox = $("<textarea />")
	.prop("title",details.hintText)
	.addClass("minofieldinput")
	.appendTo(idField.element)
	.on("focus",function(){
		field.onFocus(); 
	})

}

IDField.prototype.updateView = function(){	
	var idField = this;
	var field = idField.field;
	var details = idField.details;
	
	if(idField.initialized==false){
		idField.initialized = true;
		$(idField.inputBox).autoResize({
		    maxHeight: 400,
		    minHeight: 0,
		    extraSpace: 0
		})
		setTimeout(function(){
			$(idField.inputBox).hint();
		}, 1);
	}
	
	var currentValue = field.getValue();
	$(idField.inputBox).val(currentValue);

	if(field.editing()==true){
		$(idField.newCheckbox).show().attr("checked","");
		$(idField.existingCheckbox).show().attr("checked","");
		
		$(idField.newIDDiv).show();
		$(idField.existingIDDiv).show();
		if(currentValue=="" || currentValue==null){
			$(idField.newCheckbox).attr("checked","checked");
			$(idField.inputBox).hide();
		} else {
			$(idField.existingCheckbox).attr("checked","checked");
		}

		$(idField.inputBox)
		.addClass("minofieldinput")
		.removeClass("minofieldvalue")
		.prop("readonly",null)
		.prop("disabled",null)
		.trigger('keyup');


	} else {
		$(idField.newIDDiv).hide();
		$(idField.existingIDDiv).hide();
		$(idField.inputBox).show();

		$(idField.inputBox)
		.removeClass("minofieldinput")
		.addClass("minofieldvalue")
		.prop("readonly","readonly")
		.prop("disabled","disabled")
		.trigger('keyup');
	}
}

IDField.prototype.compile = function(){	
	var idField = this;

	if(!$(idField.inputBox).hasClass(blurClass) && $(idField.existingCheckbox).is(":checked")){
		if(isNumeric($(idField.inputBox).val())){
			return parseInt($(idField.inputBox).val());
		}
		return $(idField.inputBox).val();
	}
	return null;		

}