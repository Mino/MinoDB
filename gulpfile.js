var gulp = require('gulp');
var gutil = require('gulp-util');
var plumber = require('gulp-plumber');
var logger = require('mino-logger');

var less = require('gulp-less');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var gulpImports = require('gulp-imports');
var nodemon = require('gulp-nodemon');
var path = require('path');

var docs_to_json = require('sa-docs-to-json');

var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');

require('./default_plugins/admin_server/gulpfile')(gulp);
require('./default_plugins/browser_server/gulpfile')(gulp);
require('./default_plugins/auth/gulpfile')(gulp);
require('./default_plugins/permissions/gulpfile')(gulp);
require('./MinoDB/ui_server/gulpfile')(gulp);

var throw_errors = true;

var onError = function (err) {  
  gutil.beep();
  console.log(err);
  if (throw_errors) {
    throw err;
  }
};

if (gulp.env.loglevel) {
    logger.set_level(gulp.env.loglevel);
}

gulp.task('test', function(cb){
    // gulp.src( [ 'MinoDB/**/*.js', '!MinoDB/ui_server/**/*' ] )
    // .pipe(istanbul())
    // .pipe(istanbul.hookRequire())
    // .on( 'finish', function () {
        gulp.src( [ 'test/test.js' ] )
        .pipe( mocha( {
            // reporter: 'spec'
        }))
        // .pipe(istanbul.writeReports())
        .on('end', cb)
        .pipe(plumber(onError))

    // })
    // .on('error', gutil.log)
});

gulp.task('docs', function() {
    return gulp.src('./docs_src/*.json')
    .pipe(docs_to_json())
    .pipe(gulp.dest('./docs/'))
});

gulp.task('watch', function(){
    gulp.watch('docs_src/**/**.*', ['docs']);
    gulp.watch(['fieldval_themes/**/**.*','common_elements/**/**.*','common_classes/**/**.*'], ['default']);
    gulp.start('browser_watch');
    gulp.start('auth_watch');
    gulp.start('admin_watch');
    gulp.start('ui_watch');
    gulp.start('permissions_watch');
});

gulp.task('default', function(){
    gulp.start('browser_default');
    gulp.start('auth_default');
    gulp.start('admin_default');
    gulp.start('ui_default');
    gulp.start('permissions_default');
})

gulp.task('dev', function(){
    gulp.start('default');
    gulp.start('watch');
})