var should = require('should');
var expect = require('expect.js');
var logger = require('tracer').console();
var ValidationRule = require('../../server/api/Models/ValidationRule')

describe('ValidationRule', function() {

    describe('Construction', function() {

        it('should create a ValidationRule for a basic field', function(done) {
            var vr = new ValidationRule();
            var type_object = {
                description: "My description",
                name: "person",
                display_name: "Person",
                type: "nested",
                fields: {
                    first_name: {
                        display_name: "First Name",
                        type: "text",
                        min_length: 2,
                        max_length: 32
                    },
                    last_name: {
                        display_name: "Last Name",
                        type: "text",
                        min_length: 2,
                        max_length: 32
                    },
                    address: {
                        display_name: "Address",
                        description: "An address. This is a nested test.",
                        type: "nested",
                        fields: {
                            house_number: {
                                type: "number",
                                integer: true,
                                minimum: 1
                            },
                            line_1: {
                                type: "text"
                            },
                            line_2: {
                                type: "text"
                            },
                            line_3: {
                                type: "text"
                            },
                            country: {
                                type: "choice",
                                choices: ["UK","US"]
                            }
                        }
                    }
                }
            }
            var init_result = vr.init_for_saving(type_object);
            logger.log(JSON.stringify(init_result,null,4));
            expect(init_result).to.equal(null);

            var object_validator = new Validator({
                person: {
                    first_name: "Marcus",
                    last_name: "L",
                    address: {
                        house_number: 37.5,
                        line_1: "40 Lorem Ipsum",
                        line_3: "This is line 3",
                        country: "ESP"
                    }
                }
            });

            
            vr.validate_object(object_validator);

            logger.log(JSON.stringify(object_validator.end(),null,4));

            done();
        });

    });

});