// https://www.youtube.com/watch?v=vW51JUVT66w&t
// https://www.youtube.com/watch?v=kesyrCZE1bA&t
const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync');
const concat = require('gulp-concat');
const uglify = require('gulp-uglifyjs');
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');
const del = require('del');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const cache = require('gulp-cache');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', () => {
  return gulp.src('./app/sass/**/*.+(scss|sass)')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer(['last 10 versions', 'ie 9'], { cascade: true }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./app/css'))
    .pipe(browserSync.reload({ stream: true })); // inject .css into index.html without page reload
});

gulp.task('scripts', () => {
  return gulp.src(['app/libs/jquery/dist/jquery.min.js', 'app/libs/magnific-popup/jquery.magnific-popup.min.js'])
    .pipe(concat('libs.min.js')) // concat JS
    .pipe(uglify({ toplevel: true })) // minify and remove " ", ",", ";"; doesn't support ES6; toplevel - изменяет даже название фукнций до коротких
    .pipe(gulp.dest('app/js'));
});

gulp.task('css-libs', ['sass'], () => {
  return gulp.src('app/css/libs.css')
    .pipe(cssnano()) // minify CSS
    .pipe(rename({ suffix: '.min' })) // помещаем минифиц. css в новый файл с суффиксом .min
    .pipe(gulp.dest('app/css'));
});

gulp.task('img', () => { // сжимаем изображения
  return gulp.src('app/img/**/*')
    .pipe(cache(imagemin({
      interlaced: true,
      progressive: true,
      svgoPlugins: [{ removeViewBox: false }],
      use: [pngquant()],
    })))
    .pipe(gulp.dest('dist/img'));
});

gulp.task('browser-sync', () => {
  browserSync({
    server: { baseDir: './app' },
    notify: false,
  });
});

gulp.task('clean', () => {
  return del.sync(['dist/**']); // delete everything in dist directory
});

gulp.task('clear-cache', () => {
  return cache.clearAll();
});

gulp.task('build', ['clean', 'img', 'css-libs', 'scripts'], () => {
  gulp.src(['app/css/main.css', 'app/css/libs.min.css']).pipe(gulp.dest('dist/css'));
  gulp.src('app/fonts/**/*').pipe(gulp.dest('dist/fonts'));
  gulp.src('app/js/**/*.js').pipe(gulp.dest('dist/js'));
  gulp.src('app/*.html').pipe(gulp.dest('dist'));
});

// 2-ой массив: таски, кот.вып. перед запуском watch --> конфигурир. сервер и компилим с инжектом.
gulp.task('watch', ['css-libs', 'scripts', 'browser-sync'], () => {
  gulp.watch('./app/sass/**/*.+(scss|sass)', ['sass']);
  gulp.watch(['./app/*.html', './app/js/**/*.js'], browserSync.reload);
});

gulp.task('default', ['watch']);
