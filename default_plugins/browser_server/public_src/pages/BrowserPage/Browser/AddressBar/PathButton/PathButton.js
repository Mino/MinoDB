var button_type_first = 0;
var button_type_child = 1;
var button_type_item = 2;
var button_type_type = 3;

function PathButton(text,address,browser,options){
	var pb = this;

	pb.text = text;
	pb.address = address;
	pb.browser = browser;
	pb.options = options || {};

	var href;
	if(pb.options.encode!==undefined && pb.options.encode===false){
		href = Site.path+address;
	} else {
		href = Site.path+encode_path(address);
	}

	pb.element = $("<div />").addClass("pathbutton")
	.append(
		$("<a />", {"href": href})
		.ajax_url(function(){
			if(browser instanceof MainBrowser){
				return true;
			} else {
				browser.loadurl(address);
				return false;
			}
		})
		.text(pb.text)
	)
}