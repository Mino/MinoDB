var should = require('should');
var request = require('request');
var logger = require('tracer').console();
var MinoSDK = require('../../../MinoSDK/lib/minodb');

var jsonout = function(json) {
    console.log(JSON.stringify(json, null, 4));
}

var db = new MinoSDK("TestUser", "TEST123fmafo4agnlanq23");

describe('MinoDB API', function() {

    describe('When I make an invalid API request', function() {
        it('should return a 200 OK, but with an error response', function(done) {
            db.platform_request("/", {
                "something": "invalid"
            }, function(error, response) {
                if (error != null) {
                    should.fail('Just threw a connection error')
                } else {
                    if (response.error != null) {
                        jsonout(response);
                        done();
                    } else {
                        should.fail('Didn\'t return structured error')
                    }
                }
            });
        });
    });

});