var logger = require('tracer').console();
var assert = require("assert");

var Path = require('../../common_classes/Path')

describe('Path', function() {

    describe('Construction', function() {

        it('should create a path for a single folder', function(done) {
            var path = new Path();
            assert.equal(path.init("/Test/"),null);
            assert.equal(path.object_names[0],"Test");
            assert.equal(path.is_folder,true);
            assert.equal(path.length,1);
            assert.equal(path.toString(),"/Test/");
            done();
        });

        it('should create a path for a folder and item', function(done) {
            var path = new Path();
            assert.equal(path.init("/Test/Item"),null);
            assert.equal(path.object_names[0],"Test");
            assert.equal(path.object_names[1],"Item");
            assert.equal(path.is_folder,false);
            assert.equal(path.length,2);
            assert.equal(path.toString(),"/Test/Item");
            done();
        });

        it('should create a path for two folders', function(done) {
            var path = new Path();
            assert.equal(path.init("/Test/Subfolder/"),null);
            assert.equal(path.object_names[0],"Test");
            assert.equal(path.object_names[1],"Subfolder");
            assert.equal(path.is_folder,true);
            assert.equal(path.length,2);
            assert.equal(path.toString(),"/Test/Subfolder/");
            done();
        });

        it('init should throw an error for an empty path ', function(done) {
            var path = new Path();
            assert.notEqual(path.init(""),null);
            done();
        });

        it('init should throw an error for an overly-long path ', function(done) {
            var path = new Path();
            var string = Array(500).join("a");
            assert.notEqual(path.init(string),null);
            done();
        });

        it('init should throw an error for a path with two /s ', function(done) {
            var path = new Path();
            assert.notEqual(path.init("//Test/"),null);
            done();
        });

        it('init should throw an error for a path containing an invalid character ', function(done) {
            var path = new Path();
            assert.notEqual(path.init("/Te~st/"),null);
            done();
        });

        it('init should throw an error for a path that doesn\'t start with /', function(done) {
            var path = new Path();
            assert.notEqual(path.init("Test/"),null);
            done();
        });

        it('init should throw an error for single object path that doesn\'t end with /', function(done) {
            var path = new Path();
            assert.strictEqual(path.init("/Test"),null);
            done();
        });

    });

    describe('username_for_permission', function() {

        it('should return the user for their root (read)', function(done) {
            var path = new Path();
            path.init("/Test/");
            assert.equal(path.username_for_permission("Test", false),"Test");
            done();
        });

        it('should return the user for their root (write)', function(done) {
            var path = new Path();
            path.init("/Test/");
            assert.equal(path.username_for_permission("Test", true),"Test");
            done();
        });

        it('should return the user for a folder in their root (read)', function(done) {
            var path = new Path();
            path.init("/Test/Subfolder/");
            assert.equal(path.username_for_permission("Test", false),"Test");
            done();
        });

        it('should return the user for a folder in their root (write)', function(done) {
            var path = new Path();
            path.init("/Test/Subfolder/");
            assert.equal(path.username_for_permission("Test", true),"Test");
            done();
        });

        it('should return the user for the "Permissions" folder if reading', function(done) {
            var path = new Path();
            path.init("/Test/Permissions/");
            assert.equal(path.username_for_permission("Test", false),"Test");
            done();
        });

        it('should return the user for an item named "Permissions" if writing', function(done) {
            var path = new Path();
            path.init("/Test/Permissions");
            assert.equal(path.username_for_permission("Test", true),"Test");
            done();
        });

        it('should return "Mino" for the "Permissions" folder if requested by "Mino"', function(done) {
            var path = new Path();
            path.init("/Test/Permissions/");
            assert.equal(path.username_for_permission("Mino", true),"Mino");
            done();
        });

        it('should return null for the "Permissions" folder if requested by anyone other than "Mino"', function(done) {
            var path = new Path();
            path.init("/Test/Permissions/");
            assert.equal(path.username_for_permission("AnotherUser", false),null);
            done();
        });

    });

    describe('path_for_child_with_name', function() {

        it('should return an item child path', function(done) {
            var path = new Path();
            path.init("/Test/");
            var child_path = path.path_for_child_with_name("Item", false);
            assert.equal(child_path.object_names[0],"Test");
            assert.equal(child_path.object_names[1],"Item");
            assert.equal(child_path.is_folder,false);
            assert.equal(child_path.length,2);
            assert.equal(child_path.toString(),"/Test/Item");
            done();
        });

        it('should return a folder child path', function(done) {
            var path = new Path();
            path.init("/Test/");
            var child_path = path.path_for_child_with_name("Subfolder", true);
            assert.equal(child_path.object_names[0],"Test");
            assert.equal(child_path.object_names[1],"Subfolder");
            assert.equal(child_path.is_folder,true);
            assert.equal(child_path.length,2);
            assert.equal(child_path.toString(),"/Test/Subfolder/");
            done();
        });

        it('should return an error if called on an item path', function(done) {
            var path = new Path();
            path.init("/Test/Item");
            var child_path = path.path_for_child_with_name("Subfolder", true);
            assert.notEqual(child_path.error,null);
            done();
        });

    });


    describe('parent_path', function() {

        it('should return a parent folder path from a folder', function(done) {
            var path = new Path();
            path.init("/Test/Subfolder/");
            var parent_path = path.parent_path();
            assert.equal(parent_path.object_names[0],"Test");
            assert.equal(parent_path.is_folder,true);
            assert.equal(parent_path.length,1);
            assert.equal(parent_path.toString(),"/Test/");
            done();
        });

        it('should return a parent folder path from an item', function(done) {
            var path = new Path();
            path.init("/Test/Item");
            var parent_path = path.parent_path();
            assert.equal(parent_path.object_names[0],"Test");
            assert.equal(parent_path.is_folder,true);
            assert.equal(parent_path.length,1);
            assert.equal(parent_path.toString(),"/Test/");
            done();
        });

        it('should return null if called on a root path', function(done) {
            var path = new Path();
            path.init("/Test/");
            var parent_path = path.parent_path();
            assert.equal(parent_path,null);
            done();
        });

    });



});