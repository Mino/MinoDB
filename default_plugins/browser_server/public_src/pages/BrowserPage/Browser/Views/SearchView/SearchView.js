extend(SearchView, ObjectsView);
function SearchView(browser, options){
	var sv = this;

	SearchView.superConstructor.call(this, browser);

	try{
		sv.query = JSON.parse(options.query);
	} catch (e){
		//failed to parse query
	}
}

SearchView.prototype.init = function(){
	var sv = this;

	sv.element.addClass("search_view").prepend(
		sv.search_form = $("<div />").addClass("search_form")
	);

	sv.form = new FVObjectField("Search",{use_form:true});
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
	
	var sort_field = new FVKeyValueField("Sort");
	sort_field.new_field = function() {
		return new FVChoiceField(null, {choices:[
			[-1,"Descending"],
			[1,"Ascending"]
		]});
	}
	sv.form.add_field("sort", sort_field);

	sv.form.element.append(
		sv.search_button = $("<button />").addClass("mino_button").text("Search")
	)

	sv.search_button.click(function(event){
		sv.form.submit();
	});

	if(!sv.query){
		sv.query = {
			"paths": ["/"+user.username+"/"]
		}
	}
	sv.form.val(sv.query);

	sv.form.on_submit(function(val){
		console.log(val);
		sv.do_search(val, true);
	});

	sv.browser.toolbar.element.empty().append(
		sv.toolbar_element = $("<div />").append(
			
		)
	);

	sv.browser.address_bar.populate_special_path_button("Search","?search","");

	sv.do_search(sv.query, false);

	sv.form.element.appendTo(sv.search_form);
}

SearchView.prototype.link_with_skip_and_limit = function(skip, limit){
	var sv = this;

	var link_obj = {
		"search":""
	};
	var link_query = JSON.parse(JSON.stringify(sv.query));
	if(skip!==undefined){
		link_query.skip = skip;
	}
	if(limit!==undefined){
		link_query.limit = limit;
	}
	link_obj.query = JSON.stringify(link_query);
	var link_address = Site.path+SAFE.build_query_string(link_obj);

	return [link_address, function(e){
		if(!e.originalEvent.metaKey && SAFE.history_state_supported){
			e.preventDefault();
			SAFE.add_history_state(link_address);
			sv.do_search(JSON.parse(link_obj.query), false);
		}
	}];
}

SearchView.prototype.do_search = function(query, add_state){
	var sv = this;

	sv.start_load();

	if(query.limit===undefined){
		query.limit = 10;
	}

	if(query.skip===undefined){
		query.skip = 0;
	}

	sv.query = query;

	if(add_state){
		var link_obj = {
			"search":"",
			"query": JSON.stringify(sv.query)
		};
		var link_address = Site.path+SAFE.build_query_string(link_obj);
		SAFE.add_history_state(link_address);
	}

	sv.form.clear_errors();

	var this_request = sv.current_request = api_request({
		"function": "search",
		"parameters": query
	},function(err, res){

		if(this_request===sv.current_request){
			console.log(err,res);

			sv.finish_load();

			if(err){
				sv.form.error(FieldVal.get_error("parameters",err));
			} else {

				if(res.error){
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

SearchView.prototype.resize = function(resize_obj){
	var sv = this;

	resize_obj = resize_obj || Site.resize_obj;

	sv.form.element.toggleClass("rows", resize_obj.window_width>700)
}