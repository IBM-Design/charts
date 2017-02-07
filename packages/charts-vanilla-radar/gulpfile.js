var gulp        = require('gulp'),
    babel = require('gulp-babel'),
    browserSync = require('browser-sync')
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    sourcemaps = require('gulp-sourcemaps');



gulp.task('serve', ['compile-js', 'compile-scss'], function(){
  browserSync.init({
    server: {
      baseDir:'./'
    }
  })

  gulp.watch(['src/scripts/*.js'], ['compile-js'])
  gulp.watch(["src/styles/*.scss"], ['compile-scss']);
  gulp.watch(['*.html','src/styles/*.scss','src/scripts/*.js']).on('change', browserSync.reload)

})

gulp.task('compile-js', function(){
  return gulp.src('src/scripts/*.js')
              .pipe(plumber())
              .pipe(sourcemaps.init())
              .pipe(babel({
                presets:['es2015']
              }))
              .pipe(sourcemaps.write('maps'))
              .pipe(gulp.dest('lib'))
})

gulp.task('compile-scss', function(){
  return gulp.src('src/styles/*.scss')
              .pipe(plumber())
              .pipe(sourcemaps.init())
              .pipe(sass().on('error', sass.logError))
              .pipe(sourcemaps.write('maps'))
              .pipe(gulp.dest('lib'))
})

gulp.task('default', ['serve'])