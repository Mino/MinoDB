var globals = require('../../globals');
var logger = require('tracer').console();
var assert = require('assert');

it('should perform a basic search', function(done) {
    globals.sdk.call({
        "function": "search",
        "parameters": {
            "paths": [
                "/MinoDB/users/"
            ],
            "include_subfolders": true,
            "query" : {
                "minodb_user.username": "testuser"
            }
        }
    }, function(error, response) {
        logger.log(error, response);
        assert.equal(error, null);
        assert.notEqual(response.objects[0]);
        done();
    });
});

it('should sort values if items are valid', function(done) {
    globals.sdk.call({
        "function": "search",
        "parameters": {
            "paths": [
                "/MinoDB/users/"
            ],
            "sort": {
                "minodb_user": 1
            }
        }
    }, function(error, response) {
        logger.log(error, response);
        assert.equal(error, null);
        assert.equal(response.objects[0].name, 'otheruser');
        assert.equal(response.objects[1].name, 'testuser');

        globals.sdk.call({
            "function": "search",
            "parameters": {
                "paths": [
                    "/MinoDB/users/"
                ],
                "sort": {
                    "minodb_user": -1
                }
            }
        }, function(error, response) {
            logger.log(error, response);
            assert.equal(error, null);
            assert.equal(response.objects[0].name, 'testuser');
            assert.equal(response.objects[1].name, 'otheruser');
            done();
        });

    });
});

it('should return an error if sort params are invalid', function(done) {
    globals.sdk.call({
        "function": "search",
        "parameters": {
            "paths": [
                "/MinoDB/users/"
            ],
            "sort": {
                "minodb_user": 2
            }
        }
    }, function(error, response) {
        logger.log(error, response);
        logger.log(JSON.stringify(error, null, 4));
        assert.deepEqual(error, {
            "invalid": {
                "parameters": {
                    "invalid": {
                        "sort": {
                            "invalid": {
                                "minodb_user": {
                                    "error": 185,
                                    "error_message": "The specified sort parameter is invalid"
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
        done();
    });
});