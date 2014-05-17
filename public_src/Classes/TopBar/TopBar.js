function TopBar(){
	var topBar = this;

	topBar.menuButton = null;
	topBar.rightButton = null;

	topBar.element = $("<div />")
	.addClass("topBar")
	.addClass("navbar-inner")
	.append(
		topBar.title = $("<div />")
		.addClass("title")
		.addClass("unselectable")
	)
}

TopBar.prototype.setTitle = function(text){
	var topBar = this;
	topBar.title.text(text);
}

TopBar.prototype.setRightButton = function(callback,html){
	var topBar = this;

	topBar.element
	.append(
		topBar.rightButton = $("<button />")
		.addClass("mino_button")
		.addClass("lightmino_button")
		.addClass("topBarRightButton")
		.append(
			$("<div />").html(html)
		)
		.tappable(callback)
	)
}

TopBar.prototype.setRightButtonStatus = function(active) {
	var topBar = this;
	if(topBar.rightButton!=null){
		topBar.rightButton.toggleClass("active",active);
	}
};

TopBar.prototype.removeRightButton = function(){
	var topBar = this;
	if(topBar.rightButton!=null){
		topBar.rightButton.remove();
		topBar.rightButton = null;
	}
}

TopBar.prototype.setMenuButton = function(callback,text){
	var topBar = this;

	if(text==undefined){
		text = "__<br/>__<br/>__";	
	}

	if(topBar.menuButton!=null){
		topBar.menuButton.remove();
	}

	topBar.element
	.append(
		topBar.menuButton = $("<button />")
		.addClass("mino_button")
		.addClass("lightmino_button")
		.addClass("topBarLeftButton")
		.append(
			$("<div />").html(text)
		)
		.tappable(callback)
	)
}