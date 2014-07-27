@import ("RuleField/RuleField.js")

function RuleView(name, data, browser){
	var rule_view = this;

	rule_view.browser = browser;
	rule_view.name = name;
	rule_view.rule_data = data;

	rule_view.element = $("<div />").addClass("rule_view");

	rule_view.rule_field = new RuleField(name, rule_view.rule_data, rule_view);

	rule_view.element.append(
		rule_view.rule_field.element
	)

	rule_view.is_edit_mode = false;
	rule_view.view_mode();

	rule_view.toolbar_element = $("<div />").append(
		rule_view.edit_button = $("<button />").addClass("mino_button").text("Edit").on('tap',function(){
			rule_view.edit();
		}).hide(),
		rule_view.save_button = $("<button />").addClass("mino_button").text("Save").on('tap',function(){
			rule_view.save();
		}).hide(),
		rule_view.cancel_button = $("<button />").addClass("mino_button").text("Cancel").on('tap',function(){
			rule_view.cancel();
		}).hide()
	)

	rule_view.edit_button.show();

	browser.view_container.empty();
	browser.view_container.append(rule_view.element);

	browser.toolbar.element.empty();
	browser.toolbar.element.append(rule_view.toolbar_element);
	
	// browser.address_bar.populate_path_buttons(rule_view.path);
}

RuleView.prototype.edit = function(){
	var rule_view = this;

	rule_view.edit_mode();

	rule_view.edit_button.hide();
	rule_view.cancel_button.show();
	rule_view.save_button.show();
}

RuleView.prototype.edit_mode = function(){
	var rule_view = this;

	rule_view.rule_field.edit_mode();
}

RuleView.prototype.view_mode = function(){
	var rule_view = this;

	rule_view.rule_field.view_mode();
}

RuleView.prototype.val = function(){
	var rule_view = this;

	var value = rule_view.rule_field.val();

	return value;
}

RuleView.prototype.error = function(error_data){
	var rule_view = this;

	console.log("error_data ",error_data);

	rule_view.rule_field.error(error_data);
}

RuleView.prototype.save = function(){
	var rule_view = this;

	var value = rule_view.val();

	console.log(value);

	ajax_request({
		"function" : "save",
		"parameters" : {
			"objects" : [
				value
			]
		}
	},function(err, response){
		console.log("err ",err);
		console.log("response ",response);

		if(response.error!==undefined){
			rule_view.error(response.invalid.parameters.invalid.objects.invalid[0]);
		} else {
			alert("Success?");
		}
	})

	// rule_view.view_mode();

	// rule_view.save_button.hide();
	// rule_view.cancel_button.hide();
	// rule_view.edit_button.show();
}


RuleView.prototype.cancel = function(){
	var rule_view = this;

	rule_view.view_mode();

	rule_view.cancel_button.hide();
	rule_view.save_button.hide();
	rule_view.edit_button.show();

	rule_view.error(null);
}