function ItemSection(name, item_view){
	var section = this;

	section.name = this;
	section.item_view = item_view;

	section.element = $("<div />").addClass("item_section").append(
		section.title_div = $("<div />").addClass("title").text(name),
		section.container = $("<div />").addClass("container")
	)

	item_view.browser.rule_cache.load(name, function(err, data){
		console.log(err);
		console.log(data);
	})
}

ItemSection.prototype.populate = function(data){
	var section = this;

	section.data = data;
}

ItemSection.prototype.populate_rule = function(rule){
	var section = this;

	section.rule = rule;



	var type_object = {
		name: "person",
		display_name: "Person",
        type: "nested",
        fields:{
        	"first_name" : {
        		display_name: "First Name",
        		type: "text",
        		min_length: 5
        	},
        	"last_name" : {
        		display_name: "Last Name",
        		type: "text",
        		max_length: 3
        	},
        	"office_number" : {
        		display_name: "Office Number",
        		type: "number",
                description: "Please enter your office number",
        		minimum: 1,
        		maximum: 30,
        		integer: true
        	}
        }
    }

    var vr = new ValidationRule();
	console.log(vr.init(type_object));

	var form = vr.create_form();

	section.container.append(
		form.element
	)

	section.title_div.text(type_object.display_name || type_object.name);

}