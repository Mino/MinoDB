function TypeCache(){
	var rc = this;

	rc.loading = {};
	rc.loaded = {};
}

TypeCache.prototype.load = function(name, callback) {
	var rc = this;

	if(rc.loaded[name]){
		callback(null, rc.loaded[name]);
		return;
	}

	var loading = rc.loading[name];
	if(!loading){
		loading = [];
		rc.loading[name] = loading;
	}
	loading.push(callback);

	var request = {
		"function" : "get",
		"parameters" : {
			"addresses" : [
				name
			]
		}
	};

	api_request(request,function(err, response){
		console.log(err);

		var type = response.objects[0];
		if(type){
			rc.loaded[name] = type;
		}

		var callbacks = rc.loading[name];
		for(var i = 0; i < callbacks.length; i++){
			var callback = callbacks[i];

			callback(null,type);
		}
	})
};