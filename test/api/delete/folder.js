var globals = require('../../globals');
var logger = require('mino-logger');
var assert = require('assert');

it('should delete a folder', function(done) {
    globals.sdk.with_user("testuser").with_user("testuser").call({
        "function": "delete",
        "parameters": {
            "addresses": [
                "/testuser/TestFolder/"
            ]
        }
    }, function(error, response) {
        logger.debug(JSON.stringify(error, null, 4), response);
        assert.equal(error,null)
        var object = response.objects[0];
        assert.equal(object.deleted, true)
        
        globals.sdk.with_user("testuser").get(["/testuser/TestFolder/"], function(err, res) {
            logger.debug(err, res);
            assert.equal(err, null);
            var object = res.objects[0];
            assert.equal(object, null);
            done();
        })
    });
});

it('should not delete a folder if path does not exist', function(done) {
    globals.sdk.with_user("testuser").call({
        "function": "delete",
        "parameters": {
            "addresses": [
                "/testuser/randompath/TestFolder/"
            ]
        }
    }, function(error, response) {
        logger.debug(JSON.stringify(error, null, 4), response);
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
        
        globals.sdk.with_user("testuser").get(["/testuser/randompath/TestFolder/"], function(err, res) {
            assert.equal(err, null);
            var object = res.objects[0];
            assert.equal(object, null);
            done();
        })
    });
});

it('should not delete a folder if access denied', function(done) {
    globals.sdk.with_user("testuser").call({
        "function": "delete",
        "parameters": {
            "addresses": [
                "/MinoDB/TestFolder/"
            ]
        }
    }, function(error, response) {
        logger.debug(JSON.stringify(error, null, 4), response);
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
        
        globals.sdk.get(["/MinoDB/TestFolder/"], function(err, res) {
            assert.equal(err, null);
            var object = res.objects[0];
            assert.equal(object, null);
            done();
        })
    });
});