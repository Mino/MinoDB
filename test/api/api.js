var request = require('request');
var assert = require("assert");
var logger = require('tracer').console();
var globals = require('../globals');

var jsonout = function(json) {
    logger.log(JSON.stringify(json, null, 4));
}

describe('API', function() {

    describe('When I make an invalid API request', function() {
        it('should return an error', function(done) {
            globals.sdk.call({
                "something": "invalid"
            }, function(error, response) {
                logger.log(error, response)
                assert.notEqual(error, null);
                done();
            });
        });
    });

    // require('./save_type.js');
    // require('./save.js')
    require('./modify_permissions.js');
    // require('./permissions.js');

});