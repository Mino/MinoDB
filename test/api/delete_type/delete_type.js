var globals = require('../../globals');
var logger = require('tracer').console();
var assert = require('assert');

it('should delete type', function(done) {
    globals.sdk.call({
        "function": "delete_type",
        "parameters": {
            "type_name" : "person"
        }
    }, function(error, response) {
        logger.log(error, response);
        assert.equal(error, null);

        globals.sdk.get(["person"], function(err, res) {
        	logger.log(err,res);
            assert.equal(err, null);
            var person_type = res.objects[0];
            assert.equal(person_type, null);
            done();
        })
    });
});
