'use strict';

import gulp from 'gulp';
import babel from 'gulp-babel';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import notify from 'gulp-notify';
import browserSync from 'browser-sync';
import eslint from 'gulp-eslint'
import concat from 'gulp-concat'
import rev from 'gulp-rev'
import uglify from 'gulp-uglify';
import del from 'del';
import sourcemaps from 'gulp-sourcemaps'
import inject from 'gulp-inject'

var reload = browserSync.reload;

gulp.task('eslint', () => {
  return gulp.src('src/app/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});


gulp.task('clean', () =>{
  return del('dist/**').then(paths => {
    console.log('Deleted files and folders:\n', paths.join('\n'));
  });
});

gulp.task('inject-css', function () {
  var target = gulp.src('./src/index.html');
  // It's not necessary to read the files (will speed up things), we're only after their paths: 
  var sources = gulp.src(['./src/**/*.scss', './src/**/*.css'], {read: false});
 
  return target.pipe(inject(sources))
    .pipe(gulp.dest('./src'));
});


gulp.task('sass', () => {
  gulp.src('src/**/*.scss')
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(concat('app.css'))
    .pipe(rev())
    .pipe(gulp.dest('dist/style'))
    .pipe(browserSync.reload({ stream: true }))
    .pipe(notify({ message: 'sass task complete' }));
})

gulp.task('babel', () => {
  gulp.src('src/app/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat('app.js'))
    .pipe(sourcemaps.write('maps'))
    .pipe(rev())
    .pipe(gulp.dest('dist/js'))
    .pipe(notify({ message: 'babel task complete' }));

})

gulp.task('js-watch', ['babel'], browserSync.reload);

gulp.task('serve', ['sass', 'babel'], () => {
  browserSync.init({
    server: {
      baseDir: "./src"
    }
  });

  gulp.watch("src/**/*.html").on('change', browserSync.reload);
  gulp.watch('*.scss', ['sass']);
  gulp.watch("src/app/*.js", ['js-watch']);
});


gulp.task('watch', () => {
  gulp.watch('src/**/*.scss', ['sass']);
  gulp.watch('src/app/**/*.js', ['babel']);
})


gulp.task('build', () => {
  gulp.watch('src/**/*.scss', ['sass']);
  gulp.watch('src/app/**/*.js', ['babel']);
})
