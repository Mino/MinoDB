var logger = require('tracer').console();
var MongoClient = require('mongodb').MongoClient;

function Database(){
	var db = this;
}

Database.prototype.connect = function(callback) {
	var db = this;

	MongoClient.connect('mongodb://127.0.0.1:27017/minodb', function(err, mongo) {
	    if (err) throw err;

	    db.object_collection = mongo.collection('objects');
	    db.type_collection = mongo.collection('types');
	    db.users_collection = mongo.collection('users');

	    db.object_collection.ensureIndex( { full_path: 1 }, { unique: true }, function(err,res){
	    	logger.log(err);
	    	logger.log(res);
	    })

	    callback(err, db);
	});
};

module.exports = new Database();