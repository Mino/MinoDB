function PaginationController(pc){
	var pc = this;

	pc.element = $("<div />")
	.addClass("pagination_controller")
	.append(
		$("<div />")
		.addClass("pageControls")
		.append(
			pc.previous_button = $("<button />")
			.addClass("mino_button previousPageButton left no_left no_top no_bottom")
			.css("float","left")
			.css("width","50px")
			.text("Prev.")
		)
		.append(
			pc.page_number = $("<div />")
			.addClass("pageNumber")
		)
		.append(
			pc.next_button = $("<button />")
			.addClass("mino_button previousPageButton right no_right no_top no_bottom")
			.css("float","left")
			.css("width","50px")
			.text("Next")
		)
	)
}