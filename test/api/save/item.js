var globals = require('../../globals');
var logger = require('mino-logger');
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
        logger.debug(JSON.stringify(error, null, 4), response);
        assert.equal(error,null);
        
        globals.sdk.with_user("testuser").get(["/testuser/TestSave"], function(err, res) {
            logger.debug(err, res);
            assert.equal(err, null);
            var object = res.objects[0];
            assert.notEqual(object, null);
            done();
        });
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
        
        globals.sdk.with_user("testuser").get(["/testuser/randompath/TestSave"], function(err, res) {
            assert.equal(err, null);
            var object = res.objects[0];
            assert.equal(object, null);
            done();
        });
    });
});

it('should not save an object if access denied', function(done) {
    globals.sdk.with_user("testuser").call({
        "function": "save",
        "parameters": {
            "objects" : [{
                "name": "TestSave",
                "path":"/MinoDB/",
                "person":{
                    "first_name":"Marcus",
                    "last_name":"Longmuir",
                    "office_number" : 25
                }
            }]
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
        
        globals.sdk.get(["/MinoDB/TestSave"], function(err, res) {
            assert.equal(err, null);
            var object = res.objects[0];
            assert.equal(object, null);
            done();
        });
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
        logger.debug(JSON.stringify(error, null, 4), error);
        assert.deepEqual(error, {
            "invalid": {
                "parameters": {
                    "invalid": {
                        "objects": {
                            "invalid": {
                                "0": {
                                    "invalid": {
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
        });
        assert.equal(response, null);
        done();
    });
});

it('should save an object if access is granted', function(done) {

    globals.minodb.with_user('otheruser').save([{
        name: "inner_folder",
        path: "/otheruser/",
        folder: true
    }], function(err, res) {
        assert.equal(err, null);

        var object = {
            name: 'saved_object_granted_access',
            path: '/otheruser/inner_folder/'
        };
        globals.minodb.save([object], function(err, res) {
            logger.debug(res);
            assert.deepEqual(err, { 
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

            var perms = globals.minodb.get_plugin('minodb_permissions');
            perms.assign_permission_to_id('write:/otheruser/', 'testuser', function(err, res) {
                assert.equal(err, null);

                globals.minodb.save([object], function(err, res) {
                    logger.debug(res);
                    assert.equal(err, null);
                    assert.notEqual(res.objects[0], null);
                    assert.equal(res.objects[0].full_path, '/otheruser/inner_folder/saved_object_granted_access');
                    done();
                });
            });
        });
    });

});
