var should = require('should');
var expect = require('expect.js');
var logger = require('tracer').console();
var Permission = require('../api/Models/Permission')

describe('Permission', function() {

    describe('Construction', function() {

        it('should create a permission', function(done) {
            var permission = new Permission();
            var handler = {
                username: "Test"
            }
            var permission_object = {
                "granted_to": "TestUser2",
                "path": "/Test/Shared/",
                "grant_write" : true
            }
            expect(permission.init(permission_object,handler)).to.equal(null);
            done();
        });

    });

});