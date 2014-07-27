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


	folder_view.toolbar_element = $("<div />").append(
		
	)

	browser.view_container.empty();
	browser.view_container.append(folder_view.element);

	browser.toolbar.element.empty();
	browser.toolbar.element.append(folder_view.toolbar_element);
	
	browser.address_bar.populate_path_buttons(folder_view.path);

	folder_view.load({});
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
		var icon = new FolderIcon(objects[i],folder_view);
		folder_view.contents.append(icon.element);
	}
}