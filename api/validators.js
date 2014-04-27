var Path = require('./Models/Path');

exports.path = function(val, had_error, emit){
	var path = new Path()
    var path_error = path.init(val);
    if (path_error != null) {
    	return path_error;
    }
    emit(path);
}