function TypeField(value, parent){
	var rf = this;

	rf.parent = parent;
	rf.value = value;

	rf.element = $("<div />").addClass("type_field").append(
		rf.title_div = $("<div />").addClass("title"),
		rf.container = $("<div />").addClass("container")
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

	rf.form = new FVForm();
	rf.form.add_field("name", new TextField("Name"));
	rf.form.add_field("display_name", new TextField("Display Name"));
	rf.form.add_field("type", new ChoiceField("Type", {
		choices: field_type_choices
	}).on_change(function(){
		rf.update_type_fields();
	}));
	rf.container.append(
		rf.form.element
	)
	rf.form.val(value);

    rf.is_edit_mode = true;

    console.log(value);

    rf.update_title_name();
    rf.update_type_fields();
}

TypeField.prototype.update_title_name = function(){
	var rf = this;

	var title_name;
	var display_name_val = rf.form.fields.display_name.val();
	var name_val = rf.form.fields.name.val();
	if(display_name_val){
		title_name = "("+display_name_val+") "+name_val;
	} else {
		title_name = name_val;
	}

	rf.title_div.text(title_name);
}

TypeField.prototype.update_type_fields = function(){
	var rf = this;

	var type = rf.form.fields.type.val();

	console.log("update_type_fields ",rf, type);

	if(type==='text'){
		rf.form.add_field("min_length", new TextField("Minimum Length", {type: "number"}));
		rf.form.add_field("max_length", new TextField("Maximum Length", {type: "number"}));
	} else if(type==='number'){

	} else if(type==='object'){
		console.log(rf.value);
		for(var i = 0; i < rf.value.fields.length; i++){
			var field_data = rf.value.fields[i];

			var inner_field = new TypeField(field_data, rf);
			rf.container.append(inner_field.element);
		}
	}
}

TypeField.prototype.val = function(argument){
    var rf = this;

    if(arguments.length===0){
        return rf.form.val();
    } else {
        return rf.form.val(argument);
    }
}

TypeField.prototype.error = function(argument){
    var rf = this;

    return rf.form.error(argument);
}

TypeField.prototype.edit_mode = function(){
    var rf = this;
    
    rf.is_edit_mode = true;

    if(rf.form){
        rf.form.edit_mode();
    }
}

TypeField.prototype.view_mode = function(){
    var rf = this;
 
    rf.is_edit_mode = false;

    if(rf.form){
        rf.form.view_mode();
    }
}