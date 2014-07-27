function ItemSection(name, value, item_view){
	var section = this;

	section.name = name;
	section.item_view = item_view;

	section.element = $("<div />").addClass("item_section").append(
		section.title_div = $("<div />").addClass("title").text(name),
		section.container = $("<div />").addClass("container")
	)

    section.is_edit_mode = true;

    // console.log(name);
    // console.log(value);
    // console.log(item_view.browser);

	item_view.browser.type_cache.load(name, function(err, data){
  //       console.log("ITEM SECTION");
		// console.log(err);
		// console.log(data);
        section.populate_type(data);
        section.populate(value);
	})
}

ItemSection.prototype.val = function(argument){
    var section = this;

    if(arguments.length===0){
        return section.field.val();
    } else {
        return section.field.val(argument);
    }
}

ItemSection.prototype.error = function(argument){
    var section = this;

    return section.field.error(argument);
}

ItemSection.prototype.edit_mode = function(){
    var section = this;
    
    section.is_edit_mode = true;

    if(section.field){
        section.field.edit_mode();
    }
}

ItemSection.prototype.view_mode = function(){
    var section = this;
 
    section.is_edit_mode = false;

    if(section.field){
        section.field.view_mode();
    }
}

ItemSection.prototype.populate = function(data){
    var section = this;

    if(section.field){
        console.log(section.field)
        section.field.val(data);
    }
}

ItemSection.prototype.populate_type = function(type){
	var section = this;

	section.type = type;

    // console.trace();
    // console.log(type);

    section.vr = new ValidationRule();
	console.log(section.vr.init(type));



	section.field = section.vr.field.create_ui(section.item_view.form);

    // console.log(section.vr.field);
    // console.log(section.field);

	// section.container.append(
	// 	section.field.element
	// )

	// section.title_div.text(type.display_name || type.name);

 //    if(section.is_edit_mode){
 //        section.edit_mode();
 //    } else {
 //        section.view_mode();
 //    }

}