var button_type_first = 0;
var button_type_child = 1;
var button_type_item = 2;
var button_type_type = 3;

function PathButton(text,address,browser){
	var pb = this;

	pb.text = text;
	pb.address = address;
	pb.browser = browser;

	console.log(arguments);

	pb.element = $("<div />").addClass("pathbutton")
	.append(
		$("<a />")
		.ajax_url(function(){
			if(browser instanceof MainBrowser){
				return true;
			} else {
				browser.loadurl(address);
				return false;
			}
		})
		.attr("href", Site.path+encode_path(address))
		.text(pb.text)
	)
}