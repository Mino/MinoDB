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

var wrap_path = function(relative){
    return path.join(__dirname,relative);
}

var onError = function (err) {
    gutil.beep();
    console.log(err);
    this.emit('end');
};

module.exports = function(gulp) {
    gulp.task('permissions_less', function(){
        return gulp.src([
            wrap_path('./config_server/public_src/style/style.less')
        ])
        .pipe(plumber(onError))
        .pipe(less())
        .pipe(concat('style.css'))
        .pipe(gulp.dest(wrap_path('./config_server/public/')));
    });

    gulp.task('permissions_js', function(){
        return gulp.src([
            wrap_path('config_server/public_src/init.js')
        ])
        .pipe(plumber(onError))
        .pipe(gulpImports())
        .pipe(concat('frontend.js'))
        .pipe(gulp.dest(wrap_path('config_server/public/')));
    });

    gulp.task('permissions_watch', function(){
        gulp.watch([wrap_path('config_server/public_src/**/*.js')], ['permissions_js']);
        gulp.watch([wrap_path('config_server/public_src/**/*.less'), wrap_path('config_server/public_src/**/*.subless')], ['permissions_less']);
    });

    gulp.task('permissions_default', function(){
        gulp.start('permissions_js');
        gulp.start('permissions_less');
    });
};
