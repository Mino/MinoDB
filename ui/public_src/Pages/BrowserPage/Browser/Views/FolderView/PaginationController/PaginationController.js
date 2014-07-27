function PaginationController(pc){
	var pc = this;

	pc.element = $("<div />")
	.addClass("pagination_controller")
	.append(
		$("<div />")
		.addClass("page_controls")
		.append(
			pc.previous_button = $("<button />")
			.addClass("mino_button previous_button")
			.text("Prev.")
		)
		.append(
			pc.page_number = $("<div />")
			.addClass("page_number")
			.text("Page 1 of 1")//MOCKED
		)
		.append(
			pc.next_button = $("<button />")
			.addClass("mino_button next_button")
			.text("Next")
		)
	)
}