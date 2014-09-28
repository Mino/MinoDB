function TypeField(value, parent){
	var tf = this;

	tf.parent = parent;
	tf.value = value || {};

	tf.container = $("<div />").addClass("type_field").append(
		tf.title_div = $("<div />").addClass("title"),
		tf.contents = $("<div />").addClass("contents")
	)

	var field_type_choices = [];
	for(var i in ValidationRule.RuleField.types){
		var field_type_class = ValidationRule.RuleField.types[i];

		var name = i;
		var display_name = field_type_class.display_name;
		if(display_name){
			field_type_choices.push([name, display_name])
		} else {
			field_type_choices.push(name);
		}
	}

	tf.form = new FVForm();
	tf.form.add_field("name", new TextField("Name").on_change(function(){
		tf.update_title_name();
	}));
	tf.form.add_field("display_name", new TextField("Display Name").on_change(function(){
		tf.update_title_name();
	}));
	tf.form.add_field("type", new ChoiceField("Type", {
		choices: field_type_choices
	}).on_change(function(){
		tf.update_type_fields();
	}));
	tf.contents.append(
		tf.form.element
	)
	tf.form.val(value);

    tf.is_edit_mode = true;

    console.log(value);

    tf.base_fields = {};
    for(var name in tf.form.fields){
    	tf.base_fields[name] = true;
    }

    tf.update_title_name();
    tf.update_type_fields();
}

TypeField.prototype.init = function(){
	var tf = this;
	tf.form.init();
}

TypeField.prototype.remove = function(){
	var tf = this;
	tf.form.remove();
}

TypeField.prototype.update_title_name = function(){
	var tf = this;

	var title_name;
	var display_name_val = tf.form.fields.display_name.val();
	var name_val = tf.form.fields.name.val();
	if(display_name_val){
		title_name = "("+display_name_val+") "+name_val;
	} else {
		title_name = name_val || "";
	}

	tf.title_div.text(title_name);
}

TypeField.prototype.update_type_fields = function(){
	var tf = this;

	var type = tf.form.fields.type.val();

	for(var name in tf.form.fields){
		if(!tf.base_fields[name]){
			tf.form.fields[name].remove();
		}
	}

	if(type==='text'){
		tf.form.add_field("min_length", new TextField("Minimum Length", {type: "number"}));
		tf.form.add_field("max_length", new TextField("Maximum Length", {type: "number"}));
		tf.form.fields.min_length.val(tf.value.min_length);
		tf.form.fields.max_length.val(tf.value.max_length);
	} else if(type==='number'){

	} else if(type==='object'){

		var fields_field = new ArrayField("Fields");
		fields_field.new_field = function(index){
			var inner_field = new TypeField(null, tf);
			fields_field.add_field(null, inner_field);
		}

		tf.form.add_field("fields", fields_field);

		var inner_fields = tf.value.fields;
		if(inner_fields){
			for(var i = 0; i < tf.value.fields.length; i++){
				var field_data = tf.value.fields[i];

				var inner_field = new TypeField(field_data, tf);
				fields_field.add_field(null, inner_field);
			}
		}
	}
}

TypeField.prototype.in_array = function(remove_callback){
	var tf = this;


}

TypeField.prototype.val = function(argument){
    var tf = this;

    if(arguments.length===0){
        return tf.form.val();
    } else {
        return tf.form.val(argument);
    }
}

TypeField.prototype.error = function(argument){
    var tf = this;

    return tf.form.error(argument);
}

TypeField.prototype.edit_mode = function(){
    var tf = this;
    
    tf.is_edit_mode = true;

    if(tf.form){
        tf.form.edit_mode();
    }
}

TypeField.prototype.view_mode = function(){
    var tf = this;
 
    tf.is_edit_mode = false;

    if(tf.form){
        tf.form.view_mode();
    }
}