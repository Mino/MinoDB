function Icon(data, view){
	var icon = this;

	icon.data = data;
	icon.view = view;

	icon.element = $("<a />").attr({
		"href" : Site.path + "browser/"+data.full_path
	}).ajax_url().addClass("icon").append(
		icon.holder = $("<div />").addClass("holder")
	,
		icon.text = $("<div />").addClass("text").text(data.name)
	)
}

@import("FolderIcon/FolderIcon.js");