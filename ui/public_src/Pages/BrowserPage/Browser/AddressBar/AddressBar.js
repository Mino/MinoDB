@import("PathButton/PathButton.js");

function AddressBar(browser){
	var address_bar = this;
	address_bar.browser = browser;

	address_bar.element = $("<div />")
	.addClass("address_bar")
	.on('tap',function(e){
		if(e.target !== this){return;}
		address_bar.edit_address();
	})
	.append(
		address_bar.nav_buttons = $("<div />")
		.addClass("nav_buttons")
		,
		address_bar.text_input_holder = $("<div />")
		.addClass("text_input_holder")
		.hide()
		.append(
			address_bar.text_input = $("<textarea />")
			.addClass("text_input")
			.on("keydown",function(e){
				if(e.keyCode==13){
					e.preventDefault();
					address_bar.go();
				}
			})
			,
			address_bar.edit_buttons = $("<div />").addClass("edit_buttons").append(
				address_bar.go_button = $("<button />").addClass("mino_button").text("Go")
				.on('tap',function(){
					address_bar.go();
				})
				,
				address_bar.cancel_button = $("<button />").addClass("mino_button").text("Cancel")
				.on('tap',function(){
					address_bar.cancel_address();
				})
			)
		)
		,
		address_bar.path_buttons = $("<div />")
		.addClass("path_buttons")
		,
		$("<button />").addClass("edit_address_button mino_button").text("Edit").on('tap',function(){
			address_bar.edit_address();
		})
	)

	setTimeout(function(){
		address_bar.text_input.autosize()
	},2000);


	address_bar.nav_buttons
	.append(
		address_bar.backButton = $("<button />")
		.addClass("mino_button").html("&#9668;")
		.on('tap',function() {
			browser.backwardPress();
		})
		,
		address_bar.forward_button = $("<button />")
		.addClass("mino_button").html("&#9658;")
		.on('tap',function() {
			browser.forwardPress();
		})
		,
		address_bar.home_button = $("<button />")
		.addClass("mino_button").text("Home")
		.on('tap',function(e){
			if(e.metaKey){
				//Holding Cmd or Ctrl
				return true;
			}
			address_bar.browser.load_address("/"+username+"/");
		})
	);
}

AddressBar.prototype.populate_path_buttons = function(path){
	var address_bar = this;

	address_bar.path_buttons.empty();

	for(var i = 0; i<path.length; i++){
		
		var button_text = path.object_names[i];
		var button_address = path.sub_paths[i];

		var pathbutton = new PathButton(
			button_text,
			button_address,
			address_bar.browser
		);

		address_bar.path_buttons.append(pathbutton.element);
	}
}

AddressBar.prototype.edit_address = function(){
	var address_bar = this;

	address_bar.path_buttons.hide();
	address_bar.text_input_holder.show();
	address_bar.cancel_button.show();	
	address_bar.nav_buttons.hide();

	if(isTouchscreen){
		var adr = address_bar.text_input.val();
		address_bar.text_input.val("");
		address_bar.text_input.val(adr);
		
	} else {
		address_bar.text_input.focus().select();
	}
}

AddressBar.prototype.go = function(){
	var address_bar = this;
	address_bar.browser.load_address(
		address_bar.text_input.val()
	);
	address_bar.text_input.blur();
	address_bar.cancel_address();
}

AddressBar.prototype.cancel_address = function(){
	var address_bar = this;

	address_bar.path_buttons.show();
	address_bar.text_input_holder.hide();
	address_bar.cancel_button.hide();
	address_bar.nav_buttons.show();
	address_bar.text_input.blur();
}

AddressBar.prototype.edit_address = function(){
	var address_bar = this;

	address_bar.path_buttons.hide();
	address_bar.text_input_holder.show();
	address_bar.cancel_button.show();	
	address_bar.nav_buttons.hide();	
		
	// if(isTouchscreen){
	// 	var adr = address_bar.text_input.val();
	// 	address_bar.text_input.val("");
	// 	address_bar.text_input.val(adr);
	// } else {
		address_bar.text_input.focus().select();
	// }
}

AddressBar.prototype.resize = function(resize_obj){
	var address_bar = this;

	address_bar.text_input.css({
		width: resize_obj.window_width + "px"
	})
}