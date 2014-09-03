var logger = require('tracer').console();
var MongoClient = require('mongodb').MongoClient;

function DataStore(config){
	var ds =this;

	ds.config = config;

	ds.connected = false;
	ds.connecting = false;
	ds.connect_callbacks = [];
}

DataStore.prototype.call_connect_callbacks = function(){
	var ds = this;

	for(var i = 0; i < ds.connect_callbacks.length; i++){
		ds.connect_callbacks[i]();
	}
}

DataStore.prototype.connect = function(callback) {
	var ds =this;

	if(ds.connected){
		callback();
		return;
	}

	if(ds.connecting){
		ds.connect_callbacks.push(callback);
		return;
	}

	MongoClient.connect(ds.config.address, function(err, mongo) {
	    if (err){
	    	logger.log(err);
	    	throw err;
	    }

	    ds.object_collection = mongo.collection('objects');
	    ds.config_collection = mongo.collection('config');
	    ds.type_collection = mongo.collection('types');
	    ds.users_collection = mongo.collection('users');

	    ds.object_collection.ensureIndex( { full_path: 1 }, { unique: true }, function(err,res){
	    	logger.log(err, res);
	    })

	    ds.object_collection.ensureIndex( { path: 1 }, function(err,res){
	    	logger.log(err, res);
	    })

	    ds.object_collection.ensureIndex( { name: 1 }, function(err,res){
	    	logger.log(err, res);
	    })

	    ds.type_collection.ensureIndex( { name: 1 }, { unique: true }, function(err,res){
	    	logger.log(err, res);
	    })

	    ds.users_collection.ensureIndex( { username: 1 }, { unique: true }, function(err, res){
	    	logger.log(err, res);
	    })

	    try {

		    ds.config_collection.insert({"_id":"id_index", "index":1},function(err,res){
		    	if(err){
		    		logger.log(err);
		    		//The index already exists


		    		ds.config_collection.findAndModify(
						{_id:"id_index"}, 
						[],
		    			{$inc:{"index":1}},
		    			{},
		    		function(error,response){
		    			logger.log(error);
		    			logger.log(response);

			    		logger.log("SET ID_INDEX TO: "+response.index);
		    			ds.id_index = response.index;
						callback(error, ds);
		    		})


		    	} else {
		    		logger.log("INSERTED ID_INDEX = 1");
		    		ds.id_index = 1;
					callback(err, ds);
		    	}
		    })

		} catch (e){
			logger.log(e);
		}

		
	    ds.connected = true;
	    ds.call_connect_callbacks();

	    // mongo.runCommand({shardCollection:"minods.objects", key: { full_path: 1 }}, function(err,res){
	    // 	logger.log(err);
	    // 	logger.log(res);
	    // })
	});
};

module.exports = DataStore;