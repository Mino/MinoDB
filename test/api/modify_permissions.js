var globals = require('../globals');
var logger = require('tracer').console();
var assert = require('assert');

describe('When I add permissions', function() {
    it('should save the permission object', function(done) {
        globals.sdk.with_user("testuser").with_user("testuser").call({
            "function": "add_permissions",
            "parameters": {
                "permissions" : [{
                    "username": "otheruser",
                    "path":"/testuser/subfolder/",
                    "write": true
                }]
            }
        }, function(error, response) {
            logger.log(JSON.stringify(error, null, 4), response);
            assert.equal(error,null);
            
            globals.sdk.with_user("testuser").get(["/testuser/permissions/sent/~testuser~subfolder~"], function(err, res) {
                logger.log(JSON.stringify(err, null, 4), res);
                assert.equal(err, null);
                var object = res.objects[0];
                assert.notEqual(object, null);
                done();
            })
        });
    });
});