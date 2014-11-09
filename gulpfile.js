var gulp = require('gulp');
var gutil = require('gulp-util');
var plumber = require('gulp-plumber');
var logger = require('tracer').console();

var less = require('gulp-less');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var gulpImports = require('gulp-imports');
var nodemon = require('gulp-nodemon');
var path = require('path');


var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');

require('./default_plugins/admin_server/gulpfile')(gulp);
require('./default_plugins/browser_server/gulpfile')(gulp);
require('./MinoDB/ui_server/gulpfile')(gulp);

var onError = function (err) {  
  gutil.beep();
  console.log(err);
};

gulp.task('test', function(cb){
    gulp.src( [ 'test/test.js' ] )
    .pipe( mocha( {
        reporter: 'spec'
    }))
    .on('error', gutil.log)
    .pipe(istanbul.writeReports())
    .on('end', cb);
});

gulp.task('watch', function(){
    gulp.start('browser_watch');
    gulp.start('admin_watch');
    gulp.start('ui_watch');
});

gulp.task('default', function(){
    gulp.start('browser_default');
    gulp.start('admin_default');
    gulp.start('ui_default');
})

gulp.task('dev', function(){
    gulp.start('default');
    gulp.start('watch');
})