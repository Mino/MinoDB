function Feature(object,is_left){
	var f = this;

	f.title = object.title;
	f.text = object.text;
	f.image_ref = object.image_ref;

	f.stacked = null;

	f.element = $("<div />").addClass("feature")
	.append(
		f.text_element = $("<div />").addClass("text")
		.append(
			$("<span />").addClass("title").text(f.title)
		)
		.append(
			$("<div />").addClass("content").html(f.text)
		)
	)
	.append(
		$("<div />").addClass("image "+f.image_ref)
		.append(
			f.image_div = $("<div />")
		)
	)

	if(is_left){
		f.element.addClass("left");
	} else {
		f.element.addClass("right");
	}

}

Feature.prototype.resize = function(resize_obj) {
	var f = this;

	var should_stack = resize_obj.doc_width<800;

	if(!should_stack){

		if(f.stacked){
			f.element.removeClass("stacked");
			
			f.element.css("height","320px");
		}

		var text_height = f.text_element.outerHeight();
		f.text_element.css("margin-top",((320-text_height)/2)+"px");

		var img_width = 300 + ((resize_obj.doc_width-800) / 2);
		if(img_width > 400){
			img_width = 400;
		}
		var img_height = img_width * (225.0/300.0);

		f.image_div.css({
			"height" : img_height+"px",
			"width" : img_width+"px",
			"margin-top" : -(img_height/2.0)+"px",
			"margin-left" : -(img_width/2.0)+"px",
			"background-size" : img_width+"px "+img_height+"px"
		});

	} else if(should_stack){

		if(!f.stacked){
			f.element.addClass("stacked");

			f.image_div.css({
				"height" : "225px",
				"width" : "300px",
				"margin-left" : "-150px",
				"margin-top" : "-112px",
				"background-size" : "300px 225px"
			});
			f.text_element.css("margin-top","0px");
		}

		var text_height = f.text_element.innerHeight();
		f.element.css("height",text_height+260+"px");

	}

	f.stacked = should_stack;
};