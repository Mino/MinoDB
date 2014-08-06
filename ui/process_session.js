var logger = require('tracer').console();
var api = require('../api/api');

module.exports = function(require_session) {

    return function(req, res, next) {
        req.user = {
            username: "TestUser",
            password: "ab4babaFA"
        };

        next();
        
    }
}