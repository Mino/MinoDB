function ItemSection(name, value, item_view){
	var section = this

	section.name = name;
	section.item_view = item_view;

	section.element = $("<div />").addClass("item_section").append(
		section.title_div = $("<div />").addClass("title").text(name),
		section.container = $("<div />").addClass("container")
	)

	item_view.browser.type_cache.load(name, function(err, data){
        // console.log("ITEM SECTION");
		// console.log(err);
		// console.log(data);
        section.populate_type(data);
        section.populate(value);
	})

    section.init_called = false;
}

ItemSection.prototype.init = function(){
    var section = this;

    if(section.field){
        section.field.init();
    }

    section.init_called = true;
}

ItemSection.prototype.remove = function(){
    var section = this;

    if(section.field){
        section.field.remove();
    }
}

ItemSection.prototype.val = function(argument){
    var section = this;

    return section.vr.field.val(argument);
}

ItemSection.prototype.error = function(argument){
    var section = this;

    if(section.field){
        return section.field.error(argument);
    }
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

    section.val(data);
}

ItemSection.prototype.populate_type = function(type){
	var section = this;

	section.type = type;

    section.vr = new ValidationRule();
	console.log(section.vr.init(type));

	section.field = section.vr.field.create_ui(section.item_view.form);

    if(section.init_called){
        section.field.init();
    }

	section.title_div.text(type.display_name || type.name);

    if(section.is_edit_mode){
        section.edit_mode();
    } else {
        section.view_mode();
    }

}