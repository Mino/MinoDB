var request = require('request');
var assert = require("assert");
var logger = require('tracer').console();
var globals = require('../globals');

var jsonout = function(json) {
    logger.log(JSON.stringify(json, null, 4));
}

describe('API', function() {

    describe('When I make an invalid API request', function() {
        it('should return an error', function(done) {
            globals.sdk.call({
                "something": "invalid"
            }, function(error, response) {
                logger.log(error, response)
                assert.notEqual(error, null);
                done();
            });
        });
    });

    describe('When I make save type request', function() {
        it('should save type', function(done) {
            globals.sdk.call({
                "function": "save_type",
                "parameters": {
                    "type" : {
                        name: "person",
                        display_name: "Person",
                        type: "object",
                        fields:[
                            {
                                name: "first_name",
                                display_name: "First Name",
                                type: "text",
                                min_length: 3
                            },{
                                name: "last_name",
                                display_name: "Last Name",
                                type: "text",
                                min_length: 3
                            },{
                                name: "office_number",
                                display_name: "Office Number",
                                type: "number",
                                description: "Please enter your office number",
                                minimum: 1,
                                maximum: 30,
                                integer: true
                            }
                        ]
                    }
                }
            }, function(error, response) {
                logger.log(error, response);
                assert.equal(error, null);

                globals.sdk.get(["/Mino/types/person"], function(err, res) {
                    assert.equal(err, null);
                    var person_type = res.objects[0];
                    assert.notEqual(person_type, null);
                    done();
                })
            });
        });
    });

    describe('When I make a simple save request', function() {
        it('should save an object', function(done) {
            globals.sdk.with_user("testuser").call({
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
                
                globals.sdk.get(["/testuser/TestSave"], function(err, res) {
                    assert.equal(err, null);
                    var object = res.objects[0];
                    assert.notEqual(object, null);
                    done();
                })
            });
        });

        it('should not save an object if path does not exist', function(done) {
            globals.sdk.call({
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
                globals.sdk.get(["/testuser/randompath/TestSave"], function(err, res) {
                    assert.equal(err, null);
                    var object = res.objects[0];
                    assert.equal(object, null);
                    done();
                })
            });
        });
    });

});