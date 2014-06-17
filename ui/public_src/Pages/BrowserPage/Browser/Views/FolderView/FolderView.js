function FolderView(browser, path){
	var folder_view = this;

	console.log(path);

	folder_view.browser = browser;
	folder_view.path = path;

	// folder_view.isSearch = folder_view.isSearchRequest();

	folder_view.displayedObjects = new Object();

	folder_view.selectModeEnabled = false;
	folder_view.selectedObjects = new Object();

	folder_view.element = $("<div />").addClass("folder_view")
	.data("object",folder_view);

	folder_view.objectsContainer = $("<div />")
	.appendTo(folder_view.element);

	browser.hideElements();
	browser.view_container.empty();
	browser.view_container.append(folder_view.element);
	
	folder_view.is_main_browser = browser instanceof MainBrowser;
	
	var thisFolderSectionDiv = null;
	var sharingPane = null;

	for(var i = 0; i<path.length; i++){
		
		var button_text = path.object_names[i];
		var button_address = path.sub_paths[i];

		var button_type = 1;

		if(i==0){
			button_type = 0;
		}

		var pathbutton = new PathButton(
			button_text,
			button_address,
			button_type,
			browser
		);

		browser.topNav.pathButtons.append(pathbutton.element);
	}

	var editPathButton = $("<div />")
	.addClass("pathbutton editAddressButtonFolder")
	.on('tap',function(){
		browser.topNav.editAddress()
	});

	// $("<button />").append(
	// 	$("<div />").append(createPenIcon().addClass("penIcon16"))
	// ).appendTo(editPathButton);
	// browser.topNav.pathButtons.append(editPathButton);
	
	var hasOtherObjects = false;

	// for (var i = 0; i < json['Objects'].length; i++){
	// 	var objectRepresentation = new MinoObjectRepresentation(json['Objects'][i],folder_view);
	// 	folder_view.displayedObjects[objectRepresentation.id] = objectRepresentation;
	// 	folder_view.objectsContainer.append(objectRepresentation.element);

	// 	var name = objectRepresentation.objectName;
	// 	if(name!="Apps" && name!="App Privileges" && name!="Type Privileges" && name!="Privileges"){
	// 		hasOtherObjects = true;
	// 	}
	// }

	// if(!folder_view.isSearch && folder_view.path=="/"+username+"/" && !loadedFirstHomeFolder){
	// 	loadedFirstHomeFolder = true;
			
	// 	if(!hasOtherObjects){
	// 		var alertModal = new AlertModal("Create some data");
	// 		alertModal.view.append(
	// 			$("<div />").css({
	// 				"padding" : "10px"
	// 			}).html("You don't have any data. If you're not already following it, try the <a href=\"http://minocloud.com/docs/?Quick Start Tutorial\">Quick Start Tutorial</a>.<br /><br />To prevent this notice from appearing, create a folder or item in your home folder.")
	// 		)
	// 	}
	// }

	folder_view.element
	.append(
		folder_view.resultSetPadding = $("<div />")
		.addClass("resultSetPadding")
	)
	.append(
		folder_view.pageControlsHolder = $("<div />")
		.addClass("pageControlsHolder")
		.hide()
		.append(
			$("<div />")
			.addClass("pageControls")
			.append(
				folder_view.previousPageButton = $("<button />")
				.addClass("mino_button previousPageButton left no_left no_top no_bottom")
				.css("float","left")
				.css("width","50px")
				.text("Prev.")
			)
			.append(
				folder_view.pageNumber = $("<div />")
				.addClass("pageNumber")
			)
			.append(
				folder_view.resultsStatus = $("<div />")
				.addClass("resultsStatus")
			)
			.append(
				folder_view.nextPageButton = $("<button />")
				.addClass("mino_button previousPageButton right no_right no_top no_bottom")
				.css("float","left")
				.css("width","50px")
				.text("Next")
			)
		)
	)

	folder_view.displayPageNumbers();
	
	browser.onRestore = function(){
		folder_view.onRestore()
	};

	folder_view.onRestore();
	
	// resize(true);
}

FolderView.prototype.updateView = function(){
	var folder_view = this;

	if(folder_view.noElementsWarning!=undefined){
		folder_view.noElementsWarning.remove();
		delete folder_view.noElementsWarning;
	}

	if(isEmptyObject(folder_view.displayedObjects)){
		if(folder_view.isSearch){
			folder_view.noElementsWarning = $("<div />")
			.addClass("largeWarning")
			.text("No results.")
			.prependTo(folder_view.element);
		} else {			
			folder_view.noElementsWarning = $("<div />")
			.addClass("largeWarning")
			.text("No objects in this folder.")
			.prependTo(folder_view.element);		
		}
	}
}

FolderView.prototype.isSearchRequest = function(){
	var folder_view = this;

	if(folder_view.request['Parameters']['Include Subfolders']==true){
		return true;
	}
	for(key in folder_view.request['Parameters']){
		if(isTypeVersionNameStructure(key)){
			return true;
		}
	}
	return false;
}

FolderView.prototype.cancelSelection = function(){
	var folder_view = this;
	var browser = folder_view.browser;

	for(i in folder_view.selectedObjects){
		var obj = folder_view.selectedObjects[i];
		folder_view.clickSelectable(obj,false);
	}
	folder_view.selectModeEnabled = false;

	// toolbar_menu.sharing_button.show();
	// toolbar_menu.select_button.show();
	// toolbar_menu.list_icons_button.show();
	// toolbar_menu.new_item_button.show();
	// toolbar_menu.new_folder_button.show();
	// toolbar_menu.cancel_button.hide();
	// toolbar_menu.move_button.hide();
	// toolbar_menu.delete_button.hide();
	// toolbar_menu.select_all_button.hide();
};

FolderView.prototype.onRestore = function(){
	var folder_view = this;
	var browser = folder_view.browser;
	
	// browser.onLoad("folder",folder_view.request);

	folder_view.pageControlsHolder.show();
	folder_view.displayPageNumbers();

	// if(folder_view.is_main_browser){
	// 	toolbar_menu.list_icons_button.show().on('tap',function() {
			
	// 		if(listoricon=="list"){
	// 			toolbar_menu.list_icons_button.text("List");
	// 			$.cookie('listoricon', "icon", {expires: 60*60*24*365, path: '/'});
	// 			listoricon = "icon";
	// 		} else {
	// 			toolbar_menu.list_icons_button.text("Icons");
	// 			$.cookie('listoricon', "list", {expires: 60*60*24*365, path: '/'});
	// 			listoricon = "list";
	// 		}

	// 		for(i in folder_view.displayedObjects){
	// 			var objectRep = folder_view.displayedObjects[i];
	// 			objectRep.drawIcon();
	// 		}
			
	//   		resize(false);
	// 	});
	
	// 	toolbar_menu.sharing_button.show().on('tap',function(){
		

	// 		var preventShareReason = null;
			
	// 		if(folder_view.path==('/'+username+"/")){
	// 			preventShareReason = "You cannot share your home folder.";
	// 		} else if(folder_view.path.startsWith("/"+username+"/Apps/") && !folder_view.path.startsWith("/"+username+"/Apps/"+username+"/")){
	// 			preventShareReason = "You cannot share any folder in your Apps folder.";
	// 		} else if(folder_view.path.startsWith("/"+username+"/App Privileges/")){
	// 			preventShareReason = "You cannot share any folder in your App Privileges folder.";
	// 		} else if(folder_view.path.startsWith("/"+username+"/Privileges/")){
	// 			preventShareReason = "You cannot share any folder in your Privileges folder.";
	// 		} else if(folder_view.path.startsWith("/"+username+"/Type Privileges/")){
	// 			preventShareReason = "You cannot share any folder in your Type Privileges folder.";
	// 		}
			
			
	// 		var doOwn = false;
	// 		if(folder_view.addressSplit.length>2){
	// 			if(folder_view.addressSplit[1]=="Apps" && folder_view.addressSplit[2]==username){
	// 				doOwn = true;
	// 			}
	// 		}
			
	// 		if(folder_view.addressSplit[0]==username){
	// 			doOwn = true;
	// 		}
			
	// 		if(!doOwn){
	// 			preventShareReason = "You do not own this folder.";
	// 		}
			
	// 		if(preventShareReason!=null){
	// 			var alertModal = new AlertModal("Unable to Share");
	// 			alertModal.view.append(
	// 				$("<div />")
	// 				.text(preventShareReason)
	// 				.css("padding","10px")
	// 			);
	// 			return;
	// 		}
			
		
	// 		var sharingModal = new SharingFolderModal(folder_view.path);
			
	// 	});
		
	// 	toolbar_menu.select_button.show().on('tap',function(){
	// 		folder_view.selectModeEnabled = true;
	// 		folder_view.selectedObjects = new Object();
	// 		folder_view.selectedFolders = new Object();
			
	// 		toolbar_menu.sharing_button.hide();
	// 		toolbar_menu.select_button.hide();
	// 		toolbar_menu.list_icons_button.hide();
	// 		toolbar_menu.new_item_button.hide();
	// 		toolbar_menu.new_folder_button.hide();
	// 		toolbar_menu.move_button.on('tap',function(){
				
	// 			var modalTable = null;
	// 			var pathField = null;
				
	// 			var modalWindow = new MoveModal(folder_view,folder_view.selectedObjects,folder_view.path);
					
	// 		});
	// 		toolbar_menu.delete_button.on('tap',function(){

	// 			var deleteModal = new DeleteModal();
			
	// 			deleteModal.okCallback = function(){
						
	// 				var deleteList = new Array();
	// 				var objectList = new Array();
					
	// 				for(selInd in folder_view.selectedObjects){
	// 					var selDiv = folder_view.selectedObjects[selInd];
	// 					deleteList.push(selDiv.id);
	// 					objectList.push(selDiv);
	// 				}
					
	// 				var request = {
	// 					"Function" : "Delete",
	// 					"Parameters" : {
	// 						"Delete" : deleteList
	// 					}
	// 				};
					
	// 				if(doLogging){
	// 					console.log(request);
	// 				}
					
	// 				folder_view.cancelSelection();

	// 				browser.makeRequest(
	// 					request,
	// 					function(returnedJSON){	
	// 						var failedReportDiv = $("<div />")
	// 						.css("padding","10px");
	// 						var hasFailures = false;
						
	// 						if(returnedJSON['Objects']!=undefined){
	// 							for(resInd in returnedJSON['Objects']){
	// 								var result = returnedJSON['Objects'][resInd];
	// 								if(result['Error']!=undefined){
	// 									hasFailures = true;
	// 									$(failedReportDiv)
	// 									.append(
	// 										$("<div />")
	// 										.append(
	// 											$("<span />")
	// 											.addClass("bold")
	// 											.text(objectList[resInd].object['Name']+" - ")
	// 										)
	// 										.append(
	// 											$("<span />")
	// 											.css("color","red")
	// 											.text(result['Error'])							
	// 										)
	// 									);
	// 								} else {
	// 									delete folder_view.displayedObjects[objectList[resInd].id];
	// 									objectList[resInd].element.remove();
	// 								}
	// 							}
	// 							folder_view.updateView();
	// 						}
							
	// 						if(returnedJSON['Error']!=undefined && returnedJSON['Invalid']['Delete']['Invalid']!=undefined){
	// 							var deleteErrors = returnedJSON['Invalid']['Delete']['Invalid'];
	// 							for(resInd in deleteErrors){
	// 								var result = deleteErrors[resInd];
	// 								if(result['Error']!=undefined){
	// 									hasFailures = true;
	// 									var errorString;
	// 									if(result['Invalid']['ID']!=undefined){
	// 										errorString = result['Invalid']['ID']['Error'];
	// 									} else if(result['Invalid']['Path']!=undefined){
	// 										errorString = result['Invalid']['Path']['Error']
	// 									} else {
	// 										errorString = "Unknown error occurred";
	// 									}
	// 									$(failedReportDiv)
	// 									.append(
	// 										$("<div />")
	// 										.append(
	// 											$("<span />")
	// 											.addClass("bold")
	// 											.text(objectList[resInd].object['Name']+" - ")
	// 										)
	// 										.append(
	// 											$("<span />")
	// 											.css("color","red")
	// 											.text(errorString)							
	// 										)
	// 									);
	// 								}
	// 							}
	// 						}
							
	// 						if(hasFailures==true){
	// 							var alertModal = new AlertModal("Deletion Failures");
	// 							alertModal.view.append(
	// 								failedReportDiv
	// 							);
	// 						}
	// 					},
	// 					false,
	// 					false
	// 				);
	// 			}										
	// 		});
	// 		toolbar_menu.select_all_button.show().on('tap',function(){
	// 			for(i in folder_view.displayedObjects){
	// 				var obj = folder_view.displayedObjects[i];
	// 				folder_view.clickSelectable(obj,true);
	// 			}
	// 		});
	// 		toolbar_menu.cancel_button.show().on('tap',function(){
	// 			folder_view.cancelSelection();
	// 		});
	// 	});
	// 	toolbar_menu.new_item_button.show().on('tap',function(){
			
	// 		var newItemFakeResponse = {
	// 			"Objects" : [
	// 				{
	// 					"Name" : "",
	// 					"Path" : folder_view.path,
	// 					"Full Path" : folder_view.path+"New item",
	// 					"Folder" : false,
	// 					"Version" : 1
	// 				}
	// 			]
	// 		};

	// 		var itemView = new ItemView({}, newItemFakeResponse, true, browser);
	// 		itemView.element.appendTo(browser.element);
	// 		itemView.updateView();

	// 	});
	// 	toolbar_menu.new_folder_button.show().on('tap',function(){
			
	// 		var newFolderModal = new NewFolderModal(folder_view.path);

	// 		newFolderModal.onSuccessCallback = function(newFolderInfo,name){
				
	// 			if(doLogging){
	// 				console.log(newFolderInfo);
	// 			}
				
	// 			var newObject = {
	// 				"ID" : newFolderInfo['Objects'][0]['ID'],
	// 				"Name" : name,
	// 				"Path" : folder_view.path,
	// 				"Full Path" : newFolderInfo['Objects'][0]['Full Path'],
	// 				"Folder" : true
	// 			};
		
	// 			var objectRepresentation = new MinoObjectRepresentation(
	// 				newObject,
	// 				folder_view
	// 			);
	// 			folder_view.displayedObjects[objectRepresentation.id] = objectRepresentation;
	// 			folder_view.objectsContainer.append(objectRepresentation.element);

	// 			folder_view.updateView();
				
	// 		};
			
	// 	});
	// }

	folder_view.updateView();
}


FolderView.prototype.displayPageNumbers = function(){
	var folder_view = this;

	if(folder_view.isError){
		return;
	}
	
	var request = folder_view.request;
	var response = folder_view.response;

	if(request==null || response==null){
		return;
	}
	
	var currentsize = response['Returned Amount'];
	var start = response['Starting Index'];
	var total = response['Total'];

	var othersize = folder_view.browser.iconCapacity();

	var before = Math.ceil(start/othersize);
	var current = before+1;
	var next = Math.ceil((total-(start+(currentsize)))/othersize);
	var totalpages = before+next+1;
	
	folder_view.pageNumber.text("Page "+current+" of "+totalpages);
	folder_view.resultsStatus.text("Showing "+(start+1)+"-"+(start+currentsize)+" of "+total);

	if(current==1 && totalpages==1){
		folder_view.pageControlsHolder.hide();
	}
	
	if(current==1){
		folder_view.previousPageButton.attr("disabled", "disabled");
	} else {
		folder_view.previousPageButton.removeAttr("disabled").on('tap',function() {
			if($(this).is(':disabled') == false){
				var newRequest = JSON.parse(JSON.stringify(request));
				var iconcap = othersize;
				var newStart = start-iconcap;
				if(newStart<0){
					newStart = 0;
				}
				newRequest['Parameters']['Starting Index'] = newStart;
				newRequest['Parameters']['Result Size'] = othersize;
				
				if(folder_view.isSearch){
					folder_view.browser.loadAddress("Search:"+JSON.stringify(newRequest['Parameters']));
				} else {
					folder_view.browser.loadAddress("Start:"+(newRequest['Parameters']['Starting Index'])+"&"+newRequest['Parameters']['Path']);
				}
			}
		});
	}
	
	if(current==totalpages){
		folder_view.nextPageButton.attr("disabled", "disabled");
	} else {
		folder_view.nextPageButton.removeAttr("disabled").on('tap',function() {
			if($(this).is(':disabled') == false){
				var newRequest = JSON.parse(JSON.stringify(request));
				newRequest['Parameters']['Starting Index'] = start+currentsize;
				newRequest['Parameters']['Result Size'] = othersize;
								
				
				
				if(folder_view.isSearch){
					folder_view.browser.loadAddress("Search:"+JSON.stringify(newRequest['Parameters']));
				} else {
					folder_view.browser.loadAddress("Start:"+(newRequest['Parameters']['Starting Index'])+"&"+newRequest['Parameters']['Path']);
				}
			}
		});
	}	
}

FolderView.prototype.clickSelectable = function(objectRep,forceSelect){
	var folder_view = this;

	if(forceSelect==undefined){
		forceSelect = null;
	}

	if(forceSelect==true || (folder_view.selectedObjects[objectRep.id]==undefined && forceSelect!=false)){
		folder_view.selectedObjects[objectRep.id] = objectRep;
		if(objectRep.isFolder){
			folder_view.selectedFolders[objectRep.id] = objectRep;
		}
		objectRep.select();
	} else {
		delete folder_view.selectedObjects[objectRep.id];
		if(objectRep.isFolder){
			delete folder_view.selectedFolders[objectRep.id];
		}
		objectRep.deselect();

	}

	var totalSelected = 0;
	var foldersSelected = 0;
	for(i in folder_view.selectedObjects){
		var thisObjectRep = folder_view.selectedObjects[i];
		if(thisObjectRep.isFolder){
			foldersSelected++;
		}
		totalSelected++;
	}
	
	// if(totalSelected==0){
	// 	toolbar_menu.delete_button.hide();
	// 	toolbar_menu.move_button.hide();
	// } else {
	// 	toolbar_menu.delete_button.show();
	// 	if(foldersSelected==0){
	// 		toolbar_menu.move_button.show();
	// 	} else {
	// 		toolbar_menu.move_button.hide();
	// 	}
	// }

}