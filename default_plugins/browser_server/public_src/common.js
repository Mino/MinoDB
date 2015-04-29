function isEmptyObject(object){
	for(key in object){
		return false;
	}
	return true;
}

var ajax_request_id = 0;
function ajax_request(endpoint, params, callback){
    var id = ajax_request_id++;
    console.log("ajax_request",id, params);
    $.ajax({
        type: "POST",
        url: site_path+"ajax/"+endpoint,
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
    return id;
}

function api_request(params, callback){
    return ajax_request("api", params, callback);
}

function encode_path(path){
    var pieces = path.split("/");
    
    var encoded = "";
    
    for(var i = 0; i < pieces.length; i++){
        encoded += encodeURIComponent(pieces[i]);
        if(i!==pieces.length-1){
            encoded += "/";
        }
    }

    return encoded;
}

function decode_path(path){
    var pieces = path.split("/");
    
    var decoded = "";
    
    for(var i = 0; i < pieces.length; i++){
        decoded += decodeURIComponent(pieces[i]);
        if(i!==pieces.length-1){
            decoded += "/";
        }
    }

    return decoded;
}