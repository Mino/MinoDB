function TypeSearchView(browser){
	var tsv = this;

	tsv.browser = browser;

	tsv.element = $("<div />").addClass("type_search_view").append(
		tsv.results = $("<div />")
	);

	browser.toolbar.element.empty().append(
		tsv.toolbar_element = $("<div />").append(
			tsv.create_item_button = $("<button />").addClass("mino_button").text("Type+").on('tap',function(){
				tsv.create_type();
			})
		)
	)
	
	browser.address_bar.populate_path_buttons("Types");

	tsv.do_search();
}

TypeSearchView.prototype.init = function(){
	var tsv = this;

}

TypeSearchView.prototype.create_type = function(){
	var tsv = this;

	tsv.browser.load_address("",{new_type:""});
}

TypeSearchView.prototype.do_search = function(){
	var tsv = this;

	var this_request = tsv.current_request = api_request({
		"function": "search",
		"parameters": {
			"paths": ["/Mino/types/"]
		}
	},function(err, res){
		if(this_request===tsv.current_request){
			console.log(err,res);

			tsv.results.empty();

			if(res.objects){
				for(var i = 0; i < res.objects.length; i++){
					(function(object){
						var type_data = object.mino_type;
						icon = new TypeIcon(object, tsv);
						tsv.results.append(
							icon.element
						)
					}(res.objects[i]));
				}
			}
		}
	})
}

TypeSearchView.prototype.remove = function(){
	var tsv = this;

}

TypeSearchView.prototype.resize = function(resize_obj){
	var tsv = this;

}