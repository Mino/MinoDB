@import("PathButton/PathButton.js");

function AddressBar(browser){
	var address_bar = this;
	address_bar.browser = browser;

	address_bar.element = $("<div />")
	.addClass("address_bar")
	.append(
		address_bar.text_inputButtonsHolder = $("<div />")
		.addClass("text_inputButtonsHolder")
		.append(		
			address_bar.goAddressButton = $("<button />")
			.addClass("mino_button goAddressButton no_left no_right no_top")
			.text("Go")
			.hide()
			.tappable(function(){
				address_bar.go();
			})
		)
		.append(
			address_bar.cancel_addressButton = $("<button />")
			.addClass("mino_button cancel_addressButton no_right no_top")
			.text("Cancel")
			.hide()
			.tappable(function(){
				address_bar.cancel_address()
			})
		)
	)
	.append(
		address_bar.navButtons = $("<div />")
		.addClass("navbuttons")
	)
	.append(
		address_bar.text_input_holder = $("<div />")
		.addClass("text_input_holder")
		.hide()
		.append(
			address_bar.text_input = $("<textarea />")
			.addClass("text_input")
			.autoResize({
			    maxHeight: 400,
			    minHeight: 0,
			    extraSpace: 1
			})
			.on("keydown",function(e){
				if(e.keyCode==13){
					e.preventDefault();
					address_bar.go();
				}
			})
		)
	)
	.append(
		address_bar.pathButtons = $("<div />")
		.addClass("pathButtons")
		.tappable(function(e){
			if(e.target !== this){return;}
			address_bar.editAddress();
		})
	);

	// if(browser.needNavigation==undefined){
	// 	browser.needNavigation = true;
	// }

	// if(browser.needNavigation){
	// 	address_bar.element.addClass("hasNavigationButtons");
		
	// 	address_bar.navButtons
	// 	.append(
	// 		address_bar.backButton = $("<button />")
	// 		.addClass("mino_button")
	// 		.addClass("historybutton")
	// 		.addClass("backButton")
	// 		.html("&#9668;")
	// 		.css("width","30px")
	// 		.tappable(function() {
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
	// 		.tappable(function() {
	// 			browser.forwardPress();
	// 		})
	// 	)
	// }

	address_bar.navButtons
	.append(
		$("<button />")
		.addClass("mino_button homeButton no_top no_left")
		.css({
			"float" : "left",
			"font-size" : "24px",
			"width" : "32px"
		})
		.append(
			//createHomeIcon()
			$("<div />").text("Home").addClass("homeIcon16 dark")
		)
		.tappable(function(e){
			if(e.metaKey){
				//Holding Cmd or Ctrl
				return true;
			}
			address_bar.browser.loadAddress("/"+username+"/");
		})
	);

	address_bar.recalculateNavButtonWidth();
}

AddressBar.prototype.recalculateNavButtonWidth = function(){
	var address_bar = this;

	var accum_width = 0;
	$(address_bar.navButtons).children().each(function() {
	   accum_width += $(this).width() + 5;
	});

	$(address_bar.navButtons).width(accum_width);
}

AddressBar.prototype.createNavButtonPadding = function(){
	var address_bar = this;

	return $("<div />")
	.addClass("navButtonsPadding")
	.css("width",address_bar.navButtons.width());
}

AddressBar.prototype.editAddress = function(){
	var address_bar = this;

	address_bar.pathButtons.hide();
	address_bar.text_input_holder.show();
	address_bar.goAddressButton.show();	
	address_bar.cancel_addressButton.show();	
	address_bar.navButtons.hide();

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
	address_bar.browser.loadAddress(
		address_bar.text_input.val()
	);
	address_bar.text_input.blur();
	address_bar.cancel_address();
}

AddressBar.prototype.cancel_address = function(){
	var address_bar = this;

	address_bar.pathButtons.show();
	address_bar.text_input_holder.hide();
	address_bar.cancel_addressButton.hide();
	address_bar.goAddressButton.hide();
	address_bar.navButtons.show();
	address_bar.text_input.blur();
}

AddressBar.prototype.editAddress = function(){
	var address_bar = this;

	address_bar.pathButtons.hide();
	address_bar.text_input_holder.show();
	address_bar.goAddressButton.show();	
	address_bar.cancel_addressButton.show();	
	address_bar.navButtons.hide();	
		
	if(isTouchscreen){
		var adr = address_bar.text_input.val();
		address_bar.text_input.val("");
		address_bar.text_input.val(adr);
	} else {
		address_bar.text_input.focus().select();
	}
}

AddressBar.prototype.resize = function(resize_obj){
	var address_bar = this;

	address_bar.text_input.css({
		width: resize_obj.window_width + "px"
	})
}