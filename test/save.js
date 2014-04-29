var should = require('should');
var expect = require('expect.js');
var logger = require('tracer').console();
var save = require('../api/functions/save')

describe('save', function() {

    describe('Construction', function() {

        it('should save a basic item', function(done) {
            var user = {
                username: "TestUser"
            }
            var object = {
                "name" : "One",
                "path" : "/TestUser/Diff/Another/Folder/",
                "person" : {
                    "first_name" : "John",
                    "last_name" : "Smith",
                }
            }
            save(user,{
                objects: [object]
            },function(err,res){
                logger.log(JSON.stringify(err, null, 4))
                expect(err).to.equal(null);
                done();
            })
        });

    });

});