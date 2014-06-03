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

var onError = function (err) {  
  gutil.beep();
  console.log(err);
};


//LESS compilation
gulp.task('public_less', function(){
    gulp.src('./public_src/style/style.less')
    .pipe(plumber(onError))
    .pipe(less())
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./public/'));
});
gulp.task('dynamic_less', function(){
    gulp.src('./public_src/DynamicPages/**/*.less')
    .pipe(plumber(onError))
    .pipe(less())
    .pipe(gulp.dest('./public/DynamicPages/'));
});
gulp.task('less', function(){
    gulp.start('public_less');
    gulp.start('dynamic_less');
});

var public_js_task = null;

//JS compilation
gulp.task('public_js', function(){
    if(public_js_task){
        public_js_task.stop();
    }
    public_js_task = this;
    return gulp.src([
        'ui/public_src/init.js'
    ])
    .pipe(plumber(onError))
    .pipe(gulpImports())
    .on('error', onError)
    .pipe(concat('frontend.js'))
    .pipe(gulp.dest('./ui/public/'))
});
gulp.task('dynamic_js', function(){
    return gulp.src([
        'ui/public_src/DynamicPages/**/*.js'
    ])
    .pipe(plumber(onError))
    .pipe(gulpImports())
    .on('error', onError)
    .pipe(gulp.dest('./ui/public/DynamicPages/'))
});
gulp.task('js', function(){
    gulp.start('public_js');
    gulp.start('dynamic_js');
})



gulp.task('watch', function(){
    gulp.watch(['ui/public_src/**/*.js', '!bower_components/'], ['js']);
    gulp.watch(['ui/public_src/**/*.less','ui/public_src/**/*.subless'], ['less']);
});

gulp.task('default', function(){
    gulp.start('js');
    gulp.start('less');
})

gulp.task('nodemon', function () {
  nodemon({ watch: ['./'], script: 'minodb.js', ext: 'html js', ignore: ['public_src/','public/','node_modules/','bower_components/'] })
    .on('restart', function () {
      console.log('restarted!')
    })
})

gulp.task('dev', function(){
    gulp.start('nodemon');
    gulp.start('watch');
})