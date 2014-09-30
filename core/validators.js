var Path = require('../common_classes/Path');

exports.path = function(val, emit){
	var path = new Path()
    var path_error = path.init(val);
    if (path_error != null) {
    	return path_error;
    }
    emit(path);
}