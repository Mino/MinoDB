extend(TypeIcon, Icon);

function TypeIcon(data, view){
	var icon = this;

	TypeIcon.superConstructor.call(this, data, view);

	icon.element.addClass("type_icon")
}

TypeIcon.prototype.get_address = function(){
	var icon = this;

	return Site.path + "browser/"+icon.data.name;
}