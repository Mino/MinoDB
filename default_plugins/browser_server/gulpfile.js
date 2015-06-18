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

module.exports = function(gulp){

    var onError = function (err) {  
      gutil.beep();
      console.log(err);
    };

    gulp.task('browser_public_fonts', function(){
        return gulp.src(wrap_path('../../bower_components/font-awesome/fonts/*'))
        .pipe(gulp.dest(wrap_path('./public/fonts/')));
    });
    gulp.task('browser_public_less', function(){
        return gulp.src(wrap_path('./public_src/style.less'))
        .pipe(plumber(onError))
        .pipe(less())
        .pipe(concat('style.css'))
        .pipe(gulp.dest(wrap_path('./public/')));
    });
    gulp.task('browser_admin_less', function(){
        return gulp.src(wrap_path('./admin_src/style.less'))
        .pipe(plumber(onError))
        .pipe(less())
        .pipe(concat('style.css'))
        .pipe(gulp.dest(wrap_path('./admin/')));
    });
    gulp.task('browser_less', function(){
        gulp.start('browser_public_fonts');
        gulp.start('browser_public_less');
        gulp.start('browser_admin_less');
    });

    var public_js_task = null;
    var admin_js_task = null;

    //JS compilation
    gulp.task('browser_public_js', function(){
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
    gulp.task('browser_admin_js', function(){
        if(admin_js_task){
            admin_js_task.stop();
        }
        admin_js_task = this;
        return gulp.src([
            wrap_path('./admin_src/init.js')
        ])
        .pipe(plumber(onError))
        .pipe(gulpImports())
        .on('error', onError)
        .pipe(concat('frontend.js'))
        .pipe(gulp.dest(wrap_path('./admin/')))
    });
    gulp.task('browser_js', function(){
        gulp.start('browser_public_js');
        gulp.start('browser_admin_js');
    })

    gulp.task('browser_watch', function(){
        gulp.watch([wrap_path('./public_src/**/*.js')], ['browser_public_js']);
        gulp.watch([wrap_path('./public_src/**/*.less'),wrap_path('./public_src/**/*.subless')], ['browser_less']);
        gulp.watch([wrap_path('./admin_src/**/*.js')], ['browser_admin_js']);
        gulp.watch([wrap_path('./admin_src/**/*.less'),wrap_path('./public_src/**/*.subless')], ['browser_admin_less']);
    });

    gulp.task('browser_default', function(){
        gulp.start('browser_js');
        gulp.start('browser_less');
    })
}