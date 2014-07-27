@import ("TypeField/TypeField.js")

function TypeView(name, data, browser){
	var type_view = this;

	type_view.browser = browser;
	type_view.name = name;
	type_view.type_data = data;

	type_view.element = $("<div />").addClass("type_view");

	type_view.type_field = new TypeField(name, type_view.type_data, type_view);

	type_view.element.append(
		type_view.type_field.element
	)

	type_view.is_edit_mode = false;
	type_view.view_mode();

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

	browser.view_container.empty();
	browser.view_container.append(type_view.element);

	browser.toolbar.element.empty();
	browser.toolbar.element.append(type_view.toolbar_element);
	
	// browser.address_bar.populate_path_buttons(type_view.path);
}

TypeView.prototype.edit = function(){
	var type_view = this;

	type_view.edit_mode();

	type_view.edit_button.hide();
	type_view.cancel_button.show();
	type_view.save_button.show();
}

TypeView.prototype.edit_mode = function(){
	var type_view = this;

	type_view.type_field.edit_mode();
}

TypeView.prototype.view_mode = function(){
	var type_view = this;

	type_view.type_field.view_mode();
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

TypeView.prototype.save = function(){
	var type_view = this;

	var value = type_view.val();

	console.log(value);

	ajax_request({
		"function" : "save",
		"parameters" : {
			"objects" : [
				value
			]
		}
	},function(err, response){
		console.log("err ",err);
		console.log("response ",response);

		if(response.error!==undefined){
			type_view.error(response.invalid.parameters.invalid.objects.invalid[0]);
		} else {
			alert("Success?");
		}
	})

	// type_view.view_mode();

	// type_view.save_button.hide();
	// type_view.cancel_button.hide();
	// type_view.edit_button.show();
}


TypeView.prototype.cancel = function(){
	var type_view = this;

	type_view.view_mode();

	type_view.cancel_button.hide();
	type_view.save_button.hide();
	type_view.edit_button.show();

	type_view.error(null);
}