extend(NotFoundPage, Page);
function NotFoundPage(req){
	var page = this;

	NotFoundPage.superConstructor.call(this);
	
	page.element
	.addClass("not_found_page")
	.append(
		page.error_code = $("<div />").addClass("error_code").text("404")
	)
	.append(
		page.description = $("<div />").addClass("description").text("Page not found")
	)
}

NotFoundPage.prototype.get_title = function(){
	var page = this;
	return "Page Not Found";
}

NotFoundPage.prototype.resize = function(resize_obj){
	var page = this;

	var error_code_font_size = (resize_obj.proportion * 300) + "px";
	page.error_code.css({
		"font-size" : error_code_font_size,
		"line-height" : error_code_font_size
	})

	var description_font_size = (resize_obj.proportion * 70) + "px";
	page.description.css({
		"font-size" : description_font_size,
		"line-height" : description_font_size
	})
}