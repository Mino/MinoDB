extend(DialogModal, Modal);
function DialogModal(title){
	var modal = this;
	DialogModal.superConstructor.call(this,title);

	modal.cancelCallback = function(){};
	modal.okCallback = function(){};
	modal.okClosesModal = true;

	modal.bottomBar
	.append(
		modal.cancelButton = $("<button />")
	 	.addClass("mino_button leftButton noBorder")
	 	.text("Cancel")
	 	.tappable(function(e){
			if(e.target !== this){return;}			 		
			modal.cancelCallback();
			modal.closeModal();	
	 	})
	)
	.append(
		modal.okButton = $("<button />")
	 	.addClass("mino_button rightButton no_top no_right no_bottom")
	 	.text("OK")
	 	.tappable(function(e){
			if(e.target !== this){return;}				 		
			modal.okCallback();
			if(modal.okClosesModal){
				modal.closeModal();
			}
	 	})
	)
	
	$(document).on('keyup.dialogModal',function(e) {
		 if(e.keyCode==27){//Escape
		 	modal.cancelCallback();
		 	modal.closeModal();
		 } else if(e.keyCode==13){//Enter
		 	modal.okCallback();
			if(modal.okClosesModal){
				modal.closeModal();
			}
		 }
	});
}

DialogModal.prototype.closeModal = function(){
	var modal = this;
	$(document).off('keyup.dialogModal');

	modal.close();
}

DialogModal.prototype.setButtonText = function(cancelString, okString){
	var modal = this;
	modal.cancelButton.text(cancelString);
	modal.okButton.text(okString);
}