'use strict';

import gulp from 'gulp';
import browserSync from 'browser-sync';
import loadPlugins from 'gulp-load-plugins'

const $ =loadPlugins();

const reload = browserSync.reload;

gulp.task('babel', () => {
    gulp.src('src/app/**/*.js')
        .pipe($.sourcemaps.init())
        .pipe($.babel())
        .pipe($.concat('app.js'))
        .pipe($.sourcemaps.write('maps'))
        .pipe($.rev())
        .pipe(gulp.dest('dist/app/js'))
        .pipe($.notify({ message: 'babel task complete' }));

})

gulp.task('less', () => {
    gulp.src('src/**/*.less')
        .pipe($.sourcemaps.init())
        .pipe($.less())
        .pipe($.concat('app.css'))
        .pipe($.sourcemaps.write('maps'))
        .pipe($.rev())
        .pipe(gulp.dest('dist/app/styles'))
        .pipe($.notify({ message: 'less task complete' }));

})

gulp.task('js-watch', ['babel'], browserSync.reload);

gulp.task('build', ['inject-build'], () => {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });

    gulp.watch("src/**/*.html").on('change', browserSync.reload);
    gulp.watch('*.less', ['less']);
    gulp.watch("src/app/*.js", ['js-watch']);
});


gulp.task('watch', () => {
    gulp.watch('src/**/*.less', ['less']);
    gulp.watch('src/app/**/*.js', ['babel']);
})
