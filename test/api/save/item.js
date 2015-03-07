var globals = require('../../globals');
var logger = require('tracer').console();
var assert = require('assert');

it('should save an object', function(done) {
    globals.sdk.with_user("testuser").with_user("testuser").call({
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
        
        globals.sdk.with_user("testuser").get(["/testuser/TestSave"], function(err, res) {
            logger.log(err, res);
            assert.equal(err, null);
            var object = res.objects[0];
            assert.notEqual(object, null);
            done();
        })
    });
});

it('should not save an object if path does not exist', function(done) {
    globals.sdk.with_user("testuser").call({
        "function": "save",
        "parameters": {
            "objects" : [{
                "name": "TestSave",
                "path":"/testuser/randompath/",
                "person":{
                    "first_name":"Marcus",
                    "last_name":"Longmuir",
                    "office_number" : 25
                }
            }]
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
        
        globals.sdk.with_user("testuser").get(["/testuser/randompath/TestSave"], function(err, res) {
            assert.equal(err, null);
            var object = res.objects[0];
            assert.equal(object, null);
            done();
        })
    });
});

it('should not save an object if access denied', function(done) {
    globals.sdk.with_user("testuser").call({
        "function": "save",
        "parameters": {
            "objects" : [{
                "name": "TestSave",
                "path":"/Mino/",
                "person":{
                    "first_name":"Marcus",
                    "last_name":"Longmuir",
                    "office_number" : 25
                }
            }]
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
        
        globals.sdk.get(["/Mino/TestSave"], function(err, res) {
            assert.equal(err, null);
            var object = res.objects[0];
            assert.equal(object, null);
            done();
        })
    });
});

it('should throw an error if I save an object with a non-existant type', function(done) {
    globals.sdk.with_user("testuser").with_user("testuser").call({
        "function": "save",
        "parameters": {
            "objects" : [{
                "name": "TestSave",
                "path":"/testuser/",
                "non-existant_type":{
                    "a_field": 5
                }
            }]
        }
    }, function(error, response) {
        logger.log(JSON.stringify(error, null, 4), error);
        assert.deepEqual(error,{
            "invalid": {
                "parameters": {
                    "invalid": {
                        "objects": {
                            "invalid": {
                                "0": {
                                    "unrecognized": {
                                        "non-existant_type": {
                                            "error_message": "Unrecognized field.",
                                            "error": 3
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
        })
        assert.equal(response, null);
        done();
    });
});

