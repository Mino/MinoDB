fieldval_ui_extend(TypeField, FVField);

function TypeField(value, parent){
	var tf = this;

	tf.parent = parent;
	tf.value = value || {};

    tf.is_enable = true;
    tf.base_fields = {};

	TypeField.superConstructor.call(this, "", {});
	tf.contents = tf.input_holder.addClass("contents")

	tf.element.addClass("type_field").prepend(
		tf.title_div = $("<div />").addClass("title")
	)

	var field_type_choices = [];
	for(var i in FVRule.FVRuleField.types){
		var field_type_class = FVRule.FVRuleField.types[i];

		var name = i;
		var display_name = field_type_class.display_name;
		if(display_name){
			field_type_choices.push([name, display_name])
		} else {
			field_type_choices.push(name);
		}
	}

	tf.form = new FVForm();
	tf.form.add_field("name", new FVTextField("Name").on_change(function(){
		tf.update_title_name();
	}));
	tf.form.add_field("display_name", new FVTextField("Display Name").on_change(function(){
		tf.update_title_name();
	}));
	tf.form.add_field("type", new FVChoiceField("Type", {
		choices: field_type_choices
	}).on_change(function(){
		tf.update_type_fields();
	}));
	tf.contents.append(
		tf.form.element
	)
	for(var name in tf.form.fields){
    	tf.base_fields[name] = true;
    }
	tf.form.val(value, {ignore_change:true});

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

	if (type) {

		if (type === "object") {
			//TODO make this part of RuleBuilder
			var fields_field = new FVArrayField("Fields");
			fields_field.new_field = function(index){
				var inner_field = new tf.constructor(null, tf);
				fields_field.add_field(null, inner_field);
			}

			tf.form.add_field("fields", fields_field);

			var inner_fields = tf.value.fields;
			if(inner_fields){
				for(var i = 0; i < tf.value.fields.length; i++){
					var field_data = tf.value.fields[i];

					var inner_field = new tf.constructor(field_data, tf);
					fields_field.add_field(null, inner_field);
				}
			}

		} else {

			var rule_field = FVRule.FVRuleField.types[type].class;
			if (rule_field.create_editor_ui !== undefined) {
				rule_field.create_editor_ui(tf.value, tf.form);
			}
		}
	}
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

TypeField.prototype.enable = function(){
    var tf = this;
    
    tf.is_enable = true;

    if(tf.form){
        tf.form.enable();
    }

    FVField.prototype.enable.call(this);
}

TypeField.prototype.disable = function(){
    var tf = this;
 
    tf.is_enable = false;

    if(tf.form){
        tf.form.disable();
    }

    FVField.prototype.disable.call(this);
}