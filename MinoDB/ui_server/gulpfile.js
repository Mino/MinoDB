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

var wrap_path = function(relative){
    return path.join(__dirname,relative);
}

module.exports = function(gulp){

    var onError = function (err) {  
      gutil.beep();
      console.log(err);
    };

    //LESS compilation
    gulp.task('ui_public_less', function(){
        gulp.src(wrap_path('../../bower_components/font-awesome/fonts/*'))
        .pipe(gulp.dest(wrap_path('./public/fonts/')));

        return gulp.src(wrap_path('./public_src/style/style.less'))
        .pipe(plumber(onError))
        .pipe(less())
        .pipe(concat('style.css'))
        .pipe(gulp.dest(wrap_path('./public/')));
    });
    //LESS compilation
    gulp.task('ui_toolbar_less', function(){
        return gulp.src(wrap_path('./toolbar_src/style/style.less'))
        .pipe(plumber(onError))
        .pipe(less())
        .pipe(concat('toolbar_style.css'))
        .pipe(gulp.dest(wrap_path('./public/')));
    });
    gulp.task('ui_less', function(){
        gulp.start('ui_public_less');
        gulp.start('ui_toolbar_less');
    });

    var public_js_task = null;

    //JS compilation
    gulp.task('ui_public_js', function(){
        if(public_js_task){
            public_js_task.stop();
        }
        public_js_task = this;
        return gulp.src([
            wrap_path('./public_src/init.js')
        ])
        .pipe(plumber(onError))
        .pipe(gulpImports())
        .on('error', onError)
        .pipe(concat('frontend.js'))
        .pipe(gulp.dest(wrap_path('./public/')))
    });
    gulp.task('ui_toolbar_js', function(){
        return gulp.src([
            wrap_path('./toolbar_src/init.js')
        ])
        .pipe(plumber(onError))
        .pipe(gulpImports())
        .on('error', onError)
        .pipe(concat('toolbar.mustache'))
        .pipe(gulp.dest(wrap_path('./views/')))
    });
    gulp.task('ui_js', function(){
        gulp.start('ui_public_js');
        gulp.start('ui_toolbar_js');
    })


    gulp.task('ui_watch', function(){
        gulp.watch([wrap_path('./public_src/**/*.js')], ['ui_public_js']);
        gulp.watch([wrap_path('./public_src/**/*.less'),wrap_path('./public_src/**/*.subless')], ['ui_public_less']);

        gulp.watch([wrap_path('./toolbar_src/**/*.js')], ['ui_toolbar_js']);
        gulp.watch([wrap_path('./toolbar_src/**/*.less'),wrap_path('./toolbar_src/**/*.subless')], ['ui_toolbar_less']);
    });

    gulp.task('ui_default', function(){
        gulp.start('ui_js');
        gulp.start('ui_less');
    })
}