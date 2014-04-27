var logger = require('tracer').console();
var api = require('./api');
var crypt = require("../../MinoSDK/lib/crypt");

module.exports = function(req, res, next) {
    var username = req.body.username;
    var parameters = req.body.parameters;
    if (username == null || parameters == null) {
        res.send(400);
    } else {

        api.get_user_by_username(username, function(error, user) {
            if (error != null) {
                res.send(400, JSON.stringify(error));
            } else {
                var user_api_key = user.api_key;

                res.raw_send = res.send;
                res.send = function(contents) {
                    crypt.encrypt(contents, user_api_key, function(error, encrypted) {
                        if (error != null) {
                            res.raw_send(503, error.toString());
                        } else {
                            res.raw_send(200, encrypted);
                        }
                    })
                }

                crypt.decrypt(parameters, user_api_key, function(error, decrypted) {
                    if (error != null) {
                        res.send(400, 'Failed to decrypt');
                    } else {
                        try {
                            var json = JSON.parse(decrypted);
                            req.user = user;
                            req.api_parameters = json;
                            req.user_api_key = user_api_key;
                            next();
                        } catch (e) {
                            res.send(400, e.toString());
                        }
                    }
                })
            }
        })
    }
}