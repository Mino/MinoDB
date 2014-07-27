function isEmptyObject(object){
	for(key in object){
		return false;
	}
	return true;
}

function ajax_request(params, callback){
    console.trace();
    var id = Math.random();
    console.log("ajax_request",id, params);
	$.ajax({
        type: "POST",
        url: ui_path+"ajax/",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(params),
        success: function(response) {
            console.log("ajax_response",id,response);
            callback(null, response);
        },
        error: function(err, response) {
        	console.log(err);
        	callback(err)
        }
    })
}