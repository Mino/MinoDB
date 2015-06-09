(function(window){

	@import("../../../bower_components/fieldval-ui/fieldval-ui.js");

	var mino_path = "{{&mino_path}}";
	var user = {{&user}};

	var toolbar_visible = false;
	var toolbar_element;


	var DOMAIN_VALUE = {};

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

				var choice_field = new FVChoiceField("Apps", {
					"choices": [
						[DOMAIN_VALUE, "Domain"],
						["admin","Admin"],
						["browser","Browser"]
					]
				})
				choice_field.add_option = function(choice_value, display_name, initial){
				    var field = this;

				    var href;
				    if(choice_value===DOMAIN_VALUE){
				    	href = "/";
				    } else {
				    	href = "/mino/"+choice_value;
				    }

				    var option_element = $("<a />",{
				    	"href": href
				    }).addClass("fv_choice_option").on('tap',function(e){
				    	field.default_click(e, choice_value);
				    })
				    .data("value",choice_value)
				    .text(display_name)

				    field.finalize_option(option_element, choice_value, initial);
				}
				choice_field.select_option = function(choice_option){
					var field = this;
					var value = choice_option.get_value();
					if(value===DOMAIN_VALUE){
						window.location = "/";
					} else {
						window.location = "/mino/"+value;
					}
				}

				toolbar_element = $("<div />").addClass("mino_toolbar")
				.prependTo("body")
				.append(
					choice_field.element.addClass("apps_dropdown")
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