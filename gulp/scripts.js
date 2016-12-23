'use strict';

import path from 'path'
import gulp from 'gulp'
import conf from './conf'
import loadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync'

const $ =loadPlugins();


gulp.task('scripts-reload', function() {
    return buildScripts()
        .pipe(browserSync.stream());
});

gulp.task('scripts', function() {
    return buildScripts();
});

function buildScripts() {
    return gulp.src(path.join(conf.src, '/app/**/*.js'))
        //.pipe($.eslint())
        //.pipe($.eslint.format())
        //.pipe(eslint.failAfterError())
        .pipe($.size())
        .pipe(gulp.dest(path.join(conf.tmp, '/serve/app')));
};
