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
    }
    if(section.remove_button){
        section.remove_button.show();
        section.remove_button_padding.show();
    }
}

ItemSection.prototype.disable = function(){
    var section = this;
 
    section.is_enabled = false;

    if(section.field){
        section.field.disable();
    }
    if(section.remove_button){
        section.remove_button.hide();
        section.remove_button_padding.hide();
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

ItemSection.prototype.style_section_form = function() {
    var section = this;

    section.item_view.form.add_field(section.name, section.field);
    section.field.element.addClass("item_section").append(
        $("<button />",{"type":"submit"}).hide()//Hidden submit button allows return to submit form
    );

    var title_text;
    if(section.type){
        if(section.type.display_name){
            title_text = section.type.display_name + " ("+section.type.name+")";
        } else {
            title_text = section.type.name;
        }
    } else {
        title_text = section.name +  " (MISSING TYPE)";
    }

    section.field.title.empty().append(
        section.remove_button_padding = $("<div />").addClass("remove_button_padding")
        ,
        $("<a />",{
             "href": Site.path + section.name
        }).ajax_url().text(title_text)
        ,
        section.remove_button = $("<button />").addClass("mino_button remove_button").text("Remove").on('tap',function(event){
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

}

ItemSection.prototype.populate_type = function(type){
    var section = this;

    section.type = type;

    if(!section.type){
        //Type is missing
        section.field = new FVTextField(section.name, {"type": 'textarea'});
        section.field.val = function(set_val){//Override the .val function
            var ui_field = this;
            if (arguments.length===0) {
                var value = ui_field.input.val();
                if(value.length===0){
                    return null;
                }
                try{
                    return JSON.parse(value);
                } catch (e){
                    console.error("FAILED TO PARSE: ",value);
                }
                return value;
            } else {
                ui_field.input.val(JSON.stringify(set_val,null,4));
                return ui_field;
            }
        }
        section.item_view.form.add_field(section.name, section.field);
    } else {

        section.vr = new FVRule();
        section.vr.init(type);

        section.field = section.vr.create_ui();
    }

    if (section.field instanceof FVProxyField) {
        section.field.on_replace(function() {
            section.style_section_form();
        })
    } else {
        section.style_section_form();
    }

}