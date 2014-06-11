function PaginationController(){
	var pc = this;

	pc.element = $("<div />")
	.addClass("pagination_controller")
	.hide()
	.append(
		$("<div />")
		.addClass("pageControls")
		.append(
			folderView.previousPageButton = $("<button />")
			.addClass("mino_button previousPageButton left no_left no_top no_bottom")
			.css("float","left")
			.css("width","50px")
			.text("Prev.")
		)
		.append(
			folderView.pageNumber = $("<div />")
			.addClass("pageNumber")
		)
		.append(
			folderView.resultsStatus = $("<div />")
			.addClass("resultsStatus")
		)
		.append(
			folderView.nextPageButton = $("<button />")
			.addClass("mino_button previousPageButton right no_right no_top no_bottom")
			.css("float","left")
			.css("width","50px")
			.text("Next")
		)
	)
}