function TreeField(field,details){
	var treeField = this;
	treeField.field = field;
	
	treeField.initialized = false;
	
	treeField.element = $("<textarea />")
	.addClass("minofieldinput")
	.prop("title",details.hintText)
	.on("focus",function(){
		field.onFocus();
	});

	if(field.htmlFormName!=undefined){
		treeField.element.attr("name",field.htmlFormName);
	}
}

TreeField.prototype.updateView = function(){
	var treeField = this;
	var field = treeField.field;

	var stringified = field.getValue();
	if(stringified!=null && typeof stringified === "object" && stringified.length==0){
		stringified = {};
	} else {
		try{
			stringified = JSON.parse(stringified);
		} catch (e){

		}
	}
	if(stringified!=null){
		stringified = JSON.stringify(stringified);
	}



	treeField.element.val(stringified);
	
	if(treeField.initialized==false){
		treeField.initialized = true;
		treeField.element.autoResize({
		    maxHeight: 400,
		    minHeight: 0,
		    extraSpace: 0
		});
		
		setTimeout(function(){
			treeField.element.hint();
		}, 1);
	}

	if(field.editing()==true){

		treeField.element
		.addClass("minofieldinput")
		.removeClass("minofieldvalue")
		.prop("readonly",null)
		.prop("disabled",null)
		.trigger('keyup');


	} else {
		treeField.element
		.removeClass("minofieldinput")
		.addClass("minofieldvalue")
		.prop("readonly","readonly")
		.prop("disabled","disabled")
		.trigger('keyup');
	}
}
	
TreeField.prototype.compile = function(){
	var treeField = this;

	if(!treeField.element.hasClass(blurClass) && treeField.element.val()!=""){
		return treeField.element.val();
	}
	return null;
}
