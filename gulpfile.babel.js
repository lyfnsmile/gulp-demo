'use strict';

import gulp from 'gulp';
import babel from 'gulp-babel';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import notify from 'gulp-notify';
import browserSync from 'browser-sync';
import eslint from 'gulp-eslint'

var reload = browserSync.reload;

gulp.task('eslint', () => {
  return gulp.src('src/app/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('sass', () => {
  gulp.src('src/assets/styles/*.scss')
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({ stream: true }))
    .pipe(notify({ message: 'sass task complete' }));
})

gulp.task('babel', () => {
  gulp.src('src/app/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dist'))
    .pipe(notify({ message: 'babel task complete' }));



})

gulp.task('js-watch', ['babel'], browserSync.reload);

gulp.task('serve', ['sass', 'babel'], () => {
  browserSync.init({
    server: {
      baseDir: "./src"
    }
  });

  gulp.watch("*.html").on('change', browserSync.reload);
  gulp.watch('*.scss', ['sass']);
  gulp.watch("src/app/*.js", ['js-watch']);
});

gulp.task('default', ['serve']);

gulp.task('watch', () => {
  gulp.watch('src/assets/styles/*.scss', ['sass']);
  gulp.watch('src/app/**/*.js', ['babel']);
})
