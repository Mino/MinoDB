function SideMenu(page){
	var sm = this;

	sm.page = page;

	sm.data = {
		"" : [
			["Get Started",""],
			["Quick Start Tutorial","Tutorials"],
			["About",""]
		],
		"Browser" : [
			["Browser","Browser"],
			["Search Tutorial","Browser"]
		],
		"Concepts" : [
			["Objects",""],
			["Types",""],
			["Items",""],
			["Folders",""],
			["Paths",""],
			["Fields",""],
			["Sharing",""]
		],
		"Field Types" : [
			["Field Types",""],
			["Boolean Field","FieldTypes"],
			["Choice Field","FieldTypes"],
			["Counter Field","FieldTypes"],
			["Date Field","FieldTypes"],
			["Date & Time Field","FieldTypes"],
			["Email Field","FieldTypes"],
			["Link Field","FieldTypes"],
			["Text Field","FieldTypes"]
		],
		"Apps" : [
			["Quick App Tutorial","Tutorials"],
			["Apps","Apps"],
			["App Folders","Apps"],
			["Notifications","Apps"],
			["Authentication","Apps"],
			["Sample Apps","Apps"],
			["Toolbar",""],
			["Front End Javascript Functions","Apps"]
		],
		"PHP" : [
			["(PHP)Quick Start","PHP"],
			["(PHP)Quick App Tutorial","PHP"],
			["(PHP)get","PHP"],
			["(PHP)save","PHP"],
			["(PHP)search","PHP"],
			["(PHP)delete","PHP"],
			["(PHP)notify","PHP"],
			["(PHP)api","PHP"],
			["(PHP)authenticate","PHP"],
			["(PHP)handleAPIRequest","PHP"],
			["(PHP)handleActivationRequest","PHP"],
		],
		"Node" : [
			["(Node)Quick Start","Node"],
			["(Node)Quick App Tutorial","Node"],
			["(Node)get","Node"],
			["(Node)saveObjects","Node"],
			["(Node)search","Node"],
			["(Node)deleteObjects","Node"],
			["(Node)notify","Node"],
			["(Node)api","Node"],
			["(Node)authenticate","Node"],
			["(Node)handleAPIRequest","Node"],
			["(Node)handleActivationRequest","Node"],
		],
		"API Functions" : [
			["API",""],
			["Add Privileges Function","Functions"],
			["Add Type Privileges Function","Functions"],
			["Counter Function","Functions"],
			["Delete Function","Functions"],
			["Errors",""],
			["Get Function","Functions"],
			["Notify Function","Functions"],
			["Remove Privileges Function","Functions"],
			["Save Conditions","Functions"],
			["Save Function","Functions"],
			["Save Type Function","Functions"],
			["Search Function","Functions"],
		]
	}

	sm.hidden = false;

	sm.element = $("<div />").addClass("fixed_menu_holder")
	.append(
		$("<div />").addClass("side_menu_center_holder")
		.append(
			sm.side_menu_holder = $("<div />").addClass("side_menu_holder")
			.append(
				$("<div />").addClass("side_menu")
				.append(
					sm.menu_elements = $("<div />").addClass("side_menu_elements")
				)
			)
		)
	)

	function screenIsSmall(){
		return $(document).width()<600;
	}

	if(screenIsSmall()){
		sm.hidden = true;
		$(sm.page.element).css("margin-left","0px");
		$(sm.side_menu_holder).css("width","0px");
	} else {
		sm.hidden = false;
		$(sm.page.element).css("margin-left","250px");
		$(sm.side_menu_holder).css("width","250px");
	}

	sm.create_menu_elements();
}

SideMenu.prototype.get_and_select_doc = function(folder,doc_name){
	var sm = this;

	$(".side_menu_item.active").removeClass("active");

	for(var title in sm.data){

		var items = sm.data[title];
		for(var i in items){

			var this_doc = items[i];
			var this_doc_name = this_doc[0];
			var this_doc_folder = this_doc[1];
			var element = this_doc[2];

			if(this_doc_name==doc_name){
				
				var section_data = element.data("section");
				if(!section_data.extended){
					section_data.elements.slideDown();
					if(section_data.menuArrow!=undefined){
						section_data.menuArrow.html("&#x25BC;");
					}
				}

				$(element).addClass("active");

				return this_doc;
			}
		}
	}

	return null;
}

SideMenu.prototype.create_menu_elements = function(){
	var sm = this;

	for(var title in sm.data){

		var items = sm.data[title];

		var sideMenuSection = $("<div />")
		.addClass("side_menu_section")
		.appendTo(sm.menu_elements);

		var section_data = {}
		sideMenuSection.data("section",section_data);

		if(title!=""){
			$("<div />")
			.addClass("side_menu_section_title")
			.append(
				section_data.menuArrow = $("<span />")
				.addClass("menu_arrow")
				.html("&#9658;")
			)
			.append(
				$("<span />").text(title)
			)
			.data("section",section_data)
			.tappable(function(){
				var titleDiv = $(this);
				var section_data = titleDiv.data("section");
				if(!section_data.extended){
					section_data.elements.slideDown();
					section_data.menuArrow.html("&#x25BC;")
				} else {
					section_data.elements.slideUp();
					section_data.menuArrow.html("&#9658;")
				}
				section_data.extended = !section_data.extended;
			})
			.appendTo(sideMenuSection);
		}


		section_data.elements = $("<div />")
		.addClass("side_menu_section_elements")
		.appendTo(sideMenuSection);

		if(title!=""){
			section_data.elements.hide()
		}

		for(var i in items){

			var thisPage = items[i];
			var thisPageName = thisPage[0];
			var folder = thisPage[1];
			var element,span;

			var doc_path = thisPageName;
			if(folder!=""){
				doc_path = folder+"/"+thisPageName;
			}

			doc_path = doc_path.replaceAll(" ","_");


			element = $("<a />")
    		.prop("href","/docs/"+doc_path)
    		.ajax_url()
    		.addClass("side_menu_item")
    		.data("pageName",thisPageName)
    		.data("section",section_data)
    		.data("pageFolder",folder)
    		.append(
    			span = $("<span />")
    		)
			.appendTo(section_data.elements);

			if(thisPageName.indexOf("(Node)")!=-1){
				span.text(thisPageName.replace("(Node)",""));
				span.prepend(
					$("<div />").addClass("NodeIconMenuItem")
				)
			} else if(thisPageName.indexOf("(PHP)")!=-1){
				span.text(thisPageName.replace("(PHP)",""));
				span.prepend(
					$("<div />").addClass("PHPIconMenuItem")
				)
			} else {
				span.text(thisPageName);
			}

	    	thisPage.push(element);
	    };
	}
}

SideMenu.prototype.deactivate_menu_elements = function(){
	var sm = this;


}

SideMenu.prototype.toggle_menu = function(forceHide){
	var sm = this;

	if(forceHide){
		if(sm.hidden){
			return;
		}
	}
	if(sm.hidden){				
		sm.page.element.animate({
			"margin-left" : "250px"
		},250,"linear",function(){
			$(window).resize();
		});
		sm.side_menu_holder.animate({
			"width" : "250px"
		},250,"linear",function(){
			$(window).resize();
		});
	} else {		
		sm.page.element.animate({
			"margin-left" : "0px"
		},250,"linear",function(){
			$(window).resize();
		});	
		sm.side_menu_holder.animate({
			"width" : "0px"
		},250,"linear",function(){
			$(window).resize();
		});
	}
	sm.hidden = !sm.hidden;	
	$(window).resize();
}

SideMenu.prototype.resize = function(resize_obj){
	var sm = this;


}