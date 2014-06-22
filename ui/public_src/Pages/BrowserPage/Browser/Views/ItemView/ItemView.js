@import("ItemSection/ItemSection.js");

function ItemView(browser, path){
	var item_view = this;

	item_view.browser = browser;
	item_view.path = path;

	item_view.element = $("<div />").addClass("item_view");

	item_view.core_form = new Form();
	item_view.core_form.add_field("id", new TextField("ID"));
	item_view.core_form.add_field("name", new TextField("Name"));
	item_view.core_form.add_field("path", new TextField("Path"));
	item_view.element.append(
		item_view.core_form.element
	)

	var section = new ItemSection("person", item_view);
	section.populate_rule();

	item_view.element.append(
		section.element
	)

	browser.view_container.empty();
	browser.view_container.append(item_view.element);
	
	browser.address_bar.populate_path_buttons(item_view.path);
}