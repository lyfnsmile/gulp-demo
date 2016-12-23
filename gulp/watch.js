'use strict';

import path from 'path'
import gulp from 'gulp'
import conf,{errorHandler} from './conf'

import browserSync from 'browser-sync'

function isOnlyChange(event) {
  return event.type === 'changed';
}

gulp.task('watch', ['inject'], function () {

  gulp.watch([path.join(conf.src, '/*.html')], ['inject-reload']);

  gulp.watch([
    path.join(conf.src, 'assets/**/*.css'),
    path.join(conf.src, 'assets/**/*.less'),
     path.join(conf.src, 'assets/**/*.scss')
  ], function(event) {
    if(isOnlyChange(event)) {
      gulp.start('styles-reload');
    } else {
      gulp.start('inject-reload');
    }
  });

  gulp.watch(path.join(conf.src, '/app/**/*.js'), function(event) {
    if(isOnlyChange(event)) {
      gulp.start('scripts-reload');
    } else {
      gulp.start('inject-reload');
    }
  });

  gulp.watch(path.join(conf.src, '/**/*.html'), function(event) {
    browserSync.reload(event.path);
  });
});
