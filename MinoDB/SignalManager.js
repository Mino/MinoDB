var FieldVal = require('fieldval');
var BasicVal = FieldVal.BasicVal;
var Path = require('../common_classes/Path');

function SignalManager(mdb) {
	var sm = this;
	sm.signals = [];
	sm.mino_db = mdb;
}

SignalManager.prototype.add_signal = function(signal) {
	var sm = this;
	sm.signals.push(signal);
};

SignalManager.prototype.trigger = function(user, handler, object, callback) {
	var sm = this;

	var path = new Path();
	path.init(object.path);

	for (var i=0; i<sm.signals.length; i++) {
		var signal = sm.signals[i];
		
		if (signal.handlers.indexOf(handler) == -1) {
			continue;
		}

		if (signal.paths === undefined) {
			signal.trigger(object, handler);
			continue;
		}

		var should_trigger = false;
		for (var j=0; j<signal.paths.length; j++) {
			
			var exact_match = signal.paths[j] == object.path;
			var included_as_sub_folder = path.sub_paths.indexOf(signal.paths[j]) != -1 && signal.include_subfolders;
			if (exact_match || included_as_sub_folder) {
				should_trigger = true;
				break;
			}

		}

		if (should_trigger) {
			signal.trigger(object, handler);
		}
	}
};

module.exports = SignalManager;