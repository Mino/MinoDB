function isEmptyObject(object){
	for(key in object){
		return false;
	}
	return true;
}