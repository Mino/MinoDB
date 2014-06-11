var request = require('request');
var assert = require("assert");
var logger = require('tracer').console();
var MinoSDK = require('../../../MinoSDK/lib/minodb');

var jsonout = function(json) {
    logger.log(JSON.stringify(json, null, 4));
}

var db = new MinoSDK("TestUser", "TEST123fmafo4agnlanq23");

describe('MinoDB API', function() {

    describe('When I make an invalid API request', function() {
        it('should return a 200 OK, but with an error response', function(done) {
            db.platform_request("/", {
                "something": "invalid"
            }, function(error, response) {
                if (error != null) {
                    logger.log(error);
                    assert.fail('Just threw a connection error')
                } else {
                    if (response.error != null) {
                        jsonout(response);
                        done();
                    } else {
                        assert.fail('Didn\'t return structured error')
                    }
                }
            });
        });
    });

    describe('When I make a simple get request', function() {
        it('should return a 200 OK', function(done) {
            db.platform_request("/", {
                "function": "get",
                "parameters": {
                    "addresses" : [
                        "/TestUser/",
                        1113
                    ]
                }
            }, function(error, response) {
                if (error != null) {
                    logger.log(error);
                    assert.fail('Just threw a connection error')
                } else {
                    if (response.error != null) {
                        jsonout(response);
                        assert.fail('Returned an error')
                    } else {
                        jsonout(response);
                    }
                    done();
                }
            });
        });
    });

});