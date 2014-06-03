function TypeField(details){
	var initialized = false;
	
	var linkElement = $("<a />").appendTo(details.valueField).on("click",function(e){
		if(details.element.data("Editing")==true){
	       	e.preventDefault();
			e.stopPropagation();
			return false;
		} else {
			if($(this.inputBox).val()!=""){
				linkElement.prop("href","http://minocloud.com/browser/#"+$(inputBox).val());
			} else {
				linkElement.prop("href",null);
			}
			return true;
		}
	});
	this.linkElement = linkElement;
	
	this.inputBox = $("<textarea />")
	.addClass("minofieldinput")
	.appendTo(this.linkElement)
	.on("focus",function(){$(valueField).data("onChange")() })
	.removeClass("autogrowresize")
	.addClass(details.valueClass);
		
	this.updateViewFunction = function(){
	
		$(this.inputBox)
		.val(details.getValue());
		
		if(initialized==false){
			initialized = true;
			$(this.inputBox).autoResize({
			    maxHeight: 400,
			    minHeight: 0,
			    extraSpace: 0
			})
			.hint();
		}
	}
	
	this.compileFunction = function(){
		if(!$(this.inputBox).hasClass(blurClass)){
			return $(this.inputBox).val();
		}
		return "";
	}
	
}