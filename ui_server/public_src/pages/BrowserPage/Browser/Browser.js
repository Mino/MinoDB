@import("AddressBar/AddressBar.js");
@import("Icon/Icon.js");
@import("Views/Views.js");

@import("TypeCache.js");
@import("MainBrowser/MainBrowser.js");
@import("Toolbar/Toolbar.js");
@import("TypeSelector/TypeSelector.js");

function Browser(parent){
	var browser = this;

	browser.parent = parent;

	browser.history = {};
	browser.historyIndex = -1;

	browser.type_cache = new TypeCache();

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

	if(browser.view){
		browser.view.resize(resize_obj);
	}
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

Browser.prototype.load = function(address, options){
	var browser = this;

	options = options || {};

	console.log(address, options);
	
	var type_and_value = Common.get_resource_type(address);

	console.log(type_and_value);

	var type = type_and_value[0];
	var value = type_and_value[1];

	if(type===null){
		alert("INVALID TYPE");
		return;
	}

	if(browser.view){
		browser.view.remove();
	}

	if(options['types']!==undefined){
		browser.view = new TypeSearchView(browser);
		browser.view_container.empty().append(browser.view.element);
		browser.view.init();
		browser.view.resize(Site.resize_obj);
		return;
	}

	if(options['new_type']!==undefined){
		browser.view = new TypeView(
	    	"",
	    	{},
		    browser,
		    {
		    	create: true
		    }
	    );
		browser.view_container.empty().append(browser.view.element);
		browser.view.init();
		browser.view.resize(Site.resize_obj);
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

	api_request(request,function(err, response){
		console.log(err);

		browser.view.remove();//Will be the LoadingView

		var object = response.objects[0];
		console.log(object);
		if(type==='id'){
			console.log("ID");
			alert("Unhandled ID lookup")
		} else if(type==='path'){
			var path = value;

			if(path.is_folder){
				if(options["new_item"]!==undefined){
					browser.view = new ItemView(
				    	path,
				    	{},
					    browser,
					    {
					    	create: true
					    }
				    );
				} else {
					browser.view = new FolderView(
				    	path,
				    	object,
					    browser
				    );
				}
			} else {
				browser.view = new ItemView(
			    	path,
			    	object,
				    browser
			    );
			}
		} else if(type==='type'){
			browser.view = new TypeView(
		    	address,
		    	object,
			    browser
		    );
		}

		browser.view_container.empty().append(browser.view.element);

		//Appended to the DOM
		browser.view.init();
		browser.view.resize(Site.resize_obj);

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

	browser.load(address);
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