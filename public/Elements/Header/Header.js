function Header(){
	var header = this;

	header.element = $("<div />").addClass("header")
	.append(
		$("<div />").addClass("top_header")
	)
	.append(
		$("<div />").addClass("fixed_header")
		.append(
			$("<div />").addClass("center_holder")
			.append(
				$("<div />").addClass("menu_center center")
				.append(
					header.logo = $("<div />").attr("id","logo")
					.append(
						$("<a />")
						.attr("href","/")
						.ajax_url()
						.append(
							$("<div />").attr("id","topLogo")
						)
					)
				)
				.append(
					header.menu_items_holder = $("<div />").addClass("menu_items_holder")
					.append(
						$("<a />")
						.attr("href","/beta/")
						.ajax_url()
						.append(
							header.menu_beta = $("<button />")
							.addClass("mino_button menu_item no_top no_bottom")
							.text("Beta")
						)
					)
					.append(
						$("<a />")
						.attr("href","/docs/")
						.ajax_url()
						.append(
							header.menu_docs = $("<button />")
							.addClass("mino_button menu_item no_top no_right no_bottom")
							.text("Docs")
						)
					)
					.append(
						$("<a />")
						.attr("href","/features/")
						.ajax_url()
						.append(
							header.menu_features = $("<button />")
							.addClass("mino_button menu_item no_top no_right no_bottom")
							.text("Features")
						)
					)
					.append(
						$("<a />")
						.attr("href","/")
						.ajax_url()
						.append(
							header.menu_minocloud = $("<button />")
							.attr("id","mino_menu_item")
							.addClass("mino_button menu_item no_top no_bottom")
							.append(
								$("<div />").addClass("button_contents")
								.append(
									$("<div />").addClass("logo logo24 dark")
									.append(
										$("<div />").addClass("left")
									)
									.append(
										$("<div />").addClass("right")
									)
								)
								.append(
									$("<span />").text("MinoCloud")
								)
							)
						)
					)
				)
			)
		)
	)
}

Header.prototype.hide = function(){
	var header = this;

	header.element.addClass("hidden");
}

Header.prototype.show = function(){
	var header = this;

	header.element.removeClass("hidden");
}

Header.prototype.resize = function(resize_obj){
	var header = this;


	var fixed_size = 100;
	var mino_ratio = 1.5;
	var mino_size = fixed_size*mino_ratio;

	if(resize_obj.body_width<(fixed_size*3 + mino_size)){

		var button_size = Math.round(resize_obj.body_width / (3 + mino_ratio));
		var mino_size = resize_obj.body_width - (3*button_size);
		header.menu_minocloud.width(mino_size);

		header.menu_beta.width(Math.ceil(button_size));
		header.menu_docs.width(Math.floor(button_size));
		header.menu_features.width(Math.floor(button_size));
		header.menu_minocloud.addClass("no_right");
	} else {
		header.menu_minocloud.width(fixed_size*mino_ratio);
		header.menu_beta.width(fixed_size);
		header.menu_docs.width(fixed_size);
		header.menu_features.width(fixed_size);
		header.menu_minocloud.removeClass("no_right");
	}

}