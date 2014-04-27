var should = require('should');
var expect = require('expect.js');
var logger = require('tracer').console();
var Path = require('../api/Models/Path')

describe('Path', function() {

    describe('Construction', function() {

        it('should create a path for a single folder', function(done) {
            var path = new Path();
            expect(path.init("/Test/")).to.equal(null);
            expect(path.object_names[0]).to.equal("Test");
            expect(path.is_folder).to.equal(true);
            expect(path.length).to.equal(1);
            expect(path.toString()).to.equal("/Test/");
            done();
        });

        it('should create a path for a folder and item', function(done) {
            var path = new Path();
            expect(path.init("/Test/Item")).to.equal(null);
            expect(path.object_names[0]).to.equal("Test");
            expect(path.object_names[1]).to.equal("Item");
            expect(path.is_folder).to.equal(false);
            expect(path.length).to.equal(2);
            expect(path.toString()).to.equal("/Test/Item");
            done();
        });

        it('should create a path for two folders', function(done) {
            var path = new Path();
            expect(path.init("/Test/Subfolder/")).to.equal(null);
            expect(path.object_names[0]).to.equal("Test");
            expect(path.object_names[1]).to.equal("Subfolder");
            expect(path.is_folder).to.equal(true);
            expect(path.length).to.equal(2);
            expect(path.toString()).to.equal("/Test/Subfolder/");
            done();
        });

        it('init should throw an error for an empty path ', function(done) {
            var path = new Path();
            expect(path.init("")).to.not.equal(null);
            done();
        });

        it('init should throw an error for an overly-long path ', function(done) {
            var path = new Path();
            var string = Array(500).join("a");
            expect(path.init(string)).to.not.equal(null);
            done();
        });

        it('init should throw an error for a path with two /s ', function(done) {
            var path = new Path();
            expect(path.init("//Test/")).to.not.equal(null);
            done();
        });

        it('init should throw an error for a path containing an invalid character ', function(done) {
            var path = new Path();
            expect(path.init("/Te~st/")).to.not.equal(null);
            done();
        });

        it('init should throw an error for a path that doesn\'t start with /', function(done) {
            var path = new Path();
            expect(path.init("Test/")).to.not.equal(null);
            done();
        });

        it('init should throw an error for single object path that doesn\'t end with /', function(done) {
            var path = new Path();
            expect(path.init("/Test")).to.not.equal(null);
            done();
        });

    });

    describe('username_for_privilege', function() {

        it('should return the user for their root (read)', function(done) {
            var path = new Path();
            path.init("/Test/");
            expect(path.username_for_privilege("Test", false)).to.equal("Test");
            done();
        });

        it('should return the user for their root (write)', function(done) {
            var path = new Path();
            path.init("/Test/");
            expect(path.username_for_privilege("Test", true)).to.equal("Test");
            done();
        });

        it('should return the user for a folder in their root (read)', function(done) {
            var path = new Path();
            path.init("/Test/Subfolder/");
            expect(path.username_for_privilege("Test", false)).to.equal("Test");
            done();
        });

        it('should return the user for a folder in their root (write)', function(done) {
            var path = new Path();
            path.init("/Test/Subfolder/");
            expect(path.username_for_privilege("Test", true)).to.equal("Test");
            done();
        });

        it('should return the user for the "Privileges" folder if reading', function(done) {
            var path = new Path();
            path.init("/Test/Privileges/");
            expect(path.username_for_privilege("Test", false)).to.equal("Test");
            done();
        });

        it('should return the user for an item named "Privileges" if writing', function(done) {
            var path = new Path();
            path.init("/Test/Privileges");
            expect(path.username_for_privilege("Test", true)).to.equal("Test");
            done();
        });

        it('should return "Mino" for the "Privileges" folder if requested by "Mino"', function(done) {
            var path = new Path();
            path.init("/Test/Privileges/");
            expect(path.username_for_privilege("Mino", true)).to.equal("Mino");
            done();
        });

        it('should return null for the "Privileges" folder if requested by anyone other than "Mino"', function(done) {
            var path = new Path();
            path.init("/Test/Privileges/");
            expect(path.username_for_privilege("AnotherUser", false)).to.equal(null);
            done();
        });

    });

    describe('path_for_child_with_name', function() {

        it('should return an item child path', function(done) {
            var path = new Path();
            path.init("/Test/");
            var child_path = path.path_for_child_with_name("Item", false);
            expect(child_path.object_names[0]).to.equal("Test");
            expect(child_path.object_names[1]).to.equal("Item");
            expect(child_path.is_folder).to.equal(false);
            expect(child_path.length).to.equal(2);
            expect(child_path.toString()).to.equal("/Test/Item");
            done();
        });

        it('should return a folder child path', function(done) {
            var path = new Path();
            path.init("/Test/");
            var child_path = path.path_for_child_with_name("Subfolder", true);
            expect(child_path.object_names[0]).to.equal("Test");
            expect(child_path.object_names[1]).to.equal("Subfolder");
            expect(child_path.is_folder).to.equal(true);
            expect(child_path.length).to.equal(2);
            expect(child_path.toString()).to.equal("/Test/Subfolder/");
            done();
        });

        it('should return an error if called on an item path', function(done) {
            var path = new Path();
            path.init("/Test/Item");
            var child_path = path.path_for_child_with_name("Subfolder", true);
            expect(child_path.error).to.not.equal(null);
            done();
        });

    });


    describe('parent_path', function() {

        it('should return a parent folder path from a folder', function(done) {
            var path = new Path();
            path.init("/Test/Subfolder/");
            var parent_path = path.parent_path();
            expect(parent_path.object_names[0]).to.equal("Test");
            expect(parent_path.is_folder).to.equal(true);
            expect(parent_path.length).to.equal(1);
            expect(parent_path.toString()).to.equal("/Test/");
            done();
        });

        it('should return a parent folder path from an item', function(done) {
            var path = new Path();
            path.init("/Test/Item");
            var parent_path = path.parent_path();
            expect(parent_path.object_names[0]).to.equal("Test");
            expect(parent_path.is_folder).to.equal(true);
            expect(parent_path.length).to.equal(1);
            expect(parent_path.toString()).to.equal("/Test/");
            done();
        });

        it('should return an error if called on a root path', function(done) {
            var path = new Path();
            path.init("/Test/");
            var parent_path = path.parent_path();
            expect(parent_path.error).to.not.equal(null);
            done();
        });

    });



});