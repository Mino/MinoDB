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

    it('should throw an error if I save an object with a non-existant type', function(done) {
        globals.user_sdk.with_user("testuser").call({
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
                                        "error": 0
                                    }
                                },
                                "error_message": "One or more errors.",
                                "error": 0
                            }
                        },
                        "error_message": "One or more errors.",
                        "error": 0
                    }
                },
                "error_message": "One or more errors.",
                "error": 0
            })
            assert.equal(response, null);
            done();
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