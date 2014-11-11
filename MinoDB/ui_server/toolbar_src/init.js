(function(window){

	@import("../../../bower_components/fieldval-ui/fieldval-ui.js");

	var mino_path = "{{&mino_path}}";
	var user = {{&user}};

	var toolbar_visible = false;
	var toolbar_element;

	window.show_toolbar = function(){
		if(!toolbar_visible){
			$(document).ready(function(){
				$("body").css({
					"margin-top":"40px"
				});

				var stylesheet = $("<link/>",{
					"rel":"stylesheet",
					"href":"{{&mino_path}}toolbar_style.css",
					"type":"text/css"
				}).appendTo("head");

				var choice_field = new ChoiceField("Apps", {
					"choices": [
						["admin","Admin"],
						["browser","Browser"]
					]
				})
				choice_field.add_option = function(choice_value, display_name, initial){
				    var field = this;

				    var option_element = $("<a />",{
				    	"href": "/mino/"+choice_value
				    }).addClass("fv_choice_option").on('tap',function(e){
				    	field.default_click(e, choice_value);
				    })
				    .data("value",choice_value)
				    .text(display_name)

				    field.finalize_option(option_element, choice_value, initial);
				}
				choice_field.select_option = function(value){
					var field = this;

					window.location = "/mino/"+value;
				}

				toolbar_element = $("<div />").addClass("mino_toolbar")
				.prependTo("body")
				.append(
					choice_field.element.addClass("apps_dropdown")
				// ,
				// 	$("<a />",{
				// 		"href": mino_path+"admin/"
				// 	}).append($("<button/>").text("Admin"))
				// ,
				// 	$("<a />",{
				// 		"href": mino_path+"browser/"
				// 	}).append($("<button/>").text("Browser"))
				,
					$("<a />",{
						"href": mino_path+"sign_out/"
					}).addClass("sign_out_button").append($("<button/>").text("Sign out"))
				);
			})
		}
	}

	window.hide_toolbar = function(){
		$("body").css({
			"margin-top":""
		});

		toolbar_visible = false;
		toolbar_element.remove();
	}

	if(user){
		window.show_toolbar();
	}

}).call(this, window);