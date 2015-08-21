function ObjectsView(browser, options){
	var objects_view = this;

	objects_view.browser = browser;

    objects_view.pagination_controller = new PaginationController(objects_view);

    objects_view.select_mode = false;
    objects_view.selected = [];

	objects_view.element = $("<div />").addClass("objects_view").append(
		objects_view.contents = $("<div />").addClass("contents")
	,
		objects_view.pagination_controller.element
	)

	browser.view_container.empty().append(objects_view.element);

	browser.toolbar.element.empty();

	objects_view.no_result_text = "No results...";
}

ObjectsView.prototype.init = function(){
	var objects_view = this;
}

ObjectsView.prototype.remove = function(){
	var objects_view = this;
}

ObjectsView.prototype.start_load = function(){
	var objects_view = this;

	objects_view.contents.empty();

	objects_view.contents.addClass("loading");
	objects_view.pagination_controller.hide();
}

ObjectsView.prototype.finish_load = function(){
	var objects_view = this;

	objects_view.contents.removeClass("loading");
}

ObjectsView.prototype.show_error = function(error){
	var objects_view = this;

	objects_view.finish_load();

	objects_view.contents.append(
		$("<div />").addClass("empty_folder").append(
			$("<div />").addClass("fa_icon fa fa-warning"),
			$("<div />").text(error.error_message)
		)
	)
	objects_view.pagination_controller.hide();
}

ObjectsView.prototype.populate = function(options, data){
	var objects_view = this;

	objects_view.finish_load();

	var objects = data.objects;

	if(objects.length===0){
		objects_view.contents.append(
			$("<div />").addClass("empty_folder").append(
				$("<div />").addClass("fa_icon fa fa-warning"),
				$("<div />").text(objects_view.no_result_text)
			)
		)
		objects_view.pagination_controller.hide();
	} else {
		objects_view.pagination_controller.show();
	}

	for(var i = 0; i < objects.length; i++){
		var object = objects[i];
		var icon;
		if(object.folder){
			icon = new FolderIcon(object,objects_view);
		} else {
			icon = new ItemIcon(object, objects_view);
		}
		objects_view.contents.append(icon.element);
	}

	objects_view.pagination_controller.populate(data);
}