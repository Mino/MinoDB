var mino_path = "{{&mino_path}}";

$(document).ready(function(){
	$("<div />").prependTo('body').css({
		"height": "40px",
		"width": "100%",
		"background-color": "purple"
	}).append(
		$("<a />",{
			"href": mino_path+"admin/"
		}).append($("<button/>").text("Admin"))
	,
		$("<a />",{
			"href": mino_path+"browser/"
		}).append($("<button/>").text("Browser"))
	,
		$("<a />",{
			"href": mino_path+"sign_out/"
		}).append($("<button/>").text("Sign out"))
	);
})