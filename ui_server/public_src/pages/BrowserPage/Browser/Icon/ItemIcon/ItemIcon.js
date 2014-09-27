extend(ItemIcon, Icon);

function ItemIcon(data, view){
	var icon = this;

	ItemIcon.superConstructor.call(this, data, view);

	icon.element.addClass("item_icon")
}