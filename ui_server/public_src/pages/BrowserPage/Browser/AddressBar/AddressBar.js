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
		address_bar.home_button = $("<a />")
		.attr({
			"href": Site.path+"browser//"+user.username+"/"
		}).ajax_url(function(event){
			if(!address_bar.browser instanceof MainBrowser){
				address_bar.browser.load(address);
				event.preventDefault();
			}	
		}).append(
			$("<button />").addClass("mino_button").text("Home")
		)
		,
		address_bar.types_button = $("<a />")
		.attr({
			"href": Site.path+"browser/?types"
		}).ajax_url(function(event){
			if(!address_bar.browser instanceof MainBrowser){
				address_bar.browser.load(address);
				event.preventDefault();
			}	
		}).append(
			$("<button />").addClass("mino_button").text("Types")
		)
	);
}

AddressBar.prototype.populate_path_buttons = function(path){
	var address_bar = this;

	address_bar.path_buttons.empty();

	if(typeof path === 'string'){
		var pathbutton = new PathButton(
			path,
			path,
			address_bar.browser
		);

		address_bar.path_buttons.append(pathbutton.element);
	} else {

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

	address_bar.set_address(path.toString());
}


AddressBar.prototype.go = function(){
	var address_bar = this;

	var address = address_bar.text_input.val();

	if(address_bar.browser instanceof MainBrowser){
		Site.load_url(Site.path+"browser/"+address, true);
	} else {
		address_bar.browser.load(address);
	}
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
		
	address_bar.text_input.focus().select();
}

AddressBar.prototype.set_address = function(set_val){
	var address_bar = this;

	address_bar.text_input.val(set_val);
}

AddressBar.prototype.resize = function(resize_obj){
	var address_bar = this;

	address_bar.text_input.css({
		width: resize_obj.window_width + "px"
	})
}