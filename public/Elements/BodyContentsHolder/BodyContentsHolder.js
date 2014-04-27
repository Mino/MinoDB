function BodyContentsHolder(){
	var bch = this;

	bch.element = $("<div />").addClass("body_contents_holder")
	.append(
		bch.contents = $("<div />").addClass("contents")
	)
}

BodyContentsHolder.prototype.resize = function(resize_obj) {
	var bch = this;

	bch.contents.css({
		"min-height" : (resize_obj.doc_height-40)+"px"
	})
};

BodyContentsHolder.prototype.set_transparent = function(set){
	var bch = this;

	bch.element.toggleClass("transparent",set);
}