function Icon(data, view){
	var icon = this;

	icon.name = data.name;
	icon.full_path = data.full_path;
	
	icon.data = data;
	icon.view = view;

	icon.selected = false;

	icon.element = $("<a />").attr({
		"href" : icon.get_address()
	}).ajax_url(function(event){
		if(view.select_mode){
			event.preventDefault();
			icon.select_toggle();
		}
	}).addClass("icon").append(
		icon.holder = $("<div />").addClass("holder")
	,
		icon.text = $("<div />").addClass("text").text(data.name)
	)
}

Icon.prototype.get_address = function(){
	var icon = this;

	return Site.path + "browser/"+encode_path(icon.data.full_path)
}

Icon.prototype.select = function(){
	var icon = this;

	icon.selected = true;
	icon.element.addClass("selected");
	icon.view.add_selected(icon);
}

Icon.prototype.deselect = function(remove_from_view){
	var icon = this;

	icon.selected = false;
	icon.element.removeClass("selected");

	if((typeof remove_from_view)==='boolean' && remove_from_view!==false){
		icon.view.remove_selected(icon);
	}
}

Icon.prototype.select_toggle = function(){
	var icon = this;

	if(icon.selected){
		icon.deselect();
	} else {
		icon.select();
	}
}

@import("FolderIcon/FolderIcon.js");
@import("ItemIcon/ItemIcon.js");
@import("TypeIcon/TypeIcon.js");