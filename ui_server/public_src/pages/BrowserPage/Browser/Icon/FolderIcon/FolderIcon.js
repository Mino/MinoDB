extend(FolderIcon, Icon);

function FolderIcon(data, view){
	var icon = this;

	FolderIcon.superConstructor.call(this, data, view);

	icon.element.addClass("folder_icon");
	icon.holder.addClass("fa fa-folder");
}