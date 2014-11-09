function Tooltip(infoElement,labelElement){
	var tooltip = this;

	tooltip.showing = false;

	if(labelElement!=null){
		tooltip.element = labelElement;
		tooltip.element.data("object",tooltip);
	} else {
		tooltip.element = $("<div />")
		.addClass("tooltipHelper")
		.data("object",tooltip)
		.text("[?]")
	}
	
	if(isTouchscreen){
		tooltip.element.on('tap',function(){
			tooltip.show();
		});
	} else {
		tooltip.element.on("mouseenter",function(){
			tooltip.show();
		});		
		tooltip.element.on("mouseleave",function(){
			tooltip.hide();
		});
	}
	
	tooltip.holder = $("<div />")
	.addClass("tooltipInfoHolder")
	.append(
		infoElement
	)
}

Tooltip.prototype.hide = function(){
	var tooltip = this;
	
	tooltip.showing = false;
	tooltip.holder.remove();

}

Tooltip.prototype.show = function(){
	var tooltip = this;

	tooltip.showing = true;	
	tooltip.holder
	.css("left","0px")
	.appendTo("body")
	
	var left = tooltip.element.offset().left;
	var top = tooltip.element.offset().top + 20;
	
	var screenWidth = $(window).width();
	
	var maxWidth = ((screenWidth-left)-(40+scrollBarWidth()));
	if(maxWidth<220){
		tooltip.holder.css("top",top+"px");
		tooltip.holder.css("left",(screenWidth-220)+"px");	
	} else {			
		tooltip.holder.css("top",top+"px");
		tooltip.holder.css("left",left+"px");
	}
}