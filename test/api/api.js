var request = require('request');
var assert = require("assert");
var logger = require('tracer').console();
var globals = require('../globals');

var jsonout = function(json) {
    logger.log(JSON.stringify(json, null, 4));
}

describe('MinoDB API', function() {

    // describe('When I make an invalid API request', function() {
    //     it('should return a 200 OK, but with an error response', function(done) {
    //         db.platform_request("/", {
    //             "something": "invalid"
    //         }, function(error, response) {
    //             if (error != null) {
    //                 logger.log(error);
    //                 assert.fail('Just threw a connection error')
    //             } else {
    //                 if (response.error != null) {
    //                     jsonout(response);
    //                     done();
    //                 } else {
    //                     assert.fail('Didn\'t return structured error')
    //                 }
    //             }
    //         });
    //     });
    // });

    // describe('When I make a simple get request', function() {
    //     it('should return a 200 OK', function(done) {
    //         db.platform_request("/", {
    //             "function": "get",
    //             "parameters": {
    //                 "addresses" : [
    //                     "/TestUser/",
    //                     "/AnotherUser/Shared/Another/Folder/One",
    //                     81,
    //                     "person"
    //                 ]
    //             }
    //         }, function(error, response) {
    //             if (error != null) {
    //                 logger.log(error);
    //                 assert.fail('Just threw a connection error')
    //             } else {
    //                 if (response.error != null) {
    //                     jsonout(response);
    //                     assert.fail('Returned an error')
    //                 } else {
    //                     jsonout(response);
    //                 }
    //                 done();
    //             }
    //         });
    //     });
    // });

    // describe('When I make a simple save request', function() {
    //     it('should return a 200 OK', function(done) {
    //         db.platform_request("/", {
    //             "function": "save",
    //             "parameters": {
    //                 "objects" : [{
    //                     "_id":"436",
    //                     "name": "Test"+Math.random(),
    //                     "path":"/TestUser/",
    //                     "person":{
    //                         "first_name":"Marcus",
    //                         "last_name":"L2",
    //                         "office_number" : 25
    //                     }
    //                 }]
    //             }
    //         }, function(error, response) {
    //             if (error != null) {
    //                 logger.log(error);
    //                 assert.fail('Just threw a connection error')
    //             } else {
    //                 if (response.error != null) {
    //                     jsonout(response);
    //                     assert.fail('Returned an error')
    //                 } else {
    //                     jsonout(response);
    //                 }
    //                 done();
    //             }
    //         });
    //     });
    // });

    describe('When I make a save a simple type', function() {
        it('should return a 200 OK', function(done) {
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
                                min_length: 10
                            },{
                                name: "last_name",
                                display_name: "Last Name",
                                type: "text",
                                max_length: 3
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
                if (error != null) {
                    logger.log(error);
                    assert.fail('Just threw a connection error')
                } else {
                    if (response.error != null) {
                        jsonout(response);
                        assert.fail('Returned an error')
                    } else {
                        jsonout(response);
                    }
                    done();
                }
            });
        });
    });

});