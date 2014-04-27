var should = require('should');
var expect = require('expect.js');
var logger = require('tracer').console();
var Privilege = require('../api/Models/Privilege')

describe('Privilege', function() {

    describe('Construction', function() {

        it('should create a privilege', function(done) {
            var privilege = new Privilege();
            var handler = {
                username: "NotTest"
            }
            var privilege_object = {
                "granted_to": "TestUser2",
                "path": "/Test/Shared/",
                "grant_write" : true
            }
            expect(privilege.init(privilege_object,handler)).to.equal(null);
            done();
        });

    });

});