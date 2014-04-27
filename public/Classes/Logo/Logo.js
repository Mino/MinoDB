function Logo(size,theme){
	var logo = this;

	logo.scale1_width = 70;
	logo.scale1_height = 46;

	logo.size = size;
	logo.dark = theme=="dark"; 
	logo.current = 'logo';
	logo.has3d = logo.has_3d_check();

	logo.element = $("<div />").addClass("logo");

	if(logo.has3d){
	
	    logo.element.addClass("logo3d")
	    .append(
	    	logo.perspective = $("<div />").addClass("perspective")
	    	.append(
	    		logo.shape = $("<div />").addClass("shape")
		    	.append(
		    		$("<div />").addClass("base")
		    	)
		    	.append(
		    		$("<div />").addClass("triangle")
		    		.append(
		    			$("<div />").addClass("left")
		    		)
		    		.append(
		    			$("<div />").addClass("right")
		    		)
		    	)
		    )
	    )
	    .append(
	    	$("<div />").addClass("transformAccessories messageDependant messagesNotificationAlert").text("5")
	    )
	    .append(
			$("<div />").addClass("transformAccessories pencilDependant pencilEnd")
			.append(
				$("<div />").addClass("left")
			)
			.append(
				$("<div />").addClass("right")
			)
		)
		.append(
			$("<div />").addClass("transformAccessories houseDependant door")
		)

		setTimeout(function(){
			logo.element.addClass("animated");
		}, 10);

	} else {

		logo.element.addClass("logo2d")
		.append(
			logo = $("<div />").addClass("shape")
		)
	}
}

Logo.prototype.change_width = function(new_width){
	var logo = this;

	var scale = new_width / logo.scale1_width;

	logo.perspective.css({
		"-ms-transform" : "scale3d("+scale+","+scale+","+scale+")",
		"-moz-transform" : "scale3d("+scale+","+scale+","+scale+")",
		"-webkit-transform" : "scale3d("+scale+","+scale+","+scale+")",
		"transform" : "scale3d("+scale+","+scale+","+scale+")"
	});

	logo.element.css({
		"width" : new_width,
		"height" : new_width * (logo.scale1_height/logo.scale1_width)
	})

}

Logo.prototype.changeTo = function(new_choice){
	var logo = this;

	if(has3d){
		if(logo.current!="logo"){
			element.removeClass(logo.current);
		}
		logo.current = new_choice;
		if(new_choice!="logo"){
			element.addClass(logo.current);
		}
	} else {
		if(images2d[data.current]!=undefined){
			$(images2d[data.current]).fadeOut();
		}
		if(images2d[new_choice]!=undefined){
			images2d[new_choice].fadeIn();
		}
	}

	data.current = new_choice;
};

Logo.prototype.has_3d_check = function(){
	var logo = this;
    var el = document.createElement('p'), 
        has3d,
        transforms = {
            'webkitTransform':'-webkit-transform',
            'MozTransform':'-moz-transform'/*,
            'transform':'transform'*/
        };

    // Add it to the body to get the computed style.
    document.body.insertBefore(el, null);

    for (var t in transforms) {
        if (el.style[t] !== undefined) {
            el.style[t] = "translate3d(1px,1px,1px)";
            has3d = window.getComputedStyle(el).getPropertyValue(transforms[t]);
        }
    }

    document.body.removeChild(el);

    return (has3d !== undefined && has3d.length > 0 && has3d !== "none");
}