var logger = require('mino-logger');
var assert = require("assert");

var SaveObject = require('../../MinoDB/core/handlers/SaveHandler/SaveObject');
var Type = require('../../MinoDB/core/models/Type');

describe('SaveObject', function() {

    describe('validate_object', function() {

        it('should validate two objects when types are present', function(done) {
            var object_one = {
                "name": "Object One",
                "path": "/Object/Path/",
                "my_type": {
                    "field_one": 5,
                    "field_two": "ABC"
                }
            };

            var object_two = {
                "name": "Object Two",
                "path": "/Object/Path/",
                "my_type": {
                    "field_one": 18,
                    "field_two": "DEF"
                },
                "my_other_type": {
                    "field_three": 5
                }
            };

            var types = {
                "my_type": {
                    "type": "object",
                    "fields":[
                        {
                            "name": "field_one",
                            "type": "number"
                        }
                    ]
                },
                "my_other_type": {
                    "type": "object",
                    "fields":[
                        {
                            "name": "field_three",
                            "type": "number"
                        }
                    ]
                }
            };

            SaveObject.validate_objects([object_one, object_two], types, function(missing_types, result){
                logger.debug(missing_types, result);
                assert.strictEqual(missing_types, null);
                assert.deepEqual(result, [
                    {
                        "invalid": {
                            "my_type": {
                                "invalid": {
                                    "field_two": {
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
                    },
                    {
                        "invalid": {
                            "my_type": {
                                "invalid": {
                                    "field_two": {
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
                ]);
                done();
            });
        });

        it('should report missing types when required types are not present', function(done) {
            var object_one = {
                "name": "Object One",
                "path": "/Object/Path/",
                "my_type": {
                    "field_one": 5,
                    "field_two": "ABC"
                }
            };

            var object_two = {
                "name": "Object Two",
                "path": "/Object/Path/",
                "my_type": {
                    "field_one": 18,
                    "field_two": "DEF"
                },
                "my_other_type": {
                    "field_three": 5
                }
            };

            var types = {};

            SaveObject.validate_objects([object_one, object_two], types, function(missing_types, result){
                assert.strictEqual(missing_types.length, 2);
                assert.equal(missing_types.indexOf("my_type")!==-1, true);
                assert.equal(missing_types.indexOf("my_other_type")!==-1, true);
                done();
            });
        });

        it('should report successful validation with null for each object', function(done) {
            var object_one = {
                "name": "Object One",
                "path": "/Object/Path/",
                "my_type": {
                    "field_one": 5,
                    "field_two": "ABC"
                }
            };

            var object_two = {
                "name": "Object Two",
                "path": "/Object/Path/",
                "my_type": {
                    "field_one": 18,
                    "field_two": "DEF"
                },
                "my_other_type": {
                    "field_three": 5
                }
            };

            var types = {
                "my_type": {
                    "type": "object",
                    "fields":[
                        {
                            "name": "field_one",
                            "type": "number"
                        }
                        ,
                        {
                            "name": "field_two",
                            "type": "text"
                        }
                    ]
                },
                "my_other_type": {
                    "type": "object",
                    "fields":[
                        {
                            "name": "field_three",
                            "type": "number"
                        }
                    ]
                }
            };

            SaveObject.validate_objects([object_one, object_two], types, function(missing_types, result){
                assert.strictEqual(missing_types, null);
                logger.debug(result);

                assert.deepEqual(result, [
                    null,
                    null
                ]);
                done();
            });
        });
    });
});
