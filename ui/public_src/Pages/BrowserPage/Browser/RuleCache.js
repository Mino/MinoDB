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

	var request = {
		"function" : "get",
		"parameters" : {
			"addresses" : [
				name
			]
		}
	};

	ajax_request(request,function(err, response){
		console.log(err);

		var rule = response.objects[0];
		if(rule){
			rc.loaded[name] = rule;
		}

		var callbacks = rc.loading[name];
		for(var i = 0; i < callbacks.length; i++){
			var callback = callbacks[i];

			callback(null,rule);
		}
	})
};