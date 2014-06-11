@import("AddressBar/AddressBar.js");
@import("Views/Views.js");

@import("MainBrowser/MainBrowser.js");

function Browser(){
	var browser = this;

	browser.history = {};
	browser.historyIndex = -1;

	browser.address_bar = new AddressBar();

    for(var i = 0; i<5; i++){
        var path_button = new PathButton("Path "+i, "/Test/Path "+i, 0, null);
        browser.address_bar.pathButtons.append(
            path_button.element
        )
    }

	browser.latestRequest = null;

	browser.container = $("<div />");
	browser.element = $("<div />")
	.addClass("browser")
	.data("object",browser)
	.append(
		browser.address_bar.element
	)
	.appendTo(browser.container);

	var path = new Path("/TestUser/Subfolder//Item");

	console.log(path);

    browser.view = new FolderView(browser, path);
    browser.element.append(browser.view.element);
	
	// browser.loadingIndicator = new LoadingIndicator();
	// browser.loadingIndicator.cancel_press = function(){
	// 	browser.cancelLoading();
	// }
	// browser.loadingIndicator.element.appendTo(browser.container);

	browser.capacityElement = window;
	browser.verticalPadding = 180;
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

Browser.prototype.makeRequest = function(request,callback,hide,canCancel){
	var browser = this;

	if(hide==undefined){
		hide = true;
	}
	if(canCancel==undefined){
		canCancel = true;
	}

	var apiAddress = ajaxAddress;
	if(browser.apiAddress!=undefined){
		apiAddress = browser.apiAddress;
	}

	var postName = 'json';
	if(browser.postName!=undefined){
		postName = browser.postName;
	}

	var postData = {};
	postData[postName] = JSON.stringify(request);

	var thisRequest = $.ajax({
		type: 'POST',
		url: apiAddress,
		data: postData,
		cache: false,
		success: function(returnedData) {
			var returnedJSON=null;
			try{
				returnedJSON=JSON.parse(returnedData);
			} catch(e){
				alert(JSON.stringify(returnedData));
			}
			
			if(doLogging){
				console.log(returnedJSON);
			}
			
			if(browser.latestRequest==thisRequest){
				browser.finishedLoading();
				browser.currentRequest = request;
				browser.currentResponse = returnedJSON;
				browser.latestRequest = null;

				if(returnedJSON['Error Number']==124){
					signedOut();
				} else {
					callback(returnedJSON);
				}
			}
		},
		error: function(){
			if(browser.latestRequest == thisRequest){
				browser.element.html("Error").show();
			}
		}
	});
	browser.latestRequest = thisRequest;
	
	setTimeout(function(){
		if(browser.latestRequest == thisRequest){
			browser.loading(hide,canCancel);
		}
	},loadIndicatorDelay);
}

Browser.prototype.setAddress = function(address){
	var browser = this;

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

Browser.prototype.loadAddress = function(address){
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
	
Browser.prototype.forceLoadAddress = function(address){
	var browser = this;

	var start = 0;
	
	if(address.substring(0,6)=="Start:"){
		var param = address.substring(6);
		
		var ampindex = param.indexOf("&");
		
		var start = parseInt(param.substring(0,ampindex));
		address = param.substring(ampindex+1);
	}
	
	if(address.substring(0,7)=="Search:"){
		var param = address.substring(7);
		
		searchPane.search = JSON.parse(param);
		searchPane.performSearch();

		return;	
	}
	
	if(address.charCodeAt(0)>48 && address.charCodeAt(0)<58){//ID (CHAR IS BETWEEN 0 and 9
		
		var request = {
			"Function" : "Get",
			"Parameters" : {
				"Addresses" : [address]
			}
		};
				
		browser.makeRequest(request,function(returnedJSON){
			var itemView = new ItemView(request, returnedJSON, false, browser);
			itemView.element.appendTo(browser.element);
			itemView.updateView();
		});
		return;
	} else if(address.charCodeAt(0)==47){// FORWARD SLASH
		if(address.charCodeAt(address.length-1)==47){
		
			var request = {
				'Function' : 'Search',
				'Parameters' : {
					'Path' : address,
					'Include Subfolders' : false,
					'Starting Index' : start,
					'Sort By' : 'Name',
					'Sort Order' : "Ascending",
					'Result Size' : browser.iconCapacity()
				}
			};
			
			browser.makeRequest(request,function(returnedJSON){
				var folderView = new FolderView(request,returnedJSON,browser);
				folderView.element.appendTo(browser.element);
			});
			return;
			
		} else {
		
			var request = {
				"Function" : "Get",
				"Parameters" : {
					"Addresses" : [address]
				}
			};
					
			browser.makeRequest(request,function(returnedJSON){
				var itemView = new ItemView(request, returnedJSON, false, browser);
				itemView.element.appendTo(browser.element);
				itemView.updateView();
			});
			return;
			
		}
	} else if(isTypeVersionNameStructure(address)){
		loadDisplayType(address,browser,function(typeObj){
			console.log(typeObj);
			var typeView = new TypeView(typeObj, false, browser);
			typeView.element.appendTo(browser.element);
			typeView.updateView();
		});
		return;
	}

	browser.hideElements();
	browser.element.empty().show();
	browser.loadingIndicator.hide();

	$(browser.element).append(
		$("<div />")
		.addClass("largeWarning")
		.addClass("error")
		.text("Invalid format for an address.")
	);
}

Browser.prototype.finishedLoading = function(){
	var browser = this;
	browser.loadingIndicator.hide()
}

Browser.prototype.cancelLoading = function(){
	var browser = this;
	browser.latestRequest = null;
	browser.element.show();	
	browser.loadingIndicator.hide();

	browser.onRestore();
}

Browser.prototype.loading = function(hide, canCancel){
	var browser = this;

	browser.loadingIndicator.show();

		if(canCancel==true){
			$(browser.loadingIndicator).css("width","160px").css("margin-left","-80px");
			$(browser.loadingIndicator).children("button").show();
		} else {
			$(browser.loadingIndicator).css("width","100px").css("margin-left","-50px");
			$(browser.loadingIndicator).children("button").hide();	
		}
		if(hide==true){
			browser.hideElements();
		}
}

Browser.prototype.hideElements = function(){
	var browser = this;
	browser.element.hide();
}

Browser.prototype.forward = function(){
	var browser = this;

	
}

Browser.prototype.back = function(){
	var browser = this;

	
}





function isFolderPath(address){
	return address.charAt(address.length-1)=="/";
}

Browser.prototype.iconCapacity = function(element,verticalPadding){
	var browser = this;

	var element = browser.capacityElement;
	var verticalPadding = browser.verticalPadding;

	var availableWidth = $(element).width();
	var availableHeight = $(element).height();
	
	availableHeight-=verticalPadding;
	availableWidth-=20;
	
	if(listoricon=="list"){
		var capacity = Math.floor(availableHeight/35.0);
		if(capacity>3){
			return capacity;
		}
		return 3;
	} else {	
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
	}
}