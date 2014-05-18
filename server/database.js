var logger = require('tracer').console();
var MongoClient = require('mongodb').MongoClient;

function Database(){
	var db = this;
	db.connected = false;
}

Database.prototype.connect = function(callback) {
	var db = this;

	if(db.connected){
		callback();
		return;
	}

	MongoClient.connect('mongodb://127.0.0.1:27017/minodb', function(err, mongo) {
	    if (err){
	    	logger.log(err);
	    	throw err;
	    }
	    db.connected = true;

	    db.object_collection = mongo.collection('objects');
	    db.config_collection = mongo.collection('config');
	    db.type_collection = mongo.collection('types');
	    db.users_collection = mongo.collection('users');

	    db.object_collection.ensureIndex( { full_path: 1 }, { unique: true }, function(err,res){
	    	logger.log(err);
	    	logger.log(res);
	    })

	    try {

		    db.config_collection.insert({"_id":"id_index", "index":1},function(err,res){
		    	if(err){
		    		logger.log(err);
		    		//The index already exists


		    		db.config_collection.findAndModify(
						{_id:"id_index"}, 
						[],
		    			{$inc:{"index":1}},
		    			{},
		    		function(error,response){
		    			logger.log(error);
		    			logger.log(response);

			    		logger.log("SET ID_INDEX TO: "+response.index);
		    			db.id_index = response.index;
						callback(error, db);
		    		})


		    	} else {
		    		logger.log("INSERTED ID_INDEX = 1");
		    		db.id_index = 1;
					callback(err, db);
		    	}
		    })

		} catch (e){
			logger.log(e);
		}


	    // mongo.runCommand({shardCollection:"minodb.objects", key: { full_path: 1 }}, function(err,res){
	    // 	logger.log(err);
	    // 	logger.log(res);
	    // })
	});
};

module.exports = new Database();