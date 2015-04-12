var globals = require('../../globals');
var logger = require('mino-logger');
var assert = require('assert');


it('should save a folder', function(done) {
    globals.sdk.with_user("testuser").with_user("testuser").call({
        "function": "save",
        "parameters": {
            "objects" : [{
                "name": "TestFolder",
                "path":"/testuser/",
                "folder": true
            }]
        }
    }, function(error, response) {
        logger.debug(JSON.stringify(error, null, 4), response);
        assert.equal(error,null);
        
        globals.sdk.with_user("testuser").get(["/testuser/TestFolder/"], function(err, res) {
            logger.debug(err, res);
            assert.equal(err, null);
            var object = res.objects[0];
            assert.notEqual(object, null);
            done();
        });
    });
});

it('should not save a folder if path does not exist', function(done) {
    globals.sdk.with_user("testuser").call({
        "function": "save",
        "parameters": {
            "objects" : [{
                "name": "TestFolder",
                "path": "/testuser/randompath/",
                "folder": true
            }]
        }
    }, function(error, response) {
        logger.debug(JSON.stringify(error, null, 4), response);
        assert.notEqual(error,null);
        assert.deepEqual(error, {
            "invalid": {
                "parameters": {
                    "invalid": {
                        "objects": {
                            "invalid": {
                                "0": {
                                    "invalid": {
                                        "path": {
                                            "error": 32,
                                            "error_message": "Folder does not exist or you are not permitted to write to it."
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
        });
    });
});

it('should not save a folder if access denied', function(done) {
    globals.sdk.with_user("testuser").call({
        "function": "save",
        "parameters": {
            "objects" : [{
                "name": "TestFolder",
                "path": "/MinoDB/",
                "folder": true
            }]
        }
    }, function(error, response) {
        logger.debug(JSON.stringify(error, null, 4), response);
        assert.notEqual(error,null);
        assert.deepEqual(error, { 
            "invalid": {
                "parameters": {
                    "invalid": {
                        "objects": {
                            "invalid": {
                                "0": {
                                    "invalid": {
                                        "path": {
                                            "error": 19,
                                            "error_message": "You do not have permission to write to this path."
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
        });
    });
});