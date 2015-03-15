function PaginationController(parent){
	var pc = this;

	pc.parent = parent;

	pc.element = $("<div />")
	.addClass("pagination_controller")
	.append(
		$("<div />")
		.addClass("page_controls")
		.append(
			pc.previous_button = $("<a />").append(
                $("<button/>").addClass("mino_button previous_button").text("Prev.")
            )
		)
		.append(
			pc.page_status = $("<div />")
			.addClass("page_status")
		)
		.append(
			pc.next_button = $("<a />").append(
                $("<button/>").addClass("mino_button next_button").text("Next")
            )
		)
	)
}

PaginationController.prototype.populate = function(response){
	var pc = this;

	var results = response.objects;

	if(response.skip>0){
	    //There is a previous page
	    pc.previous_button.show();
	    var prev_skip = response.skip-response.limit;
	    if(prev_skip<0){
	        prev_skip = 0;
	    }
        pc.previous_button.attr("href",pc.parent.link_with_skip_and_limit(prev_skip,pc.limit)).ajax_url();
	} else {
	    pc.previous_button.hide();
	}
	var skip_index = response.skip;
	if(results.length>0){
	    skip_index++;
	}
	pc.page_status.text(skip_index + " - " + (response.skip+results.length) + " of " +response.total);
	if((response.skip + results.length) < response.total){
	    //There is a next page
	    pc.next_button.show();
	    var next_skip = response.skip+results.length;
        pc.next_button.attr("href",pc.parent.link_with_skip_and_limit(next_skip,pc.limit)).ajax_url();
	} else {
	    pc.next_button.hide();
	}
}

PaginationController.prototype.hide = function(){
	var pc = this;
	pc.element.hide();
}

PaginationController.prototype.show = function(){
	var pc = this;
	pc.element.show();
}