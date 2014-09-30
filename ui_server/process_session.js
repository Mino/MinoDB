var logger = require('tracer').console();

module.exports = function(require_session) {

    return function(req, res, next) {
        req.user = {
            username: "TestUser"
        };

        next();
    }
}