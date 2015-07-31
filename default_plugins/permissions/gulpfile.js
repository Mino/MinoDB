var gulp = require('gulp');
var gutil = require('gulp-util');
var logger = require('mino-logger');

var nodemon = require('gulp-nodemon');
var path = require('path');

var plumber = require('gulp-plumber');

var less = require('gulp-less');
var concat = require('gulp-concat');
var gulpImports = require('gulp-imports');

var onError = function (err) {
    gutil.beep();
    console.log(err);
    this.emit('end');
};

module.exports = function(gulp) {
    gulp.task('permissions_less', function(){
        gulp.src('./config_server/public_src/style/style.less')
        .pipe(plumber(onError))
        .pipe(less())
        .pipe(concat('style.css'))
        .pipe(gulp.dest('./config_server/public/'));
    });

    gulp.task('permissions_js', function(){
        gulp.src([
            'config_server/public_src/init.js'
        ])
        .pipe(plumber(onError))
        .pipe(gulpImports())
        .pipe(concat('frontend.js'))
        .pipe(gulp.dest('config_server/public/'))
    });

    gulp.task('permissions_watch', function(){

        gulp.watch(['config_server/public_src/**/*.js'], ['js']);
        gulp.watch(['config_server/public_src/**/*.less', 'config_server/public_src/**/*.subless'], ['less']);

    });

    gulp.task('permissions_default', function(){
        gulp.start('permissions_js');
        gulp.start('permissions_less');
    })
}
