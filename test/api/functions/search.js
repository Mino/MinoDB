var should = require('should');
var expect = require('expect.js');

var logger = require('tracer').console();
var search = require('../../../server/api/functions/search')

describe('search', function() {

    describe('Construction', function() {

        it('should perform a basic search', function(done) {
            var user = {
                username: "TestUser"
            }

            //Connect the database
            require('../../../server/database').connect(function(){
                search(user,{
                    paths: ["/TestUser/"]
                },function(output){
                    logger.log(JSON.stringify(output, null, 4))
                    expect(output.error).to.equal(undefined);
                    done();
                })
            });

        });

    });
    
});