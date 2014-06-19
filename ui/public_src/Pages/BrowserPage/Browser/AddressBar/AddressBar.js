@import("PathButton/PathButton.js");

function AddressBar(browser){
	var address_bar = this;
	address_bar.browser = browser;

	address_bar.element = $("<div />")
	.addClass("address_bar")
	.on('tap',function(e){
		if(e.target !== this){return;}
		address_bar.editAddress();
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
		$("<button />").addClass("edit_address_button").text("Edit")
	)

	setTimeout(function(){
		address_bar.text_input.autosize(//{
		    // maxHeight: 400,
		    // minHeight: 50,
		    // extraSpace: 1
		// }
		)
	},2000);

	// if(browser.needNavigation==undefined){
	// 	browser.needNavigation = true;
	// }

	// if(browser.needNavigation){
	// 	address_bar.element.addClass("hasNavigationButtons");
		
	// 	address_bar.nav_buttons
	// 	.append(
	// 		address_bar.backButton = $("<button />")
	// 		.addClass("mino_button")
	// 		.addClass("historybutton")
	// 		.addClass("backButton")
	// 		.html("&#9668;")
	// 		.css("width","30px")
	// 		.on('tap',function() {
	// 			browser.backwardPress();
	// 		})
	// 	)
	// 	.append(
	// 		address_bar.forwardButton = $("<button />")
	// 		.addClass("mino_button")
	// 		.addClass("historybutton")
	// 		.addClass("forwardButton")
	// 		.html("&#9658;")
	// 		.css("width","30px")
	// 		.on('tap',function() {
	// 			browser.forwardPress();
	// 		})
	// 	)
	// }

	address_bar.nav_buttons
	.append(
		$("<button />")
		.addClass("mino_button homeButton no_top no_left")
		.css({
			"width" : "32px"
		})
		.append(
			//createHomeIcon()
			$("<div />").text("Home").addClass("homeIcon16 dark")
		)
		.on('tap',function(e){
			if(e.metaKey){
				//Holding Cmd or Ctrl
				return true;
			}
			address_bar.browser.load_address("/"+username+"/");
		})
	);
}

AddressBar.prototype.editAddress = function(){
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

AddressBar.prototype.editAddress = function(){
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