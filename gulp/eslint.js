import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins'

const $ = loadPlugins();


gulp.task('eslint', () => {
  gulp.src('src/app/**/*.js')
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.eslint.failAfterError())
    .pipe($.notify({ message: 'eslint task complete' }));

})
