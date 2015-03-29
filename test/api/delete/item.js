var globals = require('../../globals');
var logger = require('tracer').console();
var assert = require('assert');

it('should delete an object', function(done) {
    globals.sdk.with_user("testuser").with_user("testuser").call({
        "function": "delete",
        "parameters": {
            "addresses": [
                "/testuser/TestSave"
            ]
        }
    }, function(error, response) {
        logger.log(JSON.stringify(error, null, 4), response);
        assert.equal(error,null)
        var object = response.objects[0];
        assert.equal(object.deleted, true)
        
        globals.sdk.with_user("testuser").get(["/testuser/TestSave"], function(err, res) {
            logger.log(err, res);
            assert.equal(err, null);
            var object = res.objects[0];
            assert.equal(object, null);
            done();
        })
    });
});

it('should not delete an object if path does not exist', function(done) {
    globals.sdk.with_user("testuser").call({
        "function": "delete",
        "parameters": {
            "addresses": [
                "/testuser/randompath/TestSave"
            ]
        }
    }, function(error, response) {
        logger.log(JSON.stringify(error, null, 4), response);
        assert.notEqual(error,null)
        assert.deepEqual(error, {
            "invalid": {
                "parameters": {
                    "invalid": {
                        "objects": {
                            "invalid": {
                                "0": {
                                    "error": -1,
                                    "error_message": "ID DOES NOT EXIST"
                                }
                            },
                            "error_message": "One or more errors.",
                            "error": 5
                        }
                    },
                    "error_message": "One or more errors.",
                    "error": 5
                }
            },
            "error_message": "One or more errors.",
            "error": 5
        });
        
        globals.sdk.with_user("testuser").get(["/testuser/randompath/TestSave"], function(err, res) {
            assert.equal(err, null);
            var object = res.objects[0];
            assert.equal(object, null);
            done();
        })
    });
});

it('should not delete an object if access denied', function(done) {
    globals.sdk.with_user("testuser").call({
        "function": "delete",
        "parameters": {
            "addresses": [
                "/MinoDB/TestSave"
            ]
        }
    }, function(error, response) {
        logger.log(JSON.stringify(error, null, 4), response);
        assert.deepEqual(error, {
            "invalid": {
                "parameters": {
                    "invalid": {
                        "objects": {
                            "invalid": {
                                "0": {
                                    "error": -1,
                                    "error_message": "ID DOES NOT EXIST"
                                }
                            },
                            "error_message": "One or more errors.",
                            "error": 5
                        }
                    },
                    "error_message": "One or more errors.",
                    "error": 5
                }
            },
            "error_message": "One or more errors.",
            "error": 5
        });
        
        globals.sdk.get(["/MinoDB/TestSave"], function(err, res) {
            assert.equal(err, null);
            var object = res.objects[0];
            assert.equal(object, null);
            done();
        })
    });
});