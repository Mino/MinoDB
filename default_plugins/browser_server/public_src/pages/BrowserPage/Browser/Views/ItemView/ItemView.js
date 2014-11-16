@import("ItemSection/ItemSection.js");

var object_keys = [
	"_id",
	"name",
	"path",
	"full_path",
	"version",
	"folder"
];

function is_object_key(key){
	for(var i = 0; i < object_keys.length; i++){
		if(key === object_keys[i]){
			return true;
		}
	}
	return false;
}

function ItemView(path, data, browser, options){
	var item_view = this;

	item_view.path = path;
	item_view.browser = browser;
	item_view.options = options || {};

	item_view.element = $("<div />").addClass("item_view");

	item_view.toolbar_type_selector = new TypeSelector(function(type_name){
		if(item_view.sections[type_name]){
			//Already exists
			return;
		}
		var section = new ItemSection(type_name, null, item_view);
		item_view.sections[type_name] = section;
		section.enable();
	})

	item_view.toolbar_element = $("<div />").append(
		item_view.edit_button = $("<button />").addClass("mino_button").text("Edit").on('tap',function(){
			item_view.edit();
		}).hide(),
		item_view.save_button = $("<button />").addClass("mino_button").text("Save").on('tap',function(){
			item_view.save();
		}).hide(),
		item_view.cancel_button = $("<button />").addClass("mino_button").text("Cancel").on('tap',function(){
			item_view.cancel();
		}).hide(),
		item_view.add_type_button = $("<button />").addClass("mino_button").text("Add Type").on('tap',function(){
			item_view.toolbar_type_selector.toggle();
		}).hide(),
		item_view.toolbar_type_selector.element.hide()
	)
	item_view.browser.toolbar.element.empty();
	item_view.browser.toolbar.element.append(item_view.toolbar_element);

	item_view.populate(data);
}

ItemView.prototype.populate = function(data){
	var item_view = this;

	item_view.item_data = data;
	item_view.base_data = JSON.parse(JSON.stringify(item_view.item_data));

	item_view.sections = {};

	item_view.browser.address_bar.populate_path_buttons(item_view.path);

	item_view.form = new FVForm();
	item_view.form.add_field("_id", new TextField("ID"));
	item_view.form.add_field("name", new TextField("Name"));
	item_view.form.fields.name.on_change(function(){
		item_view.update_full_path();
	})
	item_view.form.add_field("path", new TextField("Path"));
	item_view.form.fields.path.on_change(function(){
		item_view.update_full_path();
	})
	item_view.form.add_field("full_path", new TextField("Full Path"));
	item_view.form.on_submit(function(form_val){
		item_view.save();
	})
	item_view.element.empty().append(
		item_view.form.element
	)

	item_view.form.val(data);

	if(item_view.options.create){
		item_view.form.fields.path.val(item_view.path);
		item_view.enable();
	} else {
		item_view.disable();
	}

	for(var i in item_view.sections){
		item_view.remove_section(i);
	}

	for(var key in data){
		if(!is_object_key(key)){
			var section = new ItemSection(key, data[key], item_view);
			item_view.sections[key] = section;
		}
	}
}

ItemView.prototype.update_full_path = function(){
	var item_view = this;

	var name = item_view.form.fields.name.val();
	if(name===null){
		name = "";
	}

	item_view.form.fields.full_path.val(
		item_view.form.fields.path.val()+
		name
	)
}

ItemView.prototype.remove_section = function(name){
	var item_view = this;

	var section = item_view.sections[name];
	item_view.form.remove_field(name);
	if(section){
		delete item_view.sections[name];
	}
}

ItemView.prototype.init = function(){
	var item_view = this;

	item_view.form.init();

	if(item_view.options.create){
		item_view.form.fields.name.focus();
	}

	item_view.resize(Site.resize_obj);

	item_view.toolbar_type_selector.init();
}

ItemView.prototype.remove = function(){
	var item_view = this;
	item_view.form.remove();

	item_view.toolbar_type_selector.remove();
}

ItemView.prototype.edit = function(){
	var item_view = this;

	item_view.enable();
}

ItemView.prototype.enable = function(){
	var item_view = this;

	item_view.is_enable = true;

	item_view.edit_button.hide();
	item_view.cancel_button.show();
	item_view.save_button.show();
	item_view.add_type_button.show();

	item_view.form.enable();

	for(var i in item_view.sections){
		var section = item_view.sections[i];
		section.enable();
	}

	//Disable any fields that should always be disabled
	item_view.form.fields.full_path.disable();

	item_view.resize();
}

ItemView.prototype.disable = function(){
	var item_view = this;

	item_view.is_enable = false;
	
	item_view.cancel_button.hide();
	item_view.save_button.hide();
	item_view.add_type_button.hide();
	item_view.edit_button.show();

	item_view.error(null);

	item_view.form.disable();

	for(var i in item_view.sections){
		var section = item_view.sections[i];
		section.disable();
	}

	item_view.resize();
}

ItemView.prototype.val = function(){
	var item_view = this;

	var value = item_view.form.val();

	return value;
}

ItemView.prototype.error = function(error_data){
	var item_view = this;

	item_view.form.error(error_data);
}

ItemView.prototype.save = function(){
	var item_view = this;

	var value = item_view.val();
	item_view.error(null);

	api_request({
		"function" : "save",
		"parameters" : {
			"objects" : [
				value
			]
		}
	},function(err, response){

		if(response.error!==undefined){
			item_view.error(response.invalid.parameters.invalid.objects.invalid[0]);
		} else {

			if(item_view.options.create){
				item_view.options.create = false;
			}

			item_view.item_data = value;
			item_view.item_data._id = response.objects[0]._id;
			item_view.item_data.name = response.objects[0].name;
			item_view.item_data.full_path = response.objects[0].full_path;
			
			item_view.path = new Path();
			item_view.path.init(item_view.item_data.full_path)

			item_view.populate(item_view.item_data);
			item_view.init();

			item_view.base_data = JSON.parse(JSON.stringify(item_view.item_data));

			item_view.disable();
		}
	})

	// item_view.disable();

	// item_view.save_button.hide();
	// item_view.cancel_button.hide();
	// item_view.edit_button.show();
}


ItemView.prototype.cancel = function(){
	var item_view = this;

	if(item_view.options.create){
		item_view.browser.load_address(encode_path(item_view.path.toString()));
		return;
	}

	item_view.populate(item_view.base_data);
}

ItemView.prototype.resize = function(resize_obj){
	var item_view = this;

	resize_obj = resize_obj || Site.resize_obj;

	item_view.form.element.toggleClass("rows", resize_obj.window_width>700)
}