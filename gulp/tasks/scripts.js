var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    babel = require('gulp-babel'),
    concat = require('gulp-concat'),
    plumber = require('gulp-plumber'),
    sourcemaps = require('gulp-sourcemaps'),
    gulpif = require('gulp-if'),
    del = require('del'),
    preprocess = require('gulp-preprocess'),
    globalConfig = require('../config');

var localConfig = {
  src: function() {
    return ['./src/app/app.module.js',
        './src/**/*.js',
        '!./src/app/config/!(' + globalConfig.environment + '.js)'];
  },
  dest: function () {
    return './build/js/';
  },
  buildFileName: 'all.js',
  cleanSrc: ['./build/js/**/*', '!./build/js/vendor/**']
};

gulp.task('clean:scripts', function (cb) {
  del(localConfig.cleanSrc, cb);
});

gulp.task('scripts', ['clean:scripts'], function() {
  return gulp.src(localConfig.src())
    .pipe(plumber({errorHandler: globalConfig.errorHandler}))
    .pipe(preprocess())
    .pipe(gulpif(globalConfig.development(), jshint()))
    .pipe(gulpif(globalConfig.development(), jshint.reporter('jshint-stylish')))
    .pipe(sourcemaps.init())
      .pipe(babel())
      .pipe(gulpif(globalConfig.production(), concat(localConfig.buildFileName)))
      .pipe(gulpif(globalConfig.production(), uglify()))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(localConfig.dest()));
});
