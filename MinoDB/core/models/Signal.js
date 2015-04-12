function Signal(data) {
	var signal = this;
	signal.data = data;
	signal.callback = data.callback;

	signal.paths = signal.data.paths;
	signal.include_subfolders = signal.data.include_subfolders;
	signal.handlers = signal.data.handlers;
}

Signal.prototype.trigger = function(object, handler) {
	var signal = this;
	signal.callback(object, handler);
};

module.exports = Signal;