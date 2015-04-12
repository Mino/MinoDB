var crypto = require("crypto");

var security = {};

security.generate_iv = function(callback) {
    crypto.randomBytes(16, function(ex, buf) {
        callback(buf.toString('base64'));
    });
};

security.generate_salted_password = function(password, callback){
    security.generate_iv(function(iv64) {
        crypto.pbkdf2(password, iv64, 32, 32, function(err, hash_binary) {
            var hash = new Buffer(hash_binary, 'binary').toString('base64');
            callback(hash,iv64);
        });
   });
};

module.exports = security;