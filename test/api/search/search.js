var globals = require('../../globals');
var logger = require('tracer').console();
var assert = require('assert');

it('should perform a basic search', function(done) {
    globals.sdk.call({
        "function": "search",
        "parameters": {
            "paths": [
                "/Mino/users/"
            ],
            "include_subfolders": true,
            "query" : {
                "mino_user.username": "testuser"
            }
        }
    }, function(error, response) {
        logger.log(error, response);
        assert.equal(error, null);

        done();
    });
});
