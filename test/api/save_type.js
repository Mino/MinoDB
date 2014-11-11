var globals = require('../globals');
var logger = require('tracer').console();
var assert = require('assert');

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