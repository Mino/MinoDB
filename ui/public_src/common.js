function isEmptyObject(object){
	for(key in object){
		return false;
	}
	return true;
}

function ajax_request(params, callback){
	$.ajax({
        type: "POST",
        url: ui_path+"ajax/",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(params),
        success: function(response) {
            console.log(response);
            callback(null, response);
        },
        error: function(err, response) {
        	console.log(err);
        	callback(err)
        }
    })
}