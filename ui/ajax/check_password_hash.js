var crypto = require("crypto");

module.exports = function(password,salt,correct_hash_64,callback){
    crypto.pbkdf2(password, salt, 32, 32, function(err, hash_binary) {
    	var hash = new Buffer(hash_binary, 'binary').toString('base64');
    	callback(hash===correct_hash_64);
    });
}