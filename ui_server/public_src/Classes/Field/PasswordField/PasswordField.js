function PasswordField(field,details){
	var passwordField = this;
	passwordField.field = field;
	
	passwordField.initialized = false;
	
	passwordField.element = $("<input type=\"password\" />")
	.css("width","100%")
	.addClass("minofieldinput")
	.prop("title",details.hintText)
	.on("focus",function(){
		field.onFocus();
	});
}

PasswordField.prototype.updateView = function(){
	var passwordField = this;
	var field = passwordField.field;

	$(passwordField.element)
	.val(field.getValue());

	if(field.editing()==true){

		$(passwordField.element)
		.addClass("minofieldinput")
		.removeClass("minofieldvalue")
		.prop("readonly",null)
		.prop("disabled",null)
		.trigger('keyup');


	} else {
		$(passwordField.element)
		.removeClass("minofieldinput")
		.addClass("minofieldvalue")
		.prop("readonly","readonly")
		.prop("disabled","disabled")
		.trigger('keyup');
	}
}
	
PasswordField.prototype.compile = function(){
	var passwordField = this;

	if(!$(passwordField.element).hasClass(blurClass) && $(passwordField.element).val()!=""){
		return $(passwordField.element).val();
	}
	return null;
}
