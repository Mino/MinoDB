var logger = require('tracer').console();
var crypto = require("crypto");

module.exports = function(password,salt,correct_hash_64,callback){
	logger.log(arguments);
    crypto.pbkdf2(password, salt, 32, 32, function(err, hash_binary) {
    	var hash = new Buffer(hash_binary, 'binary').toString('base64');
    	logger.log("output hash: ",hash);
    	callback(hash===correct_hash_64);
    });
}