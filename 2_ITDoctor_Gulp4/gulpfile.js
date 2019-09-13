// https://www.youtube.com/watch?v=r2S423N-ETA
// https://www.youtube.com/watch?v=izqR0UY11rk - next

const gulp = require('gulp');
const concat = require('gulp-concat');

const cssFiles = ['src/css/media.css', 'src/css/media.css'];

const styles = () => {
  return gulp
    .src(cssFiles)
    .pipe(concat('style.css'))
    .pipe(gulp.dest('build/css'));
};

const scripts = () => {};

gulp.task('styles', styles);
gulp.task('scripts', scripts);
