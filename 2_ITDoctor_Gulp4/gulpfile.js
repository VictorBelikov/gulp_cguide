// https://www.youtube.com/watch?v=r2S423N-ETA
// https://www.youtube.com/watch?v=izqR0UY11rk - next

const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const del = require('del');
const browserSync = require('browser-sync').create();

const cssFiles = ['src/css/main.css', 'src/css/media.css'];
const jsFiles = ['src/js/lib.js', 'src/js/main.js'];

const styles = () => {
  return gulp.src(cssFiles)
    .pipe(concat('style.css'))
    .pipe(autoprefixer({ browsers: ['last 5 versions'], cascade: false }))
    .pipe(cleanCSS({ level: 2 }))
    .pipe(gulp.dest('build/css'));
};

const scripts = () => {
  return gulp.src(jsFiles)
    .pipe(concat('script.js'))
    .pipe(uglify({ toplevel: true })) // minify and remove " ", ",", ";"; doesn't support ES6; toplevel - изменяет даже название фукнций до коротких
    .pipe(gulp.dest('build/js'));
};

const clean = () => {
  return del(['build/**']);
};

const watch = () => {
  browserSync.init({
    server: { baseDir: './' },
    notify: false,
  });
  gulp.watch('./src/css/**/*.css', styles);
  gulp.watch('./src/js/**/*.js', scripts);
  gulp.watch('./*.html').on('change', browserSync.reload);
};

gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task('del', clean);
