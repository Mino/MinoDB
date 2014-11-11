var globals = require('../globals');
var logger = require('tracer').console();
var assert = require('assert');

describe('When I make a simple save request', function() {
    it('should save an object', function(done) {
        globals.user_sdk.with_user("testuser").call({
            "function": "save",
            "parameters": {
                "objects" : [{
                    "name": "TestSave",
                    "path":"/testuser/",
                    "person":{
                        "first_name": "Marcus",
                        "last_name": "Longmuir",
                        "office_number" : 25
                    }
                }]
            }
        }, function(error, response) {
            logger.log(JSON.stringify(error, null, 4), response);
            assert.equal(error,null)
            
            globals.user_sdk.get(["/testuser/TestSave"], function(err, res) {
                logger.log(err, res);
                assert.equal(err, null);
                var object = res.objects[0];
                assert.notEqual(object, null);
                done();
            })
        });
    });

    it('should not save an object if path does not exist', function(done) {
        globals.user_sdk.call({
            "function": "save",
            "parameters": {
                "objects" : [{
                    "name": "TestSave",
                    "path":"/testuser/randompath/",
                    "person":{
                        "first_name":"Marcus",
                        "last_name":"L2",
                        "office_number" : 25
                    }
                }]
            }
        }, function(error, response) {
            logger.log(JSON.stringify(error, null, 4), response);
            assert.notEqual(error,null)
            globals.user_sdk.get(["/testuser/randompath/TestSave"], function(err, res) {
                assert.equal(err, null);
                var object = res.objects[0];
                assert.equal(object, null);
                done();
            })
        });
    });
});