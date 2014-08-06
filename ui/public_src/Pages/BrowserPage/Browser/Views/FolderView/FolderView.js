@import("CreateFolderModal/CreateFolderModal.js");
@import("PaginationController/PaginationController.js");
@import("Icon/Icon.js");

function FolderView(path, data, browser){
	var folder_view = this;

	folder_view.browser = browser;
	folder_view.path = path;
	folder_view.item_data = data;

	for(var i = 0; i<path.length; i++){
        var path_button = new PathButton(path.object_names[i], path.sub_paths[i], 0, null);
        browser.address_bar.path_buttons.append(
            path_button.element
        )
    }

    folder_view.pagination_controller = new PaginationController(folder_view);

	folder_view.element = $("<div />").addClass("folder_view").append(
		folder_view.contents = $("<div />").addClass("contents")
	,
		folder_view.pagination_controller.element
	)

	browser.view_container.empty().append(folder_view.element);

	browser.toolbar.element.empty().append(
		folder_view.toolbar_element = $("<div />").append(
			folder_view.create_folder_button = $("<button />").addClass("mino_button").text("Create Folder").on('tap',function(){
				folder_view.create_folder();
			})
		,
			folder_view.create_item_button = $("<button />").addClass("mino_button").text("Create Item").on('tap',function(){
				folder_view.create_item();
			})
		)
	);
	
	browser.address_bar.populate_path_buttons(folder_view.path);

	folder_view.load({});
}

FolderView.prototype.init = function(){
	var folder_view = this;
}

FolderView.prototype.remove = function(){
	var folder_view = this;
}

FolderView.prototype.create_folder = function(){
	var folder_view = this;

	var cfm = new CreateFolderModal(folder_view.path, function(err, res){
		console.log(err, res);
		alert("CREATED?")
	})

	folder_view.element.append(
		cfm.element
	)
}

FolderView.prototype.create_item = function(){
	var folder_view = this;

	folder_view.browser.load("/TestUser/test/","new_item");
}

FolderView.prototype.load = function(options){
	var folder_view = this;

	var request = {
		"function" : "search",
		"parameters" : {
			"paths" : [folder_view.path.toString()]
		}
	};

	ajax_request(request,function(err, response){
		console.log(err, response);
		folder_view.populate(options, response);
	});
}

FolderView.prototype.populate = function(options, data){
	var folder_view = this;

	var objects = data.objects;

	for(var i = 0; i < objects.length; i++){
		var object = objects[i];
		var icon;
		if(object.folder){
			icon = new FolderIcon(object,folder_view);
		} else {
			icon = new ItemIcon(object, folder_view);
		}
		folder_view.contents.append(icon.element);
	}
}