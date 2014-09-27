var logger = require('tracer').console();
var api = require('../core/api');

module.exports = function(require_session) {

    return function(req, res, next) {
        req.user = {
            username: "TestUser"
        };

        next();
        
    }
}