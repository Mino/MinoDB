var TypeSelector_ID = 0;

function TypeSelector(selection_callback){
	var ts = this;

	ts.selection_callback = selection_callback;

	ts.id = TypeSelector_ID++;
	ts.form = new FVForm();
	ts.query_field = new FVTextField("Search for a type...");
	ts.query_field.on_change(function(query){
		var error = FieldVal.use_checks(query, [
			BasicVal.string(false), 
			BasicVal.max_length(4)
		]);
		ts.query_field.error(error);
		if(!error){
			ts.do_search(query);
		}
	})
	ts.form.add_field("query", ts.query_field)

	ts.element = $("<div />").addClass("type_selector").append(
		$("<div />").addClass("content_holder").append(
			$("<div />").addClass("title").text("Add a Type"),
			ts.form.element,
			ts.results = $("<div />").addClass("results"),
			$("<div />").addClass("bottom_arrow")
		)
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
		ts.reposition();
	}
}

TypeSelector.prototype.init = function(){
	var ts = this;

	$('html').on('click.type_selector.'+ts.id,function(event){
		if(ts.visible && ts.can_close){
			if (!$(event.target).closest(ts.element).length){
				ts.hide();
			}
		}
	})

	$(window).on('resize.type_selector.'+ts.id, function(){
		if(!jQuery.contains(document.documentElement, ts.element[0])){
			ts.remove();
		} else {
			ts.reposition();
		}
	})
}

TypeSelector.prototype.reposition = function(){
	var ts = this;

	var button = ts.element.prev();
	if(button){
		ts.element.css({
			"left": "0px"
		});
		var button_width = button.outerWidth();
		var diff = ts.element.offset().left - (button.offset().left + button.outerWidth());
		var offset = -(diff + button.outerWidth()/2);
		ts.element.css({
			"left": offset+"px"
		});
	}
}

TypeSelector.prototype.remove = function(){
	var ts = this;

	$(window).off('resize.type_selector.'+ts.id);
	$('html').off('tap.type_selector.'+ts.id);
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

	query = query || '';

	var this_request = ts.current_request = api_request({
		"function": "search",
		"parameters": {
			"paths": ["/Mino/types/"],
			"query": {
				"name": {
					"$regex": "^" + query + ".*"
				}
			}
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