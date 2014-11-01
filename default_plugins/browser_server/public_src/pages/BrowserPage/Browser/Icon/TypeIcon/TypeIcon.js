extend(TypeIcon, Icon);

function TypeIcon(data, view){
	var icon = this;

	TypeIcon.superConstructor.call(this, data, view);

	icon.element.addClass("type_icon")
	icon.holder.addClass("fa fa-check");
}

TypeIcon.prototype.get_address = function(){
	var icon = this;

	return Site.path+icon.data.name;
}