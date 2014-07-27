var assert = require("assert");
var logger = require('tracer').console();
var save_type = require('../../../api/functions/save_type')

describe('save_type', function() {

    describe('Construction', function() {

        it('should save a basic type', function(done) {
            var user = {
                username: "TestUser"
            }
            var type = {
				name: "person",
				display_name: "Person",
		        type: "object",
		        fields:{
		        	"first_name" : {
		        		display_name: "First Name",
		        		type: "text",
		        		min_length: 5
		        	},
		        	"last_name" : {
		        		display_name: "Last Name",
		        		type: "text",
		        		max_length: 3
		        	},
		        	"office_number" : {
		        		display_name: "Office Number",
		        		type: "number",
		                description: "Please enter your office number",
		        		minimum: 1,
		        		maximum: 30,
		        		integer: true
		        	}
		        }
		    }

            //Connect the database
            require('../../../server/database').connect(function(){
                save_type(user,{
                    type: type
                },function(output){
                    logger.log(JSON.stringify(output, null, 4))
                    assert.equal(output.error,undefined);
                    done();
                })
            });



        });

    });
    
});