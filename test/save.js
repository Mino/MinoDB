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
                "_id" : "1",
                "name" : "One",
                "path" : "/AnotherUser/Shared/Another/Folder/",
                "person" : {
                    "first_name" : "John",
                    "last_name" : "Won",
                }
            }
            var object2 = {
                "_id" : "2",
                "name" : "Two",
                "path" : "/TestUser/Diff/Another/Folder/",
                "person" : {
                    "first_name" : "John",
                    "last_name" : "Too",
                }
            }
            var object3 = {
                "_id" : "2",
                "name" : "Two (CONFLICT)",
                "path" : "/TestUser/Diff/Another/Folder/",
                "person" : {
                    "first_name" : "John",
                    "last_name" : "Too (CONFLICTING)",
                }
            }

            //Connect the database
            require('../api/database').connect(function(){
                save(user,{
                    objects: [object,object2,object3]
                },function(output){
                    logger.log(JSON.stringify(output, null, 4))
                    expect(output.error).to.equal(undefined);
                    done();
                })
            });



        });

    });
    
});