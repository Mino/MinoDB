var logger = require('mino-logger');

var errors = require('../errors');

var FieldVal = require('fieldval');
var BasicVal = FieldVal.BasicVal;

function PluginManager(mdb){
	var pm = this;

	pm.mino_db = mdb;

	pm.plugins = {};
}

PluginManager.prototype.list_plugins = function(){
	var pm = this;

	var output = [];

	for(var i in pm.plugins){
		if(pm.plugins.hasOwnProperty(i)){
			var plugin_details = pm.plugins[i];

			output.push({
				name: plugin_details.info.name,
				display_name: plugin_details.info.display_name
			})
		}
	}

	return output;
}

PluginManager.prototype.add_plugin = function(plugin){
	var pm = this;

	var info = plugin.info();

	var validator = new FieldVal(info);
	var name = validator.get("name", BasicVal.string(true));
	if(name!==undefined){
		if(pm.plugins[name]!==undefined){
			//Plugin with same name already exists
			validator.invalid("name", errors.PLUGIN_WITH_SAME_NAME);
		}
	}
	var display_name = validator.get("display_name", BasicVal.string(false));

	var error = validator.end();
	if(error){
		return error;
	}

	pm.plugins[name] = {
		plugin: plugin,
		info: info
	};
}

module.exports = PluginManager;