function SearchView(browser){
	var sv = this;

	sv.browser = browser;

	sv.pagination_controller = new PaginationController(sv);

	sv.element = $("<div />").addClass("search_view").append(
		sv.search_form = $("<div />").addClass("search_form"),
		sv.results = $("<div />").addClass("search_results"),
		sv.pagination_controller.element
	);

	sv.form = new FVForm();
	var paths_field = new FVArrayField("Paths",{
		sortable: false
	});
	paths_field.new_field = function(){
		var tf = new FVTextField("Path")
		console.log(tf)
		return tf;
	}
	sv.form.add_field("paths",paths_field);
	sv.form.add_field("include_subfolders", new FVBooleanField("Include Subfolders"));
	sv.form.add_field("text_search",new FVTextField("Text Search"));
	sv.form.element.append(
		$("<button />").addClass("mino_button").text("Search")
	)
	sv.form.val({
		"paths": ["/"+user.username+"/"]
	});

	sv.form.on_submit(function(val){
		console.log(val);
		sv.do_search(val);
	});

	sv.search_form.append(sv.form.element);

	browser.toolbar.element.empty().append(
		sv.toolbar_element = $("<div />").append(
			
		)
	)
	
	browser.address_bar.populate_special_path_button("Search","?search","");

	sv.do_search(sv.form.val());
}

SearchView.prototype.init = function(){
	var sv = this;

}

SearchView.prototype.do_search = function(query){
	var sv = this;

	sv.results.empty();

	var this_request = sv.current_request = api_request({
		"function": "search",
		"parameters": query
	},function(err, res){
		if(this_request===sv.current_request){
			console.log(err,res);

			if(err){
				console.log("ERROR A");
				sv.form.error(FieldVal.get_error("parameters",err));
			} else {
				if(res.error){
					console.log("ERROR B");
					sv.form.error(FieldVal.get_error("parameters",res));
				} else {
					if(res.objects){
						sv.populate({},res);
					}
				}
			}
		}
	})
}

SearchView.prototype.populate = function(options, data){
	var sv = this;

	var objects = data.objects;

	if(objects.length===0){
		sv.results.append(
			$("<div />").addClass("empty_folder").append(
				$("<div />").addClass("fa_icon fa fa-warning"),
				$("<div />").text("No results...")
			)
		)
		sv.pagination_controller.hide();
	} else {
		sv.pagination_controller.show();
	}

	for(var i = 0; i < objects.length; i++){
		var object = objects[i];
		var icon;
		if(object.folder){
			icon = new FolderIcon(object,sv);
		} else {
			icon = new ItemIcon(object, sv);
		}
		sv.results.append(icon.element);
	}

	sv.pagination_controller.populate(data);
}

SearchView.prototype.remove = function(){
	var sv = this;

}

SearchView.prototype.resize = function(resize_obj){
	var sv = this;

	resize_obj = resize_obj || Site.resize_obj;

	sv.form.element.toggleClass("rows", resize_obj.window_width>700)
}