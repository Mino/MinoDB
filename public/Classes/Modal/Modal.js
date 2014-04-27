function Modal(titleText,zIndex){
	var modal = this;

	if(zIndex==null){
		zIndex = 2001;
	}

	modal.closeCallback = function(){};
	modal.onFinishedLoading = function(){};

	if(titleText==undefined){
		titleText = "";
	}

	modal.shadow = $("<div />")
	.addClass("modalShadow")
	.appendTo("body")
	.css("z-index",zIndex)
	.hide();

	if(modal.height==undefined){
		modal.height = 300;
	}

	modal.window = $("<div />")
	.addClass("modal")
	.css("z-index",zIndex+1)
	.css("height", modal.height+"px")
	.css("margin-top",-(modal.height/2.0)+"px")
	.append(
		modal.TopBar = $("<div />")
		.addClass("modalTitle")
		.append(
			modal.title = $("<div />")
			.addClass("modalTitleText")
			.text(titleText)
		)
		.append(
			$("<button />")
			.addClass("mino_button modalCloseButton no_top no_right no_bottom")
			.css("float","right")
			.text("×")
			.tappable(function(){
				modal.close();
			})
		)
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
	.hide()
	.appendTo("body");

	$(document).on('keyup.modal',function(e) {
		 if(e.keyCode==27){
		 	modal.close();
		}
	});

	resize(false);

	modal.shadow.show();
	modal.window.fadeIn(400, 
		function(){
			resize(false);
			modal.onFinishedLoading();
		}
	);
}
Modal.prototype.close = function(){
	var modal = this;
	modal.window.remove();
	modal.shadow.remove();

	$(document).off('keyup.modal');
	if(modal.callbackCalled==undefined){
		modal.callbackCalled = true;
		modal.closeCallback();
	}
}
