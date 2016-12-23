 /**
  *  This file contains the variables used in other gulp files
  *  which defines tasks
  *  By design, we only put there very generic config values
  *  which are used in several places to keep good readability
  *  of the tasks
  */
import gutil from 'gulp-util'
let conf={
     src: 'src',
     dist: 'dist',
     tmp: '.tmp'
 };
 export default conf

 /**
  *  Wiredep is the lib which inject bower dependencies in your project
  *  Mainly used to inject script tags in the index.html but also used
  *  to inject css preprocessor deps and js files in karma
  */

 export function errorHandler(title) {
     'use strict';

     return (err) => {
         gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
         this.emit('end');
     };
 };
