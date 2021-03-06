var request = require('request');
var assert = require("assert");
var logger = require('mino-logger');
var globals = require('../globals');

describe('API', function() {

    describe('When I make an invalid API request', function() {
        it('should return an error', function(done) {
            globals.sdk.call({
                "something": "invalid"
            }, function(error, response) {
                logger.debug(error, response);
                assert.notEqual(error, null);
                done();
            });
        });
    });

    describe('When I make save type request', function() {
        require('./save_type/type');
    });

    describe('When I make a save request', function() {
        require('./save/folder');
        require('./save/item');
    });

    describe("When I make get request", function() {
        require('./get/folder');
        require('./get/item');
        require('./get/id');
    });

    describe("When I make delete request", function() {
        require('./delete/folder');
        require('./delete/item');
    });

    describe("When I make search request", function() {
        require('./search/search');
    });

    //Will delete the "person" type
    describe('When I make delete type request', function() {
        require('./delete_type/delete_type');
    });

});