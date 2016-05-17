// Import the necessary gulp plugins
var gulp = require('gulp');
var gulpif = require('gulp-if');
var filter = require('gulp-filter');
var sass = require('gulp-sass');
var less = require('gulp-less');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var mainBowerFiles = require('main-bower-files');
var concat = require('gulp-concat');

// Declare the tasks

// SCSS to CSS compilation
gulp.task('sass', function (done) {
  gulp.src('./assets/scss/app.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(gulp.dest('./dist/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({extname: '.min.css'}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/css/'))
    .on('end', done);
});

// JS uglified and merged
gulp.task('js', function (done) {
  gulp.src('./assets/js/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./dist/js/'))
    .pipe(uglify())
    .pipe(rename({extname: '.min.js'}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/js/'))
    .on('end', done);
});

// Images
gulp.task('images', function (done) {
  gulp.src('./assets/images/*')
    .pipe(gulp.dest('./dist/images/'))
    .on('end', done);
});

// Bower files
gulp.task('bower', function (done) {
  var jsFilter = filter('**/*.js', {restore: true});
  var lessFilter = filter('**/*.less', {restore: true});

  gulp.src(mainBowerFiles())
    .pipe(lessFilter)
    .pipe(less())
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(concat('bower.min.css'))
    .pipe(lessFilter.restore)
    .pipe(jsFilter)
    .pipe(concat('bower.min.js'))
    .pipe(uglify())
    .pipe(jsFilter.restore)
    .pipe(gulp.dest('./dist/lib/'))
    .on('end', done);
});

// Watching files for change
gulp.task('watch', function () {
  gulp.watch(['./assets/scss/*'], ['sass']);
  gulp.watch(['./assets/js/*'], ['js']);
});

// Set default task to scss
gulp.task('default', ['sass', 'js', 'images', 'bower']);