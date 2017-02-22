const gulp = require('gulp');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('compile-scss', () => {
  return gulp.src('src/styles/*.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest('lib'));
});

gulp.task('default', ['compile-scss']);
