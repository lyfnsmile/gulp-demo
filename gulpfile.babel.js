/**
 *  Welcome to your gulpfile!
 *  The gulp tasks are split into several files in the gulp directory
 *  because putting it all here was too long
 */

'use strict';

import fs from 'fs'
import gulp from 'gulp'


fs.readdirSync('./gulp').filter(function(file) {
    return (/\.(js)$/i).test(file);
}).map(function(file) {
   require ('./gulp/' + file)
});

gulp.task('default', ['del'], function() {
    gulp.start('build')
})
