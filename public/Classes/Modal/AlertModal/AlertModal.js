extend(AlertModal, Modal);
function AlertModal(title){
	var modal = this;
	modal.okClosesModal = true;
	AlertModal.superConstructor.call(this,title);

	modal.bottomBar
	.append(
		$("<button />")
	 	.addClass("mino_button singleButton noBorder")
	 	.text("OK")
	 	.tappable(function(e){
			if(e.target !== this){return;}
			modal.close();	
	 	})
	)

	$(document).on('keyup.alertModal',function(e) {
		 if(e.keyCode==27){//Escape
		 	modal.close();
		 } else if(e.keyCode==13){//Enter
			if(modal.okClosesModal){
				modal.close();
			}
		 }
	});
}
