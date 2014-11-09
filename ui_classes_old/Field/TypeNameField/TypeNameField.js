function TypeNameField(details){
	this.usernameSpan = $("<span />")
	.text(username+".")
	.appendTo(details.valueField);
	
	this.inputBox = $("<input type=\"text\"/>")
	.addClass("minofieldinput")
	.appendTo(details.valueField)
	.on("focus",function(){$(details.valueField).data("onChange")() })
	.hide();
	
	this.versionNumberSpan = $("<span />")
	.text(".*")
	.appendTo(details.valueField);

	this.namevalue = $("<div />")
	.addClass("minofieldvalue")
	.addClass(details.valueClass)
	.appendTo(details.valueField)
	.show();	
				
	this.updateViewFunction = function(){
		if($(details.element).data("Editing")==true){
			var currentValue = details.getValue();
			
			var typeNameParts = currentValue.split(".");
			
			$(this.inputBox).val(typeNameParts[1]);
			$(this.usernameSpan).show();
			$(this.inputBox).show();
			$(this.versionNumberSpan).show();
			$(this.namevalue).hide();
		} else {
			$(this.usernameSpan).hide();
			$(this.inputBox).hide();
			$(this.versionNumberSpan).hide();
			$(this.namevalue).text(details.getValue()).show();
		}
	}
	
	this.compileFunction = function(){
		return username+"."+$(this.inputBox).val();		
	}
}