function Modal(titleText,zIndex){
	var modal = this;

	if(zIndex==null){
		zIndex = 2001;
	}

	modal.initial_position = false;

	modal.closeCallback = function(){};
	modal.okCallback = function(){};
	modal.onFinishedLoading = function(){};

	if(titleText==undefined){
		titleText = "";
	}

	modal.shadow = $("<div />")
	.addClass("modalShadow")
	.appendTo("body")
	.css("z-index",zIndex)
	.hide();

	modal.element = $("<div />")
	.addClass("modal")
	.css("z-index",zIndex+1)
	.append(
		modal.TopBar = $("<div />")
		.addClass("modalTitle")
		.append(
			modal.title = $("<div />")
			.addClass("modalTitleText")
			.text(titleText)
		)
	).append(
		$("<button />")
		.addClass("f8_button modalCloseButton no_top no_right no_bottom")
		.css("float","right")
		.text("×")
		.on('tap',function(){
			modal.close();
		})
	)
	.append(
		modal.view = $("<div />")
		.addClass("modalContents")
	)
	.append(
		modal.bottomBar = $("<div />")
		.addClass("modalBottomBar")
		.addClass("interfacebox")
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
		 	modal.okCallback();
			if(modal.okClosesModal){
				modal.closeModal();
			}
		}
	});

	modal.shadow.show();
	modal.element.fadeIn(400, 
		function(){
			modal.onFinishedLoading();
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
	if(modal.callbackCalled==undefined){
		modal.callbackCalled = true;
		modal.closeCallback();
	}
}