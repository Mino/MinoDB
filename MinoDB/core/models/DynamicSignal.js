var FVRule = require("fieldval-rules");

function DynamicSignal(item) {
    var signal = this;
    signal.item = item;
    signal.data = item.mino_signal;
    signal.name = item.name;

    signal.paths = signal.data.paths;
    signal.include_subfolders = signal.data.include_subfolders;
    signal.handlers = signal.data.handlers;
}

DynamicSignal.rule = new FVRule();
DynamicSignal.rule_definition = {
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
    	}
    ]
}
DynamicSignal.rule.init(DynamicSignal.rule_definition)

DynamicSignal.validate = function(data, callback){
    Signal.rule.validate(data, function(error) {
        callback(error);
    })
}

DynamicSignal.prototype.trigger = function(object, signal_manager) {
    var signal = this;
    var callbacks = signal_manager.dynamic_signal_callbacks[signal.name];
    if (callbacks) {
        for (var i=0; i<callbacks.length; i++) {
            callbacks[i](object);
        }
    }
}

module.exports = DynamicSignal;