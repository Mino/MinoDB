function RuleCache(){
	var rc = this;

	rc.loading = {};
	rc.loaded = {};
}

RuleCache.prototype.load = function(name, callback) {
	var rc = this;

	if(rc.loaded[name]){
		callback(rc.loaded[name]);
		return;
	}

	var loading = rc.loading[name];
	if(!loading){
		loading = [];
		rc.loading[name] = loading;
	}
	loading.push(callback);

	$.ajax({
        type: "POST",
        url: ui_path+"ajax/",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({
        	message: "HELLO WORLD!"
        }),
        success: function(response) {
            console.log(response);
        },
        error: function(err, response) {
        	console.log(err);
        	console.log(response);
        }
    })
};