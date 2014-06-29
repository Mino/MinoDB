function ItemSection(name, value, item_view){
	var section = this;

	section.name = name;
	section.item_view = item_view;

	section.element = $("<div />").addClass("item_section").append(
		section.title_div = $("<div />").addClass("title").text(name),
		section.container = $("<div />").addClass("container")
	)

    section.is_edit_mode = true;

    console.log(name);
    console.log(value);
    console.log(item_view.browser);

	item_view.browser.rule_cache.load(name, function(err, data){
        console.log("ITEM SECTION");
		console.log(err);
		console.log(data);
        section.populate_rule(data);
        section.populate(value);
	})
}

ItemSection.prototype.val = function(argument){
    var section = this;

    if(arguments.length===0){
        return section.form.val();
    } else {
        return section.form.val(argument);
    }
}

ItemSection.prototype.error = function(argument){
    var section = this;

    return section.form.error(argument);
}

ItemSection.prototype.edit_mode = function(){
    var section = this;
    
    section.is_edit_mode = true;

    if(section.form){
        section.form.edit_mode();
    }
}

ItemSection.prototype.view_mode = function(){
    var section = this;
 
    section.is_edit_mode = false;

    if(section.form){
        section.form.view_mode();
    }
}

ItemSection.prototype.populate = function(data){
    var section = this;

    if(section.form){
        section.form.val(data);
    }
}

ItemSection.prototype.populate_rule = function(rule){
	var section = this;

	section.rule = rule;

    var vr = new ValidationRule();
	console.log(vr.init(rule));

	section.form = vr.create_form();

	section.container.append(
		section.form.element
	)

	section.title_div.text(rule.display_name || rule.name);

    if(section.is_edit_mode){
        section.edit_mode();
    } else {
        section.view_mode();
    }

}