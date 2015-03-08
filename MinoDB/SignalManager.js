var logger = require("tracer").console();
var FieldVal = require('fieldval');
var BasicVal = FieldVal.BasicVal;
var Path = require('../common_classes/Path');
var DynamicSignal = require('./core/models/DynamicSignal');

function SignalManager(mdb) {
	var sm = this;
	sm.static_signals = [];
	sm.dynamic_signal_callbacks = {}
	sm.mino_db = mdb;
}

SignalManager.prototype.add_static_signal = function(signal) {
	var sm = this;
	sm.static_signals.push(signal);
}

SignalManager.prototype.add_dynamic_signal_callback = function(name, callback) {
	var sm = this;
	if (!sm.dynamic_signal_callbacks[name]) {
		sm.dynamic_signal_callbacks[name] = []
	}

	sm.dynamic_signal_callbacks[name].push(callback);
}

SignalManager.prototype.trigger = function(user, handler, object, callback) {
	var sm = this;

	var path = new Path();
	path.init(object.path);

	//Triggering static signals
	for (var i=0; i<sm.static_signals.length; i++) {
		var signal = sm.static_signals[i];
		
		if (signal.handlers.indexOf(handler) == -1) {
			continue;
		}

		var should_trigger = false;
		for (var j=0; j<signal.paths.length; j++) {
			var exact_match = signal.paths[j] == object.path;
			var included_as_sub_folder = path.sub_paths.indexOf(signal.paths[j]) != -1 && signal.include_subfolders;
			if (exact_match || included_as_sub_folder) {
				should_trigger = true;
			}

		}

		if (should_trigger) {
			signal.trigger(object, sm);
		}
	}


	//Triggering dynamic signals
	
	if (sm.mino_db.dynamic_signals_enabled) {
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

		sm.mino_db.api.ds.object_collection.find(query).toArray(function(err, res) {
			logger.log(err,res);
			for (var i=0; i<res.length; i++) {
				var signal = new DynamicSignal(res[i]);
				signal.trigger(object, sm);
			}
		})
	}
	
}

module.exports = SignalManager;