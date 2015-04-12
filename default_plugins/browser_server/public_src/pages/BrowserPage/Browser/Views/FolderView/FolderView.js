@import("CreateFolderModal/CreateFolderModal.js");
@import("DeleteModal/DeleteModal.js");

extend(FolderView, ObjectsView);
function FolderView(path, data, browser, options){
	var folder_view = this;

	FolderView.superConstructor.call(this, browser);

	folder_view.element.addClass("folder_view");

	folder_view.path = path;
	folder_view.folder_object_data = data;
	folder_view.options = options || {};

    folder_view.select_mode = false;
    folder_view.selected = [];

    folder_view.no_result_text = "Empty folder. Create some items..."

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
			folder_view.create_folder_button = $("<button />").addClass("mino_button").text("Folder+").on('tap',function(){
				folder_view.create_folder();
			})
		,
			folder_view.create_item_button = $("<button />").addClass("mino_button").text("Item+").on('tap',function(){
				folder_view.create_item();
			})
		)
	);
	
	browser.address_bar.populate_path_buttons(folder_view.path);

	folder_view.load(folder_view.options);
}

FolderView.prototype.add_selected = function(icon){
	var folder_view = this;
	folder_view.selected.push(icon);
}

FolderView.prototype.remove_selected = function(icon){
	var folder_view = this;

	var ind = folder_view.selected.indexOf(icon);
	if(ind!==-1){
		folder_view.selected.splice(ind, 1);
	}
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

	var dm = new DeleteModal(folder_view.selected, function(err, res){
		console.log(err, res);
		folder_view.browser.reload_current_address();
	})

	folder_view.element.append(
		dm.element
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
		icon.deselect(true);
	}

	folder_view.selected = [];
}

FolderView.prototype.create_folder = function(){
	var folder_view = this;

	var cfm = new CreateFolderModal(folder_view.path, function(err, res){
		console.log(err, res);
		if(res && res.full_path){
			folder_view.browser.load_address(encode_path(res.full_path));
		}
	})

	folder_view.element.append(
		cfm.element
	)

	cfm.init();
}

FolderView.prototype.create_item = function(){
	var folder_view = this;

	folder_view.browser.load_address(encode_path(folder_view.path.toString()),{new_item:""});
}

FolderView.prototype.link_with_skip_and_limit = function(skip, limit){
	var folder_view = this;

	var options = {};
	if(skip!==undefined){
		options.skip = skip;
	}
	if(limit!==undefined){
		options.limit = limit;
	}

	var link_address = Site.path+folder_view.path.toString()+SAFE.build_query_string(options);

	return [link_address, function(e){
		if(!e.originalEvent.metaKey && SAFE.history_state_supported){
			e.preventDefault();
			SAFE.add_history_state(link_address);
			folder_view.load(options);
		}
	}]
}

FolderView.prototype.load = function(options){
	var folder_view = this;

	folder_view.start_load();
	folder_view.selected = [];

	var limit = options.limit;
	if(limit===undefined){
		limit = 10;
	}

	var skip = options.skip;
	if(skip===undefined){
		skip = 0;
	}

	var request = {
		"function" : "search",
		"parameters" : {
			"paths" : [folder_view.path.toString()],
			"skip": parseInt(skip),
			"limit": parseInt(limit)
		}
	};
	
	api_request(request,function(err, response){
		console.log(err, response);
		folder_view.populate(options, response);
	});
}

FolderView.prototype.resize = function(resize_obj){
	var folder_view = this;

}