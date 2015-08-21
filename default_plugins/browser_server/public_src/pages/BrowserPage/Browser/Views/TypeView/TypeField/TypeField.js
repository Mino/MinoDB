fieldval_ui_extend(TypeField, FVRuleEditor);

function TypeField(name, options){
	var tf = this;

	TypeField.superConstructor.call(this, name, options);

	tf.element.addClass("type_field").prepend(
		tf.title_div = $("<div />").addClass("title")
	)

	tf.fields.name.on_change(function() {
		tf.update_title_name();
	})

	tf.fields.display_name.on_change(function() {
		tf.update_title_name();
	})

    tf.update_title_name();
}

TypeField.prototype.update_title_name = function(){
	var tf = this;

	var title_name;
	var display_name_val = tf.fields.display_name.val();
	var name_val = tf.fields.name.val();
	if(display_name_val){
		title_name = "("+display_name_val+") "+name_val;
	} else {
		title_name = name_val || "";
	}

	tf.title_div.text(title_name);
}
