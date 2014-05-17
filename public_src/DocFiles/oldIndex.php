<?php
$pageTitle = "Docs";

include_once '../../../minocloud.php';

$oldPath = set_include_path("../account/");
include_once 'php_top.php';
set_include_path($oldPath);

include '../top.php';

$pageName = urldecode($_SERVER['QUERY_STRING']);

if($pageName==''){
	$pageName = 'Get Started';
}

//Prevent XSS
$pageName = str_replace('_', ' ', $pageName);
$pageName = str_replace('/', '', $pageName);
$pageName = str_replace('.', '', $pageName);
$pageName = str_replace('<', '', $pageName);
$pageName = str_replace('>', '', $pageName);
$pageName = str_replace('"', '', $pageName);
$pageName = str_replace("'", '', $pageName);
$pageName = str_replace("%", '', $pageName);

?>

<script type='text/javascript'>

var pageName = <?php echo(json_encode($pageName)); ?>;

$(document).ready(function() {

	var currentPageName = null;

	var navMenuSearchWidth = 200;

	var historyStateSupported = !!(window.history && window.history.pushState);

	var pageCenterHolder = $("#pageCenterHolder");

	var contentPane = $(".bodyContents");
	var navMenu,sideMenuHolder;
	var bodyHeadline = $(".bodyHeadline");
	var doc = $(".doc");

	var fixedMenuHolder = $("<div />")
	.appendTo(pageCenterHolder)
	.addClass("fixedMenuHolder")
	.append(
		$("<div />")
		.addClass("sideMenuCenterHolder")
		.append(
			sideMenuHolder = $("<div />")
			.addClass("sideMenuHolder")
			.scroll(function(event){
				event.stopPropagation();
				return false;
			})
			.append(
				navMenu = $("<div />")
				.addClass("sideMenu")
				.append(
					menuElements = $("<div />")
					.addClass("sideMenuElements")
				)
			)
		)
	);

	var menuData = {
		"" : [
			["Get Started",""],
			["Quick Start Tutorial","Tutorials/"],
			["About",""]
		],
		"Browser" : [
			["Browser","Browser Docs/"],
			["Search Tutorial","Browser Docs/"]
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
			["Boolean Field","FieldTypes/"],
			["Choice Field","FieldTypes/"],
			["Counter Field","FieldTypes/"],
			["Date Field","FieldTypes/"],
			["Date & Time Field","FieldTypes/"],
			["Email Field","FieldTypes/"],
			["Link Field","FieldTypes/"],
			["Text Field","FieldTypes/"]
		],
		"Apps" : [
			["Quick App Tutorial","Tutorials/"],
			["Apps","Apps/"],
			["App Folders","Apps/"],
			["Notifications","Apps/"],
			["Authentication","Apps/"],
			["Sample Apps","Apps/"],
			["Toolbar",""],
			["Front End Javascript Functions","Apps/"]
		],
		"PHP" : [
			["(PHP) Quick Start","PHP/"],
			["(PHP) Quick App Tutorial","PHP/"],
			["(PHP) get","PHP/"],
			["(PHP) save","PHP/"],
			["(PHP) search","PHP/"],
			["(PHP) delete","PHP/"],
			["(PHP) notify","PHP/"],
			["(PHP) api","PHP/"],
			["(PHP) authenticate","PHP/"],
			["(PHP) handleAPIRequest","PHP/"],
			["(PHP) handleActivationRequest","PHP/"],
		],
		"Node" : [
			["(Node) Quick Start","Node/"],
			["(Node) Quick App Tutorial","Node/"],
			["(Node) get","Node/"],
			["(Node) saveObjects","Node/"],
			["(Node) search","Node/"],
			["(Node) deleteObjects","Node/"],
			["(Node) notify","Node/"],
			["(Node) api","Node/"],
			["(Node) authenticate","Node/"],
			["(Node) handleAPIRequest","Node/"],
			["(Node) handleActivationRequest","Node/"],
		],
		"API Functions" : [
			["API",""],
			["Add Privileges Function","Functions/"],
			["Add Type Privileges Function","Functions/"],
			["Counter Function","Functions/"],
			["Delete Function","Functions/"],
			["Errors",""],
			["Get Function","Functions/"],
			["Notify Function","Functions/"],
			["Remove Privileges Function","Functions/"],
			["Save Conditions","Functions/"],
			["Save Function","Functions/"],
			["Save Type Function","Functions/"],
			["Search Function","Functions/"],
		]
	}


	linkClick = function(event){
		if(isTouchscreen){
			return false;
		}
		if(event.metaKey){
			return true;
		}
		var pageName = $(this).data("pageName");
		var split = pageName.split("#");
		if(historyStateSupported){
    		history.pushState(pageName, '', 'http://minocloud.com/docs/?'+pageName);
    	}
    	selectPage(pageName);
		return false;
	}
	
	linkTap = function(event){
		if(isTouchscreen){
			event.preventDefault();
			var pageName = $(this).data("pageName");
			var split = pageName.split("#");
			if(historyStateSupported){
	    		history.pushState(pageName, '', 'http://minocloud.com/docs/?'+pageName);
	    	}
			selectPage(pageName);
		}
	};

	for(var title in menuData){

		var items = menuData[title];

		var sideMenuSection = $("<div />")
		.addClass("sideMenuSection")
		.appendTo(menuElements);

		var sectionData = {}
		sideMenuSection.data("section",sectionData);

		if(title!=""){
			$("<div />")
			.addClass("sideMenuSectionTitle")
			.append(
				sectionData.menuArrow = $("<span />")
				.addClass("menuArrow")
				.html("&#9658;")
			)
			.append(
				$("<span />").text(title)
			)
			.data("section",sectionData)
			.tappable(function(){
				var titleDiv = $(this);
				var sectionData = titleDiv.data("section");
				if(!sectionData.extended){
					sectionData.elements.slideDown();
					sectionData.menuArrow.html("&#x25BC;")
				} else {
					sectionData.elements.slideUp();
					sectionData.menuArrow.html("&#9658;")
				}
				sectionData.extended = !sectionData.extended;
			})
			.appendTo(sideMenuSection);
		}


		sectionData.elements = $("<div />")
		.addClass("sideMenuSectionElements")
		.appendTo(sideMenuSection);

		if(title!=""){
			sectionData.elements.hide()
		}

		for(var i in items){

			var thisPage = items[i];
			var thisPageName = thisPage[0];
			var thisPageFolder = thisPage[1];
			var element,span;

			element = $("<a />")
    		.prop("href","?"+thisPageName)
    		.addClass("sideMenuItem")
    		.data("pageName",thisPageName)
    		.data("section",sectionData)
    		.data("pageFolder",thisPageFolder)
    		.append(
    			span = $("<span />")
    		)
    		.click(linkClick)
    		.tap(linkTap)
			.appendTo(sectionData.elements);

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

	//Load initial page
	selectPage(pageName);

	if(historyStateSupported){
		history.replaceState(pageName, '', 'http://minocloud.com/docs/?'+pageName);
		window.addEventListener('popstate', function(event){
			if(event.state==null){
				pageName = currentPageName;
				event.state = pageName;
				selectPage(pageName);
			} else {
				var pageName = event.state;
				selectPage(pageName);
			}
		});
	}

	var currentHash = null;

	function selectPage(address){

		window.scrollTo(0,0);

		if(address==null){
			return;
		}

		var split = address.split("#");
		var pageName = split[0];
		var hash = split[1];

		if(currentPageName==pageName){
			if(currentHash!=hash && hash!=null){
				if(hash!=null){
					var aTag = $("a[name='"+ hash +"']");
				    $('body').animate({scrollTop: aTag.offset().top-40},'slow');
				}
			}
			return;
		}

		if(pageName=="" || pageName==null){
			pageName = "Get Started";
		}
		$(".sideMenuItem.active").removeClass("active");

		if(screenIsSmall()){
			toggleHideMenu(true);
		}

		currentPageName = null;

		for(var title in menuData){

			var items = menuData[title];
			for(var i in items){

				var thisPage = items[i];
				var thisPageName = thisPage[0];
				var thisPageFolder = thisPage[1];
				var element = thisPage[2];

				if(thisPageName==pageName){
					
					var sectionData = element.data("section");
					if(!sectionData.extended){
						sectionData.elements.slideDown();
						if(sectionData.menuArrow!=undefined){
							sectionData.menuArrow.html("&#x25BC;");
						}
					}

					currentPageName = pageName;

					$(element).addClass("active");

					$.get((thisPageFolder+thisPageName), function(data) {
						if(currentPageName==pageName){

							document.title = pageName+" - Docs - MinoCloud™"
							bodyHeadline.empty();

							if(pageName.indexOf("(Node)")!=-1){
								bodyHeadline.text(pageName.replace("(Node)",""));
								bodyHeadline.prepend(
									$("<div />").addClass("NodeIconHeadline")
								)
							} else if(pageName.indexOf("(PHP)")!=-1){
								bodyHeadline.text(pageName.replace("(PHP)",""));
								bodyHeadline.prepend(
									$("<div />").addClass("PHPIconHeadline")
								)
							} else {
								bodyHeadline.text(pageName);
							}

							//Replaces tabs with 2 spaces
							data = data.replace(/	/g,"  ");
							doc.html(data);

							doc.find("button").toggleClass("mino_button",true);

							doc.find("pre").each(function(){
								var pre = $(this);

								pre.addClass("prettyprint linenums");

								$("<button />").addClass("mino_button").text("Select All")
								.tappable(function(){
									pre.selectText();
								})
								.insertBefore(pre);
							});

							doc.find("a").each(function(){
								var a = $(this);
								var href = a.attr("href");
								if(href!=null && href.substring(0,1)=="?"){
									a.data("pageName",href.substring(1))
									.click(linkClick)
						    		.tap(linkTap);
								}
							});

							doc.find(".tabs").each(function(){
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
						}
					}).fail(function(){
						if(currentPageName==pageName){//Did not find page
							document.title = "Not found - Docs - MinoCloud™"
							bodyHeadline.text("Page not found: "+pageName);
							doc.text("Please use the menu on the left to select a topic.");
							currentPageName = null;
						}
					});
				}
			};
		}

		if(currentPageName==null){//Did not find page
			document.title = "Not found - Docs - MinoCloud™"
			bodyHeadline.text("Page not found: "+pageName);
			doc.text("Please use the menu on the left to select a topic.");
		}
	}

	var content,contentPane,topBar;
	var hidden = false;
	function toggleHideMenu(forceHide){
		if(forceHide){
			if(hidden){
				return;
			}
		}
		if(hidden){				
			$(contentPane).animate({
				"margin-left" : "250px"
			},250,"linear",function(){
				$(window).resize();
			});
			$(sideMenuHolder).animate({
				"width" : "250px"
			},250,"linear",function(){
				$(window).resize();
			});
		} else {		
			$(contentPane).animate({
				"margin-left" : "0px"
			},250,"linear",function(){
				$(window).resize();
			});	
			$(sideMenuHolder).animate({
				"width" : "0px"
			},250,"linear",function(){
				$(window).resize();
			});
		}
		hidden = !hidden;	
		$(window).resize();
	}
	$(contentPane)
	.append(
		$("<button />")
		.addClass("mino_button")
		.addClass("menuExpandButton")
		.html("&#9776;&nbsp;Menu")
		.tap(function(){
			toggleHideMenu();
			event.preventDefault();
		})
	)

	function screenIsSmall(){
		return $(document).width()<600;
	}

	if(screenIsSmall()){
		hidden = true;
		$(contentPane).css("margin-left","0px");
		$(sideMenuHolder).css("width","0px");
	} else {
		hidden = false;
		$(contentPane).css("margin-left","250px");
		$(sideMenuHolder).css("width","250px");
	}

	$(window).resize(function(){
		var width = $(".bodytext").width();
		if(width>400){
			$(".bodytext").find("img:not(.noscale)").css("margin-left", ((width-400)/2.0)+"px");
			$(".bodytext").find(".imageDescription").css("margin-left", ((width-400)/2.0)+"px");
		} else {
			$(".bodytext").find("img:not(.noscale)").css("margin-left", "0px");
			$(".bodytext").find(".imageDescription").css("margin-left", "0px");
		}
	}).resize();

});
</script>

<?php
	printPageTop();
?>

	<div class="bodyContents docs">
		<div class="bodytext docs">
			<div class="bodyHeadline">Loading...</div>
			<div class="doc">
				Loading...
			</div>
		</div>
		<?
			include '../footer.php';
		?>
	</div>

<?
include '../bottom.php';
?>