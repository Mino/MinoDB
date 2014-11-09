var should = require('should');
var expect = require('expect.js');

var logger = require('tracer').console();
var get = require('../../../server/api/functions/get')

describe('get', function() {

    describe('Construction', function() {

        it('should save a basic item', function(done) {
            var user = {
                username: "TestUser"
            }
            var addresses = [
                "37",
                "37.5",
                123,
                123.5, -40.2,
                "452/12",
                "41/",
                "/991",
                true,
                false,
                null,
                "/TestUser/",
                "491/a",
                "491/-7",
                "491/6.5",
                "TypeName",
                "Type Name",
                "TypeName.1",
                "TypeName_1",
                "0",
                "9"
            ]

            //Connect the database
            require('../../../server/database').connect(function(){
                get(user,{
                    addresses: addresses
                },function(output){
                    logger.log(JSON.stringify(output, null, 4))
                    expect(output.error).to.equal(undefined);
                    done();
                })
            });
        });

    });
    
});