function Modal(props){
	var modal = this;

	console.log(props);

	if(!props){
		props = {};
	}

	modal.z_index = props.z_index || 2001;

	modal.initial_position = false;

	modal.close_callback = function(){};
	modal.ok_callback = function(){};
	modal.on_finished_loading = function(){};

	modal.title_text = props.title || "";

	modal.shadow = $("<div />")
	.addClass("modal_shadow")
	.appendTo("body")
	.css("z-index",modal.z_index)
	.hide();

	modal.element = $("<div />")
	.addClass("modal")
	.css("z-index",modal.z_index+1)
	.append(
		modal.title_holder = $("<div />")
		.addClass("modal_title_holder")
		.append(
			modal.title = $("<div />")
			.addClass("modal_title_text")
			.text(modal.title_text)
		)
	).append(
		modal.close_button = $("<button />")
		.addClass("mino_button modal_close_button")
		.css("float","right")
		.text("×")
		.on('tap',function(){
			modal.close();
		})
	)
	.append(
		modal.contents = $("<div />")
		.addClass("modal_contents")
	)
	.append(
		modal.bottom_bar = $("<div />")
		.addClass("modal_bottom_bar")
	)
	.appendTo("body");

	setTimeout(function(){
		modal.reposition();
	},1);

	modal.element.hide();

	$(document).on('keyup.modal',function(e) {
		if(e.keyCode==27){
		 	modal.close();
		} else if(e.keyCode==13){//Enter
		 	modal.ok_callback();
			if(modal.ok_closes_modal){
				modal.close_modal();
			}
		}
	});

	modal.shadow.show();
	modal.element.fadeIn(400, 
		function(){
			modal.on_finished_loading();
			modal.reposition();
		}
	);
}
Modal.prototype.reposition = function(){
	var modal = this;

	var props = {
		"margin-top":-(modal.element.outerHeight()/2.0)+"px"
	};

	if(modal.initial_position){
		modal.element.animate(props,500);
	} else {
		modal.element.css(props);
		modal.initial_position = true;
	}
}
Modal.prototype.close = function(){
	var modal = this;
	modal.element.remove();
	modal.shadow.remove();

	$(document).off('keyup.modal');
	if(modal.callback_called==undefined){
		modal.callback_called = true;
		modal.close_callback();
	}
}