function TypeSearchView(browser, options){
	var tsv = this;

	tsv.browser = browser;

	console.log("TypeSearchView", options);

	tsv.options = options || {};

	tsv.pagination_controller = new PaginationController(tsv);

	tsv.element = $("<div />").addClass("type_search_view").append(
		tsv.contents = $("<div />")
		,
		tsv.pagination_controller.element
	);

	browser.toolbar.element.empty().append(
		tsv.toolbar_element = $("<div />").append(
			tsv.create_item_button = $("<button />").addClass("mino_button").text("Type+").on('tap',function(){
				tsv.create_type();
			})
		)
	)
	
	browser.address_bar.populate_special_path_button("Types","?types","");

	tsv.load({});
}

TypeSearchView.prototype.init = function(){
	var tsv = this;

}

TypeSearchView.prototype.link_with_skip_and_limit = function(skip, limit){
	var tsv = this;

	var query = {
		"types":""
	};
	if(skip!==undefined){
		query.skip = skip;
	}
	if(limit!==undefined){
		query.limit = limit;
	}

	return Site.path+SAFE.build_query_string(query);
}

TypeSearchView.prototype.create_type = function(){
	var tsv = this;

	tsv.browser.load_address("",{new_type:""});
}

TypeSearchView.prototype.load = function(options){
	var tsv = this;

	var limit = tsv.options.limit;
	if(limit===undefined){
		limit = 10;
	}

	var skip = tsv.options.skip;
	if(skip===undefined){
		skip = 0;
	}

	var request = {
		"function" : "search",
		"parameters" : {
			"paths": ["/" + Common.ROOT_USERNAME + "/types/"],
			"skip": parseInt(skip),
			"limit": parseInt(limit)
		}
	};

	tsv.pagination_controller.hide();
	
	api_request(request,function(err, response){
		console.log(err, response);
		tsv.populate(options, response);
	});
}

TypeSearchView.prototype.populate = function(options, data){
	var tsv = this;

	var objects = data.objects;

	if(objects.length===0){
		tsv.contents.append(
			$("<div />").addClass("empty_folder").append(
				$("<div />").addClass("fa_icon fa fa-warning"),
				$("<div />").text("No types found.")
			)
		)
		tsv.pagination_controller.hide();
	} else {
		tsv.pagination_controller.show();
	}

	for(var i = 0; i < objects.length; i++){
		var object = objects[i];
		var icon = new TypeIcon(object, tsv);
		tsv.contents.append(icon.element);
	}

	tsv.pagination_controller.populate(data);
}

TypeSearchView.prototype.remove = function(){
	var tsv = this;

}

TypeSearchView.prototype.resize = function(resize_obj){
	var tsv = this;

}