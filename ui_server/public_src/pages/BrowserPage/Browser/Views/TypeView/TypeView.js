@import ("TypeField/TypeField.js")

function TypeView(name, data, browser, options){
	var type_view = this;

	type_view.name = name;
	type_view.browser = browser;
	type_view.options = options || {};

	type_view.element = $("<div />").addClass("type_view");

	type_view.toolbar_element = $("<div />").append(
		type_view.edit_button = $("<button />").addClass("mino_button").text("Edit").on('tap',function(){
			type_view.edit();
		}).hide(),
		type_view.save_button = $("<button />").addClass("mino_button").text("Save").on('tap',function(){
			type_view.save();
		}).hide(),
		type_view.cancel_button = $("<button />").addClass("mino_button").text("Cancel").on('tap',function(){
			type_view.cancel();
		}).hide()
	)
	type_view.edit_button.show();

	type_view.browser.toolbar.element.empty();
	type_view.browser.toolbar.element.append(type_view.toolbar_element);

	type_view.populate(data);
}

TypeView.prototype.populate = function(data){
	var type_view = this;

	type_view.type_data = data;
	type_view.base_data = JSON.parse(JSON.stringify(type_view.type_data));

	type_view.browser.address_bar.populate_path_buttons(type_view.name);

	type_view.type_field = new TypeField(type_view.type_data, type_view);
	type_view.element.empty().append(
		type_view.type_field.element
	)

	if(type_view.options.create){
		type_view.edit_mode();
	} else {
		type_view.view_mode();
	}

}

TypeView.prototype.edit = function(){
	var type_view = this;

	type_view.edit_mode();
}

TypeView.prototype.edit_mode = function(){
	var type_view = this;

	type_view.type_field.edit_mode();

	type_view.edit_button.hide();
	type_view.cancel_button.show();
	type_view.save_button.show();

	type_view.resize();
}

TypeView.prototype.view_mode = function(){
	var type_view = this;

	type_view.type_field.view_mode();

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

TypeView.prototype.save = function(){
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
			if(type_view.options.create){
				type_view.options.create = false;
			}
			type_view.name = value.name;
			type_view.populate(value);
		}
	})
}


TypeView.prototype.cancel = function(){
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