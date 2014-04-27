/* Crypt.js provides a simple method of performing AES 256 CBC with an IV. 
 * The IV is prepended to the encrypted string and is used when decrypting. */

var crypto = require("crypto");

exports.generateIV = function(callback) {
    crypto.randomBytes(16, function(ex, buf) {
        callback(buf.toString('base64'));
    });
};

exports.encrypt = function(plain, apiKey, callback) {
    exports.generateIV(function(iv64) {
        var iv = new Buffer(iv64, 'base64').toString('binary');
        crypto.pbkdf2(apiKey, iv64, 32, 32, function(err, key) {
            var cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
            var result = cipher.update(plain, 'utf8', 'base64');
            result += cipher.final('base64');
            var finalResult = iv64 + result;
            callback(null, finalResult);
        });
    });
}

exports.encrypt_with_iv = function(plain, apiKey, iv64, callback) {
    var iv = new Buffer(iv64, 'base64').toString('binary');
    crypto.pbkdf2(apiKey, iv64, 32, 32, function(err, key) {
        var cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
        var result = cipher.update(plain, 'utf8', 'base64');
        result += cipher.final('base64');
        var finalResult = iv64 + result;
        callback(null, finalResult);
    });
}

exports.decrypt = function(encrypted64, apiKey, callback) {
    if (encrypted64 == null || apiKey == null) {
        callback("Decryption parameters were null");
    } else {
        var iv64 = encrypted64.substring(0, 24);
        var encrypted = new Buffer(encrypted64.substring(24), 'base64').toString('binary');
        var iv = new Buffer(iv64, 'base64').toString('binary');
        crypto.pbkdf2(apiKey, iv64, 32, 32, function(err, key) {
            var result;
            try {
                var decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
                result = decipher.update(encrypted);
                result += decipher.final();
            } catch (e) {
                callback("Decryption error");
                return;
            }

            //Callback must be made outside a try-catch block in case it throws an error
            callback(null, result, iv64);
            return;
        });
    }
}