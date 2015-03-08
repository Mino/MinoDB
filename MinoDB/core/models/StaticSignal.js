function StaticSignal(data) {
	var signal = this;
	signal.data = data;
	signal.callback = data.callback;

	signal.paths = signal.data.paths;
	signal.include_subfolders = signal.data.include_subfolders;
	signal.handlers = signal.data.handlers;
}

StaticSignal.prototype.trigger = function(object, signal_manager) {
	var signal = this;
	signal.callback(object)
}

module.exports = StaticSignal;