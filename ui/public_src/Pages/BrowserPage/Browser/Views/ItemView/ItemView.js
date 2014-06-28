@import("ItemSection/ItemSection.js");


var object_keys = [
	"_id",
	"name",
	"path",
	"full_path"
];

function is_object_key(key){
	for(var i = 0; i < object_keys.length; i++){
		if(key === object_keys[i]){
			return true;
		}
	}
	return false;
}

function ItemView(path, data, browser){
	var item_view = this;

	item_view.browser = browser;
	item_view.path = path;
	item_view.item_data = data;

	item_view.element = $("<div />").addClass("item_view");

	item_view.core_form = new Form();
	item_view.core_form.add_field("_id", new TextField("ID"));
	item_view.core_form.add_field("name", new TextField("Name"));
	item_view.core_form.add_field("path", new TextField("Path"));
	item_view.core_form.add_field("full_path", new TextField("Full Path"));
	item_view.element.append(
		item_view.core_form.element
	)
	item_view.core_form.val(data);

	item_view.sections = [];

	for(var key in data){
		if(!is_object_key(key)){
			var section = new ItemSection(key, data[key], item_view);
			item_view.sections.push(section);
			item_view.element.append(
				section.element
			)
		}
	}

	item_view.is_edit_mode = false;
	item_view.view_mode();

	item_view.toolbar_element = $("<div />").append(
		item_view.edit_button = $("<button />").addClass("mino_button").text("Edit").on('tap',function(){
			item_view.edit();
		}).hide(),
		item_view.save_button = $("<button />").addClass("mino_button").text("Save").on('tap',function(){
			item_view.save();
		}).hide(),
		item_view.cancel_button = $("<button />").addClass("mino_button").text("Cancel").on('tap',function(){
			item_view.cancel();
		}).hide()
	)

	item_view.edit_button.show();

	browser.view_container.empty();
	browser.view_container.append(item_view.element);

	browser.toolbar.element.empty();
	browser.toolbar.element.append(item_view.toolbar_element);
	
	browser.address_bar.populate_path_buttons(item_view.path);
}

ItemView.prototype.edit = function(){
	var item_view = this;

	item_view.edit_mode();

	item_view.edit_button.hide();
	item_view.cancel_button.show();
	item_view.save_button.show();
}

ItemView.prototype.edit_mode = function(){
	var item_view = this;

	item_view.core_form.edit_mode();

	for(var i = 0; i < item_view.sections.length; i++){
		var section = item_view.sections[i];
		section.edit_mode();
	}
}

ItemView.prototype.view_mode = function(){
	var item_view = this;

	item_view.core_form.view_mode();

	for(var i = 0; i < item_view.sections.length; i++){
		var section = item_view.sections[i];
		section.view_mode();
	}
}

ItemView.prototype.save = function(){
	var item_view = this;

	var core = item_view.core_form.val();

	item_view.view_mode();

	item_view.save_button.hide();
	item_view.cancel_button.hide();
	item_view.edit_button.show();
}


ItemView.prototype.cancel = function(){
	var item_view = this;

	item_view.view_mode();

	item_view.cancel_button.hide();
	item_view.save_button.hide();
	item_view.edit_button.show();
}