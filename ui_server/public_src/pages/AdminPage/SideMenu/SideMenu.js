function SideMenu(page) {
    var menu = this;

    menu.page = page;

    menu.menu_items = {};

    menu.element = $("<div />").addClass("side_menu").append(
    	menu.menu_list = $("<div />").addClass("menu_list").append(

    	)
    ,
        menu.loading_overlay = $("<div />").addClass("loading_overlay").hide()
    ).bind('mousewheel DOMMouseScroll', function(e) {
	    var scrollTo = null;

	    if (e.type == 'mousewheel') {
	        scrollTo = (e.originalEvent.wheelDelta * -0.5);
	    }
	    else if (e.type == 'DOMMouseScroll') {
	        scrollTo =40 * e.originalEvent.detail;
	    }

	    if (scrollTo) {
	        e.preventDefault();
	        $(this).scrollTop(scrollTo + $(this).scrollTop());
	    }
	})
}

SideMenu.prototype.init = function(){
	var menu = this;
}

SideMenu.prototype.select_item = function(name){
	var menu = this;

	for(var i in menu.menu_items){
		if(menu.menu_items.hasOwnProperty(i)){
			if(i===name){
				menu.menu_items[i].addClass("active");
			} else {
				menu.menu_items[i].removeClass("active");
			}
		}
	}

}

SideMenu.prototype.add_item = function(name, display_name){
	var menu = this;

	var menu_item = $("<a />",{href:Site.path+"admin/plugins/"+name})
	.ajax_url()
	.addClass("menu_item")
	.append(
		$("<div />").text(display_name)
	)

	menu.menu_items[name] = menu_item;
    menu.menu_list.append(menu_item);
}

SideMenu.prototype.remove = function(){
	var menu = this;


}