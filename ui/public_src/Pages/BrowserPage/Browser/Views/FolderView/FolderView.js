@import("CreateFolderModal/CreateFolderModal.js");
@import("DeleteModal/DeleteModal.js");
@import("PaginationController/PaginationController.js");
@import("Icon/Icon.js");

function FolderView(path, data, browser){
	var folder_view = this;

	folder_view.browser = browser;
	folder_view.path = path;
	folder_view.item_data = data;

    folder_view.pagination_controller = new PaginationController(folder_view);
    folder_view.pagination_controller.hide();

    folder_view.select_mode = false;
    folder_view.selected = [];

	folder_view.element = $("<div />").addClass("folder_view").append(
		folder_view.contents = $("<div />").addClass("contents")
	,
		folder_view.pagination_controller.element
	)

	browser.view_container.empty().append(folder_view.element);

	browser.toolbar.element.empty().append(
		folder_view.toolbar_element = $("<div />").append(
			folder_view.select_button = $("<button />").addClass("mino_button").text("Select").on('tap',function(){
				folder_view.select_button_press();
			})
		,
			folder_view.cancel_button = $("<button />").addClass("mino_button").text("Cancel").on('tap',function(){
				folder_view.cancel_button_press();
			}).hide()
		,
			folder_view.delete_button = $("<button />").addClass("mino_button").text("Delete").on('tap',function(){
				folder_view.delete_button_press();
			}).hide()
		,
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

FolderView.prototype.add_selected = function(icon){
	var folder_view = this;
	folder_view.selected.push(icon);
}

FolderView.prototype.remove_selected = function(icon){
	var folder_view = this;

	for(var i = 0; i < folder_view.selected.length; i++){
		if(folder_view.selected[i] === icon){
			console.log(i);
			folder_view.selected.splice(i, 1);
			return;
		}
	}
	console.log(folder_view.selected);
}

FolderView.prototype.select_button_press = function(){
	var folder_view = this;

	folder_view.select_mode = true;

	folder_view.create_folder_button.hide();
	folder_view.create_item_button.hide();
	folder_view.select_button.hide();
	folder_view.cancel_button.show();
	folder_view.delete_button.show();
}

FolderView.prototype.delete_button_press = function(){
	var folder_view = this;

	var cfm = new DeleteModal(folder_view.selected, function(err, res){
		console.log(err, res);
	})

	folder_view.element.append(
		cfm.element
	)
}

FolderView.prototype.cancel_button_press = function(){
	var folder_view = this;

	folder_view.select_mode = false;

	folder_view.create_folder_button.show();
	folder_view.create_item_button.show();
	folder_view.select_button.show();
	folder_view.cancel_button.hide();
	folder_view.delete_button.hide();

	for(var i = 0; i < folder_view.selected.length; i++){
		var icon = folder_view.selected[i];
		icon.deselect(false);
	}

	folder_view.selected = [];
}

FolderView.prototype.create_folder = function(){
	var folder_view = this;

	var cfm = new CreateFolderModal(folder_view.path, function(err, res){
		console.log(err, res);
		if(res && res.full_path){
			folder_view.browser.load(res.full_path);
		}
	})

	folder_view.element.append(
		cfm.element
	)

	cfm.init();
}

FolderView.prototype.create_item = function(){
	var folder_view = this;

	folder_view.browser.load(folder_view.path.toString(),"new_item");
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

	if(objects.length===0){
		folder_view.contents.append(
			$("<div />").addClass("empty_folder").text("Empty folder")
		)
	}

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