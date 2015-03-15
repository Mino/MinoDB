@import ("TypeField/TypeField.js")

function TypeView(name, data, browser, options){
	var type_view = this;

	type_view.name = name;
	type_view.browser = browser;
	type_view.options = options || {};

	type_view.element = $("<div />").addClass("type_view");

	type_view.toolbar_element = $("<div />").append(
		type_view.edit_button = $("<button />").addClass("mino_button").text("Edit").on('tap',function(){
			type_view.edit_press();
		}).hide(),
		type_view.save_button = $("<button />").addClass("mino_button").text("Save").on('tap',function(){
			type_view.save_press();
		}).hide(),
		type_view.cancel_button = $("<button />").addClass("mino_button").text("Cancel").on('tap',function(){
			type_view.cancel_press();
		}).hide(),
		type_view.delete_button = $("<button />").addClass("mino_button").text("Delete").on('tap',function(){
			type_view.delete_press();
		})
	)
	type_view.edit_button.show();

	type_view.browser.toolbar.element.empty();
	type_view.browser.toolbar.element.append(type_view.toolbar_element);

	type_view.populate(data);
}

TypeView.prototype.populate = function(data){
	var type_view = this;

	type_view.type_data = data;
	console.log("type_view.type_data",type_view.type_data);
	type_view.base_data = JSON.parse(JSON.stringify(type_view.type_data));

	type_view.browser.address_bar.populate_path_buttons(type_view.name);

	type_view.type_field = new TypeField(type_view.type_data, type_view);
	type_view.element.empty().append(
		type_view.type_field.element
	)

	if(type_view.options.create){
		type_view.enable();
	} else {
		type_view.disable();
	}

}

TypeView.prototype.delete_press = function(){
	var type_view = this;

	var modal = new Modal({
		title: "Delete Type?"
	});

	modal.bottom_bar.append(
		$("<button />").addClass("mino_button").text("Delete").on('tap',function(event){
			type_view.perform_delete(function(err, res){
				SAFE.load_url(SAFE.path+"?types", true);
				modal.close();
			})
		})
	)
}

TypeView.prototype.perform_delete = function(callback){
	var type_view = this;

	api_request({
		"function" : "delete_type",
		"parameters" : {
			"type_name" : type_view.type_data.name
		}
	},function(err, response){
		console.log("err ",err);
		console.log("response ",response);

		callback(err, response);
	})
}

TypeView.prototype.edit_press = function(){
	var type_view = this;

	type_view.enable();
}

TypeView.prototype.enable = function(){
	var type_view = this;

	type_view.type_field.enable();

	type_view.edit_button.hide();
	type_view.cancel_button.show();
	type_view.save_button.show();

	type_view.resize();
}

TypeView.prototype.disable = function(){
	var type_view = this;

	type_view.type_field.disable();

	type_view.edit_button.show();
	type_view.cancel_button.hide();
	type_view.save_button.hide();

	type_view.resize();
}

TypeView.prototype.val = function(){
	var type_view = this;

	var value = type_view.type_field.val();

	return value;
}

TypeView.prototype.error = function(error_data){
	var type_view = this;

	console.log("error_data ",error_data);

	type_view.type_field.error(error_data);
}

TypeView.prototype.init = function(){
	var type_view = this;
	type_view.type_field.init();

	if(type_view.options.create){
		type_view.type_field.form.fields.name.focus();
	}
}

TypeView.prototype.remove = function(){
	var type_view = this;
	type_view.type_field.remove();
}

TypeView.prototype.save_press = function(){
	var type_view = this;

	var value = type_view.val();

	console.log(value);

	api_request({
		"function" : "save_type",
		"parameters" : {
			"type" : value
		}
	},function(err, response){
		console.log("err ",err);
		console.log("response ",response);

		if(response.error!==undefined){
			type_view.error(response.invalid.parameters.invalid.type);
		} else {
			type_view.name = value.name;
			type_view.populate(value);

			if(type_view.options.create){
				type_view.options.create = false;
				type_view.browser.load_address(type_view.name);
			}
		}
	})
}


TypeView.prototype.cancel_press = function(){
	var type_view = this;

	if(type_view.options.create){
		type_view.browser.load_address("",{types:""});
		return;
	}

	type_view.populate(type_view.base_data);
}

TypeView.prototype.resize = function(resize_obj){
	var type_view = this;

	resize_obj = resize_obj || Site.resize_obj;

	type_view.type_field.form.element.toggleClass("rows", resize_obj.window_width>700)
}