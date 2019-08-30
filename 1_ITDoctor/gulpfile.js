// https://www.youtube.com/watch?v=jjqvl0M0tGw
const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('sass-compile', () => {
  return gulp.src('./scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('./')) // текущая берется от .dest()
    .pipe(gulp.dest('./css/'));
});

gulp.task('watch', () => {
  // за какими файлами следим; какой таск запускаем при измении файлов
  gulp.watch('./scss/**/*.scss', gulp.series('sass-compile'));
});
