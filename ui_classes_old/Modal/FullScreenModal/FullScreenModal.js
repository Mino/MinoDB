function FullScreenModal(titleText){
	var modal = this;

	modal.closeCallback = function(){};
	modal.onFinishedLoading = function(){};

	if(titleText==undefined){
		titleText = "";
	}

	modal.closable = true;

	modal.shadow = $("<div />")
	.addClass("modalShadow")
	.appendTo("body")
	.hide();

	modal.window = $("<div />")
	.addClass("modal")
	.addClass("fullScreenModal")
	.append(
		modal.topBar = $("<div />")
		.addClass("modalTitle")
		.append(
			modal.title = $("<div />").addClass("modalTitleText").text(titleText)
		)
		.append(
			$("<button />")
			.addClass("mino_button modalCloseButton no_top no_right no_bottom")
			.css("float","right")
			.text("×")
			.on('tap',function(){
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
	.appendTo("body")
	.hide();

	$(document).on('keyup.fullScreenModal',function(e) {
		 if(e.keyCode==27){
		 	modal.close();
		}
	});


	resize(false);

	modal.shadow.fadeIn(400);
	modal.window.fadeIn(400, 
		function(){
			resize(false);
			modal.onFinishedLoading();
		}
	);
}
FullScreenModal.prototype.close = function(){
	var modal = this;
	if(modal.closable){
		modal.window.remove();
		modal.shadow.remove();

		$(document).off('keyup.fullScreenModal');
		modal.closeCallback();
	}
}