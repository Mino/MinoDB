extend(DocsPage, Page);
function DocsPage(req){
	var page = this;

	DocsPage.superConstructor.call(this);

	page.title = null;
	page.current_doc = null;
	page.current_hash = null;

	page.side_menu = new SideMenu(page);
	
	page.element
	.addClass("docs_page")
	.append(
		$("<div />").addClass("body_text")
		.append(
			page.headline = $("<div />").addClass("body_headline")
			.text("Loading...")
		)
		.append(
			page.content = $("<div />").addClass("doc").text("Loading...")
		)
	)
	.append(
		$("<button />").addClass("mino_button menu_expand_button")
		.html("&#9776;&nbsp;Menu")
		.on('tap',function(){
			page.side_menu.toggle_menu();
		})
	)
	.append(
		page.side_menu.element
	)

	if(wildcard_contents==null){
		setTimeout(function(){
			Site.load_url("/docs/Get_Started");
		},1);
		return;
	}

	page.show_doc(wildcard_contents);

}
Site.add_url("/docs/",DocsPage);
Site.add_url("/docs/*",DocsPage);

DocsPage.prototype.new_url = function(req){
	var page = this;

	page.doc = wildcard_contents;
	page.title = wildcard_contents;

	page.show_doc(wildcard_contents);

	document.title = page.title + " - " + page_title_append;
}

DocsPage.prototype.get_title = function(){
	var page = this;

	if(page.title==null){
		return "Docs";
	} else {
		return page.title;
	}
}

DocsPage.prototype.show_doc = function(address){
	var page = this;

	window.scrollTo(0,0);

	if(address==null){
		return;
	}

	var folder_split = address.split("/");
	var folder = null;
	var doc_address = null;
	if(folder_split.length>1){
		folder = folder_split[0];
		doc_address = folder_split[1];
	} else {
		doc_address = folder_split[0];
	}
	var hash_split = doc_address.split("#");
	var doc_name = hash_split[0].replaceAll("_"," ");
	var hash = hash_split[1];

	if(page.current_doc==doc_name){
		if(current_hash!=hash && hash!=null){
			var aTag = $("a[name='"+ hash +"']");
		    $('body').animate({scrollTop: aTag.offset().top-40},'slow');
		}
		return;
	}

	var doc = page.side_menu.get_and_select_doc(folder,doc_name);

	if(doc==null){

			document.title = "Not found - Docs - MinoCloud™"
			page.headline.text("Page not found: "+doc_name);
			page.content.text("Please use the menu on the left to select a topic.");

	} else {

		var doc_file_name = doc[0];
		var folder = doc[1];

		var doc_path = doc_file_name;
		if(folder!=null){
			doc_path = folder+"/"+doc_file_name;
		}

		doc_path = doc_path.replaceAll(" ","_");

		$.get(("http://minocloud.com/DocFiles/"+doc_path), function(data) {

			document.title = doc_address+" - Docs - MinoCloud™"
			page.headline.empty();

			if(doc_name.indexOf("(Node)")!=-1){
				page.headline.text(doc_name.replace("(Node)",""));
				page.headline.prepend(
					$("<div />").addClass("NodeIconHeadline")
				)
			} else if(doc_name.indexOf("(PHP)")!=-1){
				page.headline.text(doc_name.replace("(PHP)",""));
				page.headline.prepend(
					$("<div />").addClass("PHPIconHeadline")
				)
			} else {
				page.headline.text(doc_name);
			}

			//Replaces tabs with 2 spaces
			data = data.replace(/	/g,"  ");
			page.content.html(data);

			page.content.find("button").toggleClass("mino_button",true);

			page.content.find("pre").each(function(){
				var pre = $(this);

				pre.addClass("prettyprint linenums");

				$("<button />").addClass("mino_button").text("Select All")
				.on('tap',function(){
					pre.selectText();
				})
				.insertBefore(pre);
			});

			page.content.find("a").each(function(){
				var a = $(this);
				a.ajax_url();
			});

			page.content.find(".tabs").each(function(){
				var tabs = $(this);
				tabs.tabs();
			});

			prettyPrint();

			$(window).resize();

			$('.bodyCenter').scrollTop(0);

			if(hash!=null){
				var aTag = $("a[name='"+ hash +"']");
			    $('.bodyCenter').scrollTop(aTag.offset().top-40);
			}
		}).fail(function(){
			document.title = "Not found - Docs - MinoCloud™"
			page.headline.text("Page not found");
			page.content.text("Please use the menu on the left to select a topic.");
		});
	}
}

DocsPage.prototype.init = function(){
	var page = this;
}

DocsPage.prototype.remove = function(){
	var page = this;
}

DocsPage.prototype.resize = function(resize_obj){
	var page = this;

	page.side_menu.resize(resize_obj);

	var width = page.content.width();
	if(width>400){
		page.content.find("img:not(.noscale)").css("margin-left", ((width-400)/2.0)+"px");
		page.content.find(".image_description").css("margin-left", ((width-400)/2.0)+"px");
	} else {
		page.content.find("img:not(.noscale)").css("margin-left", "0px");
		page.content.find(".image_description").css("margin-left", "0px");
	}
}