function LoadingIndicator(){
	var li = this;

	li.cancel_press = function(){};

	li.element = $("<div />")
	.addClass("loading_indicator")
	.append(
		li.loader_element = $("<div />")
		.addClass("loader")
		.css("float","left")
		.css("margin-left","20px")
		.height("30px")
		.width("60px")
		.html("&#9608;")
	)
	.append(
		$("<button />")
		.addClass("mino_button")
		.addClass("loading_cancel_button")
		.text("Cancel")
		.tappable(function(){
			li.cancel_press();
		})
	)

	li.flip = false;

	//The interval will only be cleared after the element has been part of the DOM
	li.attached = false;

	li.interval = setInterval(function(){
		if(!li.attached || jQuery.contains(document.documentElement, li.element[0])){
			li.loader_element.html((li.flip ? "&#9608;" : "__"));
			li.flip = !li.flip;
			li.attached = true;
		} else {
			clearInterval(li.interval);
		}
	},300);
}

LoadingIndicator.prototype.show = function(){
	var li = this;

	li.element.show();
}

LoadingIndicator.prototype.hide = function(){
	var li = this;

	li.element.hide();
}