var should = require('should');
var expect = require('expect.js');
var logger = require('tracer').console();
var TypeVersion = require('../api/Models/TypeVersion')

describe('TypeVersion', function() {

    describe('Construction', function() {

        it('should create a typeversion for a basic type', function(done) {
            var tv = new TypeVersion("MyType");
            var type_object = {
                "description": "My description",
                "name": "MyType",
                "display_name": "My Type",
                "fields": [{
                    "name": "first_name",
                    "display_name": "First Name",
                    "type": "Text",
                    "min_length": 2,
                    "max_length": 32
                }]
            }
            expect(tv.init_for_saving(type_object)).to.equal(null);
            done();
        });

    });

});