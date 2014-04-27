String.prototype.replaceAll = function (find, replace) {
    var str = this;
    return str.replace(new RegExp(find, 'g'), replace);
};

String.prototype.startsWith = function (str){
	return this.slice(0, str.length) == str;
};

function subSplitFolderPath(toSplit, includeLast){
	var result = new Array();
	var currentIndex = 0;
	var currentPosition = 1;
	for(var currentPosition = 1; currentPosition<toSplit.length; currentPosition++){
		thisChar = toSplit.charCodeAt(currentPosition);
		if(thisChar==47){
			result.push(toSplit.substring(0,currentPosition+1));
			currentIndex++;
		}
	}
	if(!includeLast){
		result.pop();
	}
	return result;
}