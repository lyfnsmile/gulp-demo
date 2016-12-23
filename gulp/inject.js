'use strict';

import path from 'path'
import gulp from 'gulp'
import conf,{errorHandler} from './conf'
import loadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync'

const $ =loadPlugins();

gulp.task('inject-reload', ['inject'], ()=> {
  browserSync.reload();
});

gulp.task('inject', ['scripts', 'styles'], ()=> {
  let injectStyles = gulp.src([
    path.join(conf.tmp, '/serve/**/*.css')
  ], { read: false });

  let injectScripts = gulp.src([
    path.join(conf.src, 'app/**/*.js')
  ])

  let injectOptions = {
    ignorePath: [conf.src, path.join(conf.tmp, '/serve')],
    addRootSlash: false
  };

  return gulp.src(path.join(conf.src, '/*.html'))
    .pipe($.inject(injectStyles, injectOptions))
    .pipe($.inject(injectScripts, injectOptions))
    .pipe(gulp.dest(path.join(conf.tmp, '/serve')));
});


gulp.task('inject-build', ['scripts', 'styles'], ()=> {
  let injectStyles = gulp.src([
    path.join(conf.tmp, '/serve/**/*.css')
  ], { read: false });

  let injectScripts = gulp.src([
    path.join(conf.src, 'app/**/*.js')
  ])

  let injectOptions = {
    ignorePath: [conf.src, path.join(conf.dist, '/app')],
    addRootSlash: false
  };

  return gulp.src(path.join(conf.src, '/*.html'))
    .pipe($.inject(injectStyles, injectOptions))
    .pipe($.inject(injectScripts, injectOptions))
    .pipe(gulp.dest(path.join(conf.dist, '/app')));
});