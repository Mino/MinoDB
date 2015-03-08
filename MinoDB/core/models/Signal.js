var logger = require("tracer").console();
var FieldVal = require('fieldval');
var BasicVal = FieldVal.BasicVal;
var FVRule = require('fieldval-rules');
var Path = require('../../../common_classes/Path');
var request = require('request');

function Signal(item) {
	var signal = this;
    signal.item = item;
    signal.name = item.name;

    signal.data = item.mino_signal;
    signal.webhooks = signal.data.webhooks;
}

Signal.rule = new FVRule();
Signal.rule_definition = {
    name: "mino_signal",
    display_name: "Signal",
    type: "object",
    fields: [
    	{
    		name: "paths",
    		display_name: "Paths",
    		type: "array",
    		indices: {
    			"*": {
    			    "type": "text"
    			}
    		}
    	},
    	{
    		name: "handlers",
    		display_name: "Handlers",
    		type: "array",
    		indices: {
    			"*": {
    			    "type": "text"
    			}
    		}
    	},
    	{
    		name: "include_subfolders",
    		display_name: "Include Subfolders",
    		type: "boolean"
    	},
    	{
    		name: "webhooks",
    		display_name: "Webhooks",
    		type: "array",
    		indices: {
    			"*": {
    			    "type": "text"
    			}
    		}
    	}
    ]
}
Signal.rule.init(Signal.rule_definition)

Signal.trigger = function(api, user, handler, object, callback) {
	
	//signal.path == path || (signal.path.contains(path) && signal.include_subfolders == true)
	var path = new Path();
	path.init(object.path);
	var query = {
		"$or": [
		    {
		        "path": "/" + user.username + "/signals/",
		        "mino_signal.handlers": handler,
		        "mino_signal.paths": {
		            "$in": path.sub_paths
		        },
		        "mino_signal.include_subfolders": true
		    },
		    {
		        "path": "/" + user.username + "/signals/",
		        "mino_signal.handlers": handler,
		        "mino_signal.paths": path.toString()
		    }
		]
	}

	logger.log(JSON.stringify(query, null, 4));

	api.ds.object_collection.find(query).toArray(function(err, res) {
		logger.log(err,res);
		if (err) {
			if (callback) {
				callback(err);
			}
			return;
		}

		for (var i=0; i<res.length; i++) {
			var signal = new Signal(res[i]);
			signal.call_webhooks(object);
		}

	})
}

Signal.prototype.call_webhooks = function(object) {
	var signal = this;

	for (var i=0; i<signal.webhooks.length; i++) {
		var webhook = signal.webhooks[i];
		
		request({
			url: webhook,
			method: "POST",
			body: object,
			json: true
		}, function(err, httpResponse, body) {
			logger.log(err, body);
		})
	
	}
}

module.exports = Signal;