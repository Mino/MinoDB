function SideMenu(page) {
    var menu = this;

    menu.page = page;

	menu.state = SideMenu.OUT;

	menu.current_pos = -200;

	menu.original_touch = null;
	menu.last_touch = null;
	menu.is_pulling = false;
	menu.is_compact = false;
	menu.animating = false;

	menu.visible = false;

    menu.menu_items = {};

    menu.element = $("<div />").addClass("side_menu")
    .on('touchmove mousemove',function(event){
    	if(!menu.last_touch){
    		return;
    	}
    	event.originalEvent.preventDefault();
    	var this_touch = {
    		x: event.originalEvent.pageX
    	}
    	var diff_x = this_touch.x - menu.last_touch.x;
    	
    	menu.current_pos+=diff_x*1.25;
    	if(menu.current_pos>0){
    		menu.current_pos = 0;
    	} else if(menu.current_pos<-200){
    		menu.current_pos = -200;
    	}

    	var percent = 1+menu.current_pos / 200.0;

    	menu.shade.css({
    		"opacity": percent*SideMenu.SHADE_MAX_ALPHA
    	})

    	menu.side_element.css({
    		"left": menu.current_pos
    	})

    	menu.pull_tab.css({
    		"margin-right": (menu.current_pos/4)
    	})

    	var from_start_x = this_touch.x - menu.original_touch.x;

    	if(Math.abs(from_start_x)>20){
    		menu.is_pulling = true;
    	}

    	menu.last_touch = this_touch;
    })
    .on('touchend mouseup',function(event){
    	if(!menu.last_touch){
    		return;
    	}
    	event.originalEvent.preventDefault();
    	menu.original_touch = null;
    	menu.last_touch = null;
    	if(!menu.is_pulling){
    		menu.is_pulling = false;
    		menu.pull_tab.css({
    			"background-color": "rgba("+Math.random()*255+","+Math.random()*255+","+Math.random()*255+",1.0)"
    		})
    		menu.tab_press();
    		return;
    	}
    	menu.is_pulling = false;
    	if(menu.current_pos<-100){
    		menu.push_in();
    	} else {
    		menu.push_out();
    	}
    })
    .append(
    	menu.shade = $("<div />").addClass("shade")
    ,
	    menu.side_element = $("<div />").addClass("side_element").append(
	    // 	menu.logo = $("<a />",{href:Site.path})
	    //     .ajax_url()
	    //     .addClass("logo")
	    //     .text("Admin")
	    // ,
			menu.pull_tab = $("<div />").addClass("pull_tab fa fa-bars")
			.on('touchstart mousedown',function(event){
				event.originalEvent.preventDefault();

				menu.shade.show();

				menu.original_touch = {
					x: event.originalEvent.pageX || event.pageX
				}
				menu.last_touch = menu.original_touch;
			})
			.on('tap',function(){
				menu.tab_press();
			})
		,	
	    	menu.menu_list_holder = $("<div />").addClass("menu_list_holder").append(
		    	menu.menu_list = $("<div />").addClass("menu_list").append(

		    	)
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
	);
}

SideMenu.PARTIAL = {};
SideMenu.IN = {};
SideMenu.OUT = {};
SideMenu.SHADE_MAX_ALPHA = 0.3;

SideMenu.prototype.init = function(){
	var menu = this;

	$('html').on('tap.side_menu',function(event){
		if(menu.is_compact){
			if (!$(event.target).closest(menu.side_element).length){
				menu.push_in();
			}
		}
	})
}

SideMenu.prototype.remove = function(){
	var menu = this;

	$('html').off('tap.side_menu')
}

SideMenu.prototype.normal_mode = function(){
	var menu = this;

	menu.is_compact = false;

	menu.shade.hide();

	menu.pull_tab.hide();
	menu.push_out(0);
}

SideMenu.prototype.compact_mode = function(){
	var menu = this;

	menu.is_compact = true;

	menu.pull_tab.show();
	menu.push_in(0);
}

SideMenu.prototype.tab_press = function(){
	var menu = this;

	if(menu.animating){
		return;
	}

	if(menu.state===SideMenu.OUT){
		menu.push_in();
	} else {
		if(menu.state===SideMenu.IN){
			menu.push_out();
		}
	}
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

	var menu_item = $("<a />",{href:Site.path+"plugins/"+name})
	.ajax_url()
	.addClass("menu_item")
	.append(
		$("<div />").text(display_name)
	)

	menu.menu_items[name] = menu_item;
    menu.menu_list.append(menu_item);
}

SideMenu.prototype.close_if_compact = function(){
	var menu = this;

	if(menu.is_compact){
		menu.push_in();
	}
}

SideMenu.prototype.show = function(){
	var menu = this;

	if(!menu.visible){
		menu.element.show();
		menu.visible = true;
	}
}

SideMenu.prototype.hide = function(){
	var menu = this;

	if(menu.visible){
		menu.element.hide();
		menu.visible = false;
	}
}

SideMenu.prototype.push_out = function(duration){
	var menu = this;

	if(duration===undefined){
		duration = 400;
	}

	if(menu.is_compact){
		menu.shade.show();
	}

	menu.animating = true;

	menu.side_element.animate({
		"left": 0
	},
	duration,
	function(){
		menu.animating = false;
	})

	menu.pull_tab.animate({
		"margin-right": 0
	},duration);

	menu.shade.animate({
		"opacity": SideMenu.SHADE_MAX_ALPHA
	},duration);

	// menu.shadow.fadeIn(duration || 100);
	menu.state = SideMenu.OUT;
	menu.current_pos = 0;
}

SideMenu.prototype.push_in = function(duration){
	var menu = this;

	if(duration===undefined){
		duration = 400;
	}

	menu.animating = true;
	menu.side_element.animate({
		"left": -200
	},
	duration ,
	function(){
		menu.animating = false;
		menu.shade.hide();
	})

	menu.pull_tab.animate({
		"margin-right": "-50px"
	},duration );

	menu.shade.animate({
		"opacity": 0
	},duration);

	// menu.shadow.fadeOut(duration );
	menu.state = SideMenu.IN;
	menu.current_pos = -200;
}