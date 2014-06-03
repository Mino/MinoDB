function LinkField(field,details){
	var linkField = this;
	linkField.field = field;
	linkField.details = details;
	linkField.initialized = false;

	linkField.element = $("<div />");
	
	var linkElement = $("<a />")
	.appendTo(linkField.element)
	.on("click",function(e){

		if(field.editing()==true){
           	e.preventDefault();
			e.stopPropagation();
			return false;
		} else {
			if(field.element.closest($(mainBrowser.container)).length > 0){
				if(linkField.inputBox.val()!=""){
					linkElement.prop("href","http://minocloud.com/browser/#"+$(linkField.inputBox).val());
				} else {
					linkElement.prop("href",null);
				}	
			} else {
				field.element.closest(".browser").data("object").loadAddress($(linkField.inputBox).val());
			}

			return true;
		}
	});

	var inputElement = $("<div />").appendTo(linkElement);

	linkField.inputBox = $("<textarea />")
	.prop("title",field.hintText)
	.addClass("minofieldinput")
	.on("focus",function(){
		field.onFocus();
	})
	.addClass("addresslink")
	.appendTo(inputElement);
				
	var receiveSelectionFunction = function(selection){
		linkField.inputBox.val(selection);
	}
	
	linkField.selectButton = $("<button />")
	.addClass("mino_button mino_buttonOnLight linkFieldButton no_top")
	.appendTo(linkField.element)
	.text("Select")
	.tappable(function(){
		selectObjectModal = new SelectObjectModal(
			linkField,
			receiveSelectionFunction
		);
	});	
}		
		
LinkField.prototype.updateView = function(){
	var linkField = this;
	var field = linkField.field;

	linkField.inputBox
	.val(field.getValue());
	
	if(linkField.initialized==false){
		linkField.initialized = true;
		linkField.inputBox.autoResize({
		    maxHeight: 400,
		    minHeight: 0,
		    extraSpace: 0
		})
		.hint();
	}

	if(linkField.setToCurrentButton==undefined && 
		field.getCurrentPath!=undefined
	){
		linkField.setToCurrentButton = $("<button />")
		.addClass("mino_button mino_buttonOnLight linkFieldButton no_top")
		.css("display","inline-block")
		.appendTo(linkField.element)
		.text("Set to Current")
		.tappable(function(){
			var currentPath = field.getCurrentPath();
			if(currentPath.charAt(0)=='/'){
				linkField.inputBox.val(currentPath);
			}
		});	

		linkField.selectButton.addClass("no_right");
	}

	if(field.editing()==true){
		linkField.selectButton.show();

		if(linkField.setToCurrentButton!=undefined){
			linkField.setToCurrentButton.show();
		}

		linkField.inputBox
		.addClass("minofieldinput")
		.removeClass("minofieldvalue")
		.prop("readonly",null)
		.prop("disabled",null)
		.trigger('keyup');


	} else {
		linkField.selectButton.hide();

		if(linkField.setToCurrentButton!=undefined){
			linkField.setToCurrentButton.hide();
		}

		linkField.inputBox
		.removeClass("minofieldinput")
		.addClass("minofieldvalue")
		.prop("readonly","readonly")
		.prop("disabled","disabled")
		.trigger('keyup');
	}
}

LinkField.prototype.compile = function(){
	var linkField = this;

	if(!linkField.inputBox.hasClass(blurClass)){
		return linkField.inputBox.val();
	}
	return null;
}