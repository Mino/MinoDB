var button_type_first = 0;
var button_type_child = 1;
var button_type_item = 2;
var button_type_type = 3;

function PathButton(text,address,button_type,browser){
	var pb = this;

	pb.text = text;
	pb.address = address;
	pb.browser = browser;

	pb.element = $("<a />").addClass("pathbutton")
	.ajax_url(function(){
		if(browser==main_browser){
			return true;
		} else {
			browser.loadurl(address);
			return false;
		}
	})
	.data("object",pb)
	.attr("href","/browser"+address)
	.append(
		pb.button = $("<button />").addClass("mino_button")
		.text(pb.text)
	)
		
	if(button_type==button_type_first){
		
		pb.button.addClass("no_left");
		pb.element.addClass("toppathbutton folder_button");

	} else if(button_type==button_type_child || button_type==button_type_item){

		if(button_type==button_type_child){
			pb.element.addClass("folder_button");
		} else if(button_type==button_type_item){
			pb.element.addClass("endpathbutton");
		}

		pb.element
		.addClass("childbutton")
		.append(
			pb.left_arrow = $("<div />").addClass("left_arrow")
			.append(
				$("<div />").addClass("leftArrowBorder"),
				$("<div />").addClass("leftArrowBackground")
			)
		);

	}

	if(button_type==button_type_first || button_type==button_type_child){

		pb.element
		.append(
			pb.right_arrow = $("<div />").addClass("right_arrow")
			.append(		
				$("<div />").addClass("rightArrowBorder"),
				$("<div />").addClass("rightArrowBackground"),
				$("<div />").addClass("rightArrowHighlight")
			)
		);

	}
}