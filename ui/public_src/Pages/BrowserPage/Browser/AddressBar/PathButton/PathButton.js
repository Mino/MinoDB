var button_type_first = 0;
var button_type_child = 1;
var button_type_item = 2;
var button_type_type = 3;

function PathButton(text,address,button_type,browser){
	var pb = this;

	pb.text = text;
	pb.address = address;
	pb.browser = browser;

	pb.element = $("<li />").addClass("pathbutton")
	.append(
		$("<a />")
		.ajax_url(function(){
			if(browser==main_browser){
				return true;
			} else {
				browser.loadurl(address);
				return false;
			}
		})
		.attr("href","/browser"+address)
		.text(pb.text)
	)
		
	if(button_type==button_type_first){
		pb.element.addClass("toppathbutton");
	} else if(button_type==button_type_child || button_type==button_type_item){
		if(button_type==button_type_child){
			pb.element.addClass("folder_button");
		} else if(button_type==button_type_item){
			pb.element.addClass("endpathbutton");
		}
	}
}