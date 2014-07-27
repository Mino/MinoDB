function TypeField(name, value, parent){
	var rf = this;

	rf.name = name;
	rf.parent = parent;
	rf.value = value;

	rf.element = $("<div />").addClass("type_field").append(
		rf.title_div = $("<div />").addClass("title"),
		rf.container = $("<div />").addClass("container")
	)

	rf.form = new FVForm();
	rf.form.add_field("name", new TextField("Name"));
	rf.form.add_field("display_name", new TextField("Display Name"));
	rf.form.add_field("type", new ChoiceField("Type", {
		choices: [
			["text", "Text"],
			["number", "Number"],
			["boolean", "Boolean"],
			["date", "Date"],
			["object", "Object"]
		]
	}).on_change(function(){
		console.log("DID CHANGE");
		rf.update_type_fields();
	}));
	rf.container.append(
		rf.form.element
	)
	rf.form.val(value);

    rf.is_edit_mode = true;

    console.log(name);
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

	console.log("update_type_fields ",rf,type);

	if(type==='text'){

	} else if(type==='number'){

	} else if(type==='object'){
		for(var i in rf.value.fields){
			var field_data = rf.value.fields[i];

			var inner_field = new TypeField(i, field_data, rf);
			rf.container.append(inner_field.element);
		}
	}
}

TypeField.prototype.val = function(argument){
    var rf = this;

    if(arguments.length===0){
        return rf.field.val();
    } else {
        return rf.field.val(argument);
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