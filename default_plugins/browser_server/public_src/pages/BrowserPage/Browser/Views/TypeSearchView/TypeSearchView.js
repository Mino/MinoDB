extend(TypeSearchView, ObjectsView);
function TypeSearchView(browser, options){
	var tsv = this;

	TypeSearchView.superConstructor.call(this, browser);

	tsv.options = options || {};

	tsv.element.addClass("type_search_view")

	browser.toolbar.element.empty().append(
		tsv.toolbar_element = $("<div />").append(
			tsv.create_item_button = $("<button />").addClass("mino_button").text("Type+").on('tap',function(){
				tsv.create_type();
			})
		)
	)
	
	browser.address_bar.populate_special_path_button("Types","?types","");

	tsv.load(tsv.options);
}

TypeSearchView.prototype.link_with_skip_and_limit = function(skip, limit){
	var tsv = this;

	var options = {
		"types":""
	};
	if(skip!==undefined){
		options.skip = skip;
	}
	if(limit!==undefined){
		options.limit = limit;
	}

	var link_address = Site.path+SAFE.build_query_string(options);

	return [link_address, function(e){
		if(!e.originalEvent.metaKey && SAFE.history_state_supported){
			e.preventDefault();
			SAFE.add_history_state(link_address);
			tsv.load(options);
		}
	}]
}

TypeSearchView.prototype.create_type = function(){
	var tsv = this;

	tsv.browser.load_address("",{new_type:""});
}

TypeSearchView.prototype.load = function(options){
	var tsv = this;

	tsv.start_load();

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

	tsv.finish_load();

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