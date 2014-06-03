var appMap = {};

function getAppIconForAppName(appIconName,iconSize,element){
	
	if(iconSize == undefined){
		iconSize = 20;
	}

	var appInfo = appMap[appIconName];

	var appIcon;

	if(element==undefined){
		appIcon = $("<div />").addClass("appIcon");
	} else {
		appIcon = element;
	}

	var icon20 = null;
	var icon40 = null;
	var icon80 = null;
	var icon160 = null;
	var icon320 = null;
	var icon640 = null;
	try{
		icon20 = appInfo['Mino.AppIcons.1']['20x20 Icon'];
	} catch(e){

	}
	try{
		icon40 = appInfo['Mino.AppIcons.1']['40x40 Icon'];
	} catch(e){

	}
	try{
		icon80 = appInfo['Mino.AppIcons.1']['80x80 Icon'];
	} catch(e){

	}
	try{
		icon160 = appInfo['Mino.AppIcons.1']['160x160 Icon'];
	} catch(e){

	}
	try{
		icon320 = appInfo['Mino.AppIcons.1']['320x320 Icon'];
	} catch(e){

	}
	try{
		icon640 = appInfo['Mino.AppIcons.1']['640x640 Icon'];
	} catch(e){

	}

	var targetSize = iconSize;
	var retina = window.devicePixelRatio==2;
	if(retina){
		iconSize*=2;
	}

	var found = null;
	
	if(icon20!=null){
		found = icon20;
	}
	if(icon40!=null && iconSize>=40) {
		found = icon40;
	} 
	if(icon80!=null && iconSize>=80) {
		found = icon80;
	}
	if(icon160!=null && iconSize>=160) {
		found = icon160;
	}
	if(icon320!=null && iconSize>=320) {
		found = icon320;
	}
	if(icon640!=null && iconSize>=640) {
		found = icon640;
	}

	if(found!=null){
		appIcon.css("background-image","url("+found+")");
		appIcon.css("background-size",targetSize+" "+targetSize);
	} else {
		appIcon.text("?");
	}
	
	return appIcon;
}

function addToAppMap(appName,appInfo){
	appMap[appName] = appInfo;
}

function sortAppArray(array){
	array.sort(function(item1,item2){
		var attr1 = item1['Mino.App.1']['Name'];
		var attr2 = item2['Mino.App.1']['Name'];
		if ( attr1 < attr2 )
			return -1;
		if ( attr1 > attr2 )
			return 1;
		return 0;
	});
}