var should = require('should');
var request = require('request');
var logger = require('tracer').console();
var MinoSDK = require('../../MinoSDK/lib/minodb');

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

    describe('When I save an array of objects', function() {

        it('should return a successful response', function(done) {
            db.platform_request("/", {
                "function_name": "save",
                "parameters": {
                    "objects": [
                        {
                            "name" : "One",
                            "path" : "/TestUser/"
                        },
                        {
                            "name" : "Two",
                            "path" : "/TestUser/"
                        }
                    ]
                }
            }, function(error, response) {
                jsonout(error);
                jsonout(response);
                done();
            });
        });

    });

    describe('When I make a get objects request', function() {

        it('should return an objects response', function(done) {
            db.platform_request("/", {
                "function_name": "get",
                "parameters": {
                    "addresses": [
                        "37",
                        "37.5",
                        123,
                        123.5, -40.2,
                        "452/12",
                        "41/",
                        "/991",
                        true,
                        false,
                        null,
                        "/TestUser/",
                        "491/a",
                        "491/-7",
                        "491/6.5",
                        "TypeName",
                        "Type Name",
                        "TypeName.1",
                        "TypeName_1",
                        "0",
                        "9"
                    ]
                }
            }, function(error, response) {
                jsonout(error);
                jsonout(response);
                done();
            });
        });

    });

});