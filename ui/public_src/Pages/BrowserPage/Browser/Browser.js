@import("AddressBar/AddressBar.js");
@import("Views/Views.js");

@import("RuleCache.js");
@import("MainBrowser/MainBrowser.js");
@import("Toolbar/Toolbar.js");

function Browser(){
	var browser = this;

	browser.history = {};
	browser.historyIndex = -1;

	browser.rule_cache = new RuleCache();

	browser.address_bar = new AddressBar(browser);

	browser.toolbar = new Toolbar(browser);

	browser.element = $("<div />")
	.addClass("browser")
	.append(
		browser.address_bar.element,
		browser.view_container = $("<div />").addClass("view_container"),
		browser.toolbar.element
	)
	
	browser.capacityElement = window;
	browser.onRestore = function(){};
	browser.onLoad = function(type,object){
		var browser = this;
	}
}

Browser.prototype.resize = function(resize_obj){
	var browser = this;

	browser.address_bar.resize(resize_obj);
}

Browser.prototype.isLoading = function(){
	var browser = this;

	return browser.latestRequest!=null;
}

Browser.prototype.backwardPress = function(){
	var browser = this;
	if(browser.history[browser.historyIndex-1]!=undefined){
		browser.forceLoadAddress(browser.history[browser.historyIndex-1]);
		browser.historyIndex--;
	}
}

Browser.prototype.forwardPress = function(){
	var browser = this;
	//Can use forceLoadAddress because mainBrowser overrides this
	if(browser.history[browser.historyIndex+1]!=undefined){
		browser.forceLoadAddress(browser.history[browser.historyIndex+1]);
		browser.historyIndex++;
	}
}

Browser.prototype.load = function(address){
	var browser = this;

	console.log(address);
	
	var type_and_value = Common.get_resource_type(address);

	console.log(type_and_value);

	var type = type_and_value[0];
	var value = type_and_value[1];

	if(type===null){
		alert("INVALID TYPE");
		return;
	}

	browser.view = new LoadingView();
	browser.view_container.empty().append(browser.view.element);

	var request = {
		"function" : "get",
		"parameters" : {
			"addresses" : [
				address
			]
		}
	};

	ajax_request(request,function(err, response){
		console.log(err);

		var object = response.objects[0];
		console.log(object);
		if(type==='id'){
			console.log("ID");
		} else if(type==='path'){
			var path = value;

			if(path.is_folder){
				console.log("FOLDER!");
				browser.view = new FolderView(
			    	path,
			    	object,
				    browser
			    );
			} else {
				console.log("ITEM!");
				browser.view = new ItemView(
			    	path,
			    	object,
				    browser
			    );
			}
		} else if(type==='rule'){
			console.log("RULE!");
			browser.view = new RuleView(
		    	address,
		    	object,
			    browser
		    );
		}
		browser.view_container.empty().append(browser.view.element);

	})
}

Browser.prototype.load_address = function(address){
	var browser = this;

	//Loading a path without using the history buttons
	
	browser.historyIndex++;
	var forwardIndex = browser.historyIndex;
	while(browser.history[forwardIndex]!=undefined){
		delete browser.history[forwardIndex];
		forwardIndex++;
	}
	browser.history[browser.historyIndex] = address;

	browser.forceLoadAddress(address);
}

Browser.prototype.finishedLoading = function(){
	var browser = this;
	browser.loadingIndicator.hide()
}

Browser.prototype.forward = function(){
	var browser = this;

	
}

Browser.prototype.back = function(){
	var browser = this;

	
}


Browser.prototype.iconCapacity = function(element,verticalPadding){
	var browser = this;

	var element = browser.capacityElement;
	var verticalPadding = browser.verticalPadding;

	var availableWidth = $(element).width();
	var availableHeight = $(element).height();
	
	availableHeight-=verticalPadding;
	availableWidth-=20;
	
	// if(listoricon=="list"){
	// 	var capacity = Math.floor(availableHeight/35.0);
	// 	if(capacity>3){
	// 		return capacity;
	// 	}
	// 	return 3;
	// } else {	
		var row = Math.floor(availableWidth/71.0);
		var column = Math.floor(availableHeight/79.0);
		if(column<1){
			column = 1;
		}
		var capacity = row*column;
		if(capacity>3){
			return capacity;
		}
		return 3;
	// }
}