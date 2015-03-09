function ItemSection(name, value, item_view){
	var section = this

	section.name = name;
	section.item_view = item_view;
    section.value = value;

	item_view.browser.type_cache.load(name, function(err, type){
        section.populate_type(type);
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
        console.log("REMOVING");
        section.field.remove();
    }
}

ItemSection.prototype.val = function(argument){
    var section = this;

    return section.field.val(argument);
}

ItemSection.prototype.error = function(argument){
    var section = this;

    if(section.field){
        return section.field.error(argument);
    }
}

ItemSection.prototype.enable = function(){
    var section = this;
    
    section.is_enabled = true;

    if(section.field){
        section.field.enable();
        section.remove_button.show();
    }
}

ItemSection.prototype.disable = function(){
    var section = this;
 
    section.is_enabled = false;

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
    section.item_view.form.remove_field(section.name);
}

ItemSection.prototype.populate_type = function(type){
	var section = this;

    console.trace();

	section.type = type;

    if(!type){
        //Type is missing
        section.field = new FVTextField(section.name);
        section.item_view.form.add_field(section.name, section.field);
    } else {

        section.vr = new FVRule();
    	section.vr.init(type);

    	section.field = section.vr.create_form();
    }

    //TODO implement proper callback when form is loaded
    // setTimeout(function() {

    section.item_view.form.add_field(section.name, section.field);
    section.field.element.addClass("item_section");

    var title_text;
    if(section.field.display_name){
        title_text = type.display_name + " ("+type.name+")";
    } else {
        title_text = section.name;
    }

    section.field.title.empty().append(
        $("<a />",{
             "href": Site.path + section.name
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

    if(section.is_enabled){
        section.enable();
    } else {
        section.disable();
    }

    //TODO refactor set value asynchronously
    section.field.val(section.value);
        
    // }, 500);
    

}