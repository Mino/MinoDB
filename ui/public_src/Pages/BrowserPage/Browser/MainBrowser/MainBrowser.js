extend(MainBrowser, Browser);

function MainBrowser(page){
	var browser = this;

	browser.need_nav = true;

	MainBrowser.superConstructor.call(this, page);
}

MainBrowser.prototype.backwardPress = function(){
	var browser = this;
	history.go(-1);
}

MainBrowser.prototype.hideElements = function(){
	var browser = this;

	Browser.prototype.hideElements.call(this);

	// toolbar_menu.hide_all_buttons();
}

MainBrowser.prototype.forwardPress = function(){
	var browser = this;
	history.go(1);
}

MainBrowser.prototype.setAddress = function(address){
	var browser = this;
	//jQuery.history.load(address);
	alert("Need to set address");
}

MainBrowser.prototype.loadAddress = function(address){
	var browser = this;
	if(address[0]!='/'){
		address = '/'+address;
	}
	Site.load_url("/browser"+address);
	//Browser.prototype.loadAddress.call(this,address);
}

MainBrowser.prototype.createType = function(){
	var browser = this;

	var typeView = new TypeView(
		null, 
		true, 
		browser
	);
	typeView.element.appendTo(browser.element);
	typeView.updateView();
}

MainBrowser.prototype.back = function(){
	var browser = this;

	window.history.back();

	if(browser.topNav!=undefined){
		browser.topNav.cancelAddress();
	}
}