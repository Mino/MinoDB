function TypeSelector(selection_callback){
	var ts = this;

	ts.selection_callback = selection_callback;

	ts.form = new FVForm();
	ts.query_field = new TextField("Search for a type...");
	ts.query_field.on_change(function(query){
		var error = FieldVal.use_checks(query, [
			BasicVal.string(false), 
			BasicVal.max_length(4)
		]);
		ts.query_field.error(error);
		console.log(error);
		if(query && !error){
			ts.do_search(query);
		}
	})
	ts.form.add_field("query", ts.query_field)

	ts.element = $("<div />").addClass("type_selector").append(
		$("<div />").addClass("title").text("Add a Type"),
		ts.form.element,
		ts.results = $("<div />").addClass("results"),
		$("<div />").addClass("bottom_arrow")
	)

	ts.visible = false;
	ts.can_close = true;

	ts.do_search();
}

TypeSelector.prototype.toggle = function(){
	var ts = this;

	if(ts.visible){
		ts.hide();
	} else {
		ts.show();
	}
}

TypeSelector.prototype.init = function(){
	var ts = this;

	$('html').on('tap.type_selector',function(event){
		console.log(ts.visible, ts.can_close);
		if(ts.visible && ts.can_close){
			if (!$(event.target).closest(ts.element).length){
				console.log("HIDING FROM TAP OFF");
				ts.hide();
			}
		}
	})
}

TypeSelector.prototype.remove = function(){
	var ts = this;

	console.log("removing");

	$('html').off('tap.type_selector')
}

TypeSelector.prototype.hide = function(){
	var ts = this;
	ts.element.hide();
	ts.visible = false;
}

TypeSelector.prototype.show = function(){
	var ts = this;
	ts.element.show();
	ts.visible = true;

	ts.can_close = false;
	setTimeout(function(){
		ts.can_close = true;
	},10);
}

TypeSelector.prototype.do_search = function(query){
	var ts = this;

	var this_request = ts.current_request = api_request({
		"function": "search",
		"parameters": {
			"paths": ["/Mino/types/"]
		}
	},function(err, res){
		if(this_request===ts.current_request){
			console.log(err,res);

			ts.results.empty();

			if(res.objects){
				for(var i = 0; i < res.objects.length; i++){
					(function(object){
						var type_data = object.mino_type;
						ts.results.append(
							$("<div />").addClass("result").text(object.name).on('tap',function(){
								ts.selection_made(object.name);
							})
						)
					}(res.objects[i]));
				}
			}
		}
	})
}

TypeSelector.prototype.selection_made = function(type_name){
	var ts = this;

	ts.selection_callback(type_name);

	ts.hide();
}