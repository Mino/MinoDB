var globals = require('../../globals');
var logger = require('tracer').console();
var assert = require('assert');


it('should save a folder', function(done) {
    globals.user_sdk.with_user("testuser").call({
        "function": "save",
        "parameters": {
            "objects" : [{
                "name": "TestFolder",
                "path":"/testuser/",
                "folder": true
            }]
        }
    }, function(error, response) {
        logger.log(JSON.stringify(error, null, 4), response);
        assert.equal(error,null)
        
        globals.user_sdk.get(["/testuser/TestFolder/"], function(err, res) {
            logger.log(err, res);
            assert.equal(err, null);
            var object = res.objects[0];
            assert.notEqual(object, null);
            done();
        })
    });
});

it('should not save an folder if path does not exist', function(done) {
    globals.user_sdk.call({
        "function": "save",
        "parameters": {
            "objects" : [{
                "name": "TestFolder",
                "path": "/testuser/randompath/",
                "folder": true
            }]
        }
    }, function(error, response) {
        logger.log(JSON.stringify(error, null, 4), response);
        assert.notEqual(error,null)
        globals.user_sdk.get(["/testuser/randompath/TestFolder/"], function(err, res) {
            assert.equal(err, null);
            var object = res.objects[0];
            assert.equal(object, null);
            done();
        })
    });
});