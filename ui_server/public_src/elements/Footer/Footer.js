function Footer(){
	var f = this;

	f.element = $("<div />").addClass("footer")
	.append(
		$("<div />").text("© 2013 MinoCloud Inc.")
	)
	.append(
		f.contact_link = $("<a />")
		.attr("href","/contact/")
		.text("Contact Us")
		.ajax_url()
	)
}

Footer.prototype.hide = function(){
	var f = this;

	f.element.fadeOut(500);
}

Footer.prototype.show = function(){
	var f = this;

	f.element.fadeIn(500);
}

Footer.prototype.hide_contact_link = function(){
	var f = this;
	f.contact_link.hide();
}

Footer.prototype.show_contact_link = function(){
	var f = this;
	f.contact_link.show();
}