var logger = require('mino-logger');
var MinoSDK = require("minosdk");
var crypt = MinoSDK.crypt;

module.exports = function(req, res, next) {
    var username = req.body.username;
    var parameters = req.body.parameters;
    if (username == null || parameters == null) {
        res.send(400);
    } else {

        // api.get_user_by_username(username, function(error, user) {
        // TODO: MOCKING GET USER FUNCTION
        var error = null;
        var user = {
            username: "TestUser",
            api_key: "TEST123fmafo4agnlanq23"
        }
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
        // })
    }
}