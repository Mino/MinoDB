function ItemSection(name, value, item_view){
	var section = this

	section.name = name;
	section.item_view = item_view;

	item_view.browser.type_cache.load(name, function(err, data){
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

ItemSection.prototype.enable = function(){
    var section = this;
    
    section.is_enable = true;

    if(section.field){
        section.field.enable();
        section.remove_button.show();
    }
}

ItemSection.prototype.disable = function(){
    var section = this;
 
    section.is_enable = false;

    if(section.field){
        section.field.disable();
        section.remove_button.hide();
    }
}

ItemSection.prototype.populate = function(data){
    var section = this;

    section.val(data);
}

ItemSection.prototype.remove_press = function(){
    var section = this;

    section.item_view.remove_section(section.name);
    section.item_view.form.remove_field(name);
}

ItemSection.prototype.populate_type = function(type){
	var section = this;

	section.type = type;

    section.vr = new FVRule();
	section.vr.init(type);

	section.field = section.vr.field.create_ui(section.item_view.form);

    section.field.element.addClass("item_section");

    var title_text;
    if(section.field.display_name){
        title_text = type.display_name + " ("+type.name+")";
    } else {
        title_text = type.name;
    }

    section.field.title.empty().append(
        $("<a />",{
             "href": Site.path + type.name
        }).ajax_url().text(title_text)
        ,
        section.remove_button = $("<button />").addClass("mino_button").text("Remove").on('tap',function(event){
            event.preventDefault();
            section.remove_press();
        }).hide()
    )

    if(section.init_called){
        section.field.init();
    }

    if(section.is_enable){
        section.enable();
    } else {
        section.disable();
    }

}