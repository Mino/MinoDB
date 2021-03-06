var logger = require('mino-logger');
var MongoClient = require('mongodb').MongoClient;

function DataStore(config){
	var ds =this;

	ds.config = config;

	ds.id_index = 0;
	ds.id_last_index = 0;
	ds.getting_id_index = false;
	ds.id_callbacks = [];

	ds.connected = false;
	ds.connecting = false;
	ds.connect_callbacks = [];
}

DataStore.id_group_size = 100;

DataStore.prototype.call_connect_callbacks = function(){
	var ds = this;

	logger.debug("CALLING CONNECT CALLBACKS");
	for(var i = 0; i < ds.connect_callbacks.length; i++){
		ds.connect_callbacks[i]();
	}
};

DataStore.prototype.connect = function(callback) {
	var ds = this;

	if(ds.connected){
		callback();
		return;
	}
	ds.connect_callbacks.push(callback);
	if(ds.connecting){
		return;
	}
	ds.connecting = true;

	MongoClient.connect(ds.config.address, function(err, mongo_connection) {
	    if (err){
	    	logger.debug(err);
	    	throw err;
	    }

	    ds.mongo_connection = mongo_connection;

	    ds.object_collection = ds.mongo_connection.collection('objects');
	    ds.config_collection = ds.mongo_connection.collection('config');
	    ds.type_collection = ds.mongo_connection.collection('types');
	    ds.users_collection = ds.mongo_connection.collection('users');

	    ds.object_collection.ensureIndex( { full_path: 1 }, { unique: true }, function(err,res){
	    	logger.debug(err, res);
	    });

	    ds.object_collection.ensureIndex( { path: 1 }, function(err,res){
	    	logger.debug(err, res);
	    });

	    ds.object_collection.ensureIndex( { name: 1 }, function(err,res){
	    	logger.debug(err, res);
	    });

	    ds.object_collection.ensureIndex(
	    	{ 
	    		"$**": "text"
	    	},
	    	{
	    		name: "AllTextIndex"
	    	},
	    	function(){
	    		logger.debug(arguments);
			    ds.connected = true;
			    ds.call_connect_callbacks();
			}
		);

	    // mongo_connection.runCommand({shardCollection:"minods.objects", key: { full_path: 1 }}, function(err,res){
	    // 	logger.debug(err);
	    // 	logger.debug(res);
	    // })
	});
};

DataStore.prototype.close = function(callback){
	var ds = this;

	if(ds.mongo_connection){
		ds.mongo_connection.close(callback);
	} else {
		if(callback){
			callback();
		}
	}
};

DataStore.prototype.get_id = function(callback){
	var ds = this;

	if(ds.id_index < ds.id_last_index){
		var this_id = ds.id_index++;
		callback(this_id);
		return;
	}

	//Need new ids
	
	//Add the callback to the queue
	ds.id_callbacks.push(callback);
	
	if(ds.getting_id_index){
		//Already retrieving - add to callback queue
		return;
	}

	//This function will start the request
	ds.getting_id_index = true;

	ds.config_collection.insert({"_id":"id_index", "index":DataStore.id_group_size},function(err,res){
		if(err){
			// The index already exists

			ds.config_collection.findAndModify(
				{_id:"id_index"},
				[],
				{"$inc":{"index":DataStore.id_group_size}},
				{"new":true},
			function(error,response){
	    		ds.id_last_index = response.value.index;
				ds.id_index = response.value.index - DataStore.id_group_size;

				var current_callbacks = ds.id_callbacks;
				ds.id_callbacks = [];//Reset the callbacks - get_id might add to it
				ds.getting_id_index = false;
				for(var i = 0; i < current_callbacks.length; i++){
					var this_callback = current_callbacks[i];

					ds.get_id(this_callback);
				}
			});
		} else {
			ds.id_last_index = DataStore.id_group_size;
			ds.id_index = 0;

			var current_callbacks = ds.id_callbacks;
			ds.id_callbacks = [];//Reset the callbacks - get_id might add to it
			ds.getting_id_index = false;
			for(var i = 0; i < current_callbacks.length; i++){
				var this_callback = current_callbacks[i];

				ds.get_id(this_callback);
			}
		}
	});
};

module.exports = DataStore;