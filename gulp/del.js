import del from 'del';
import gulp from 'gulp';

gulp.task('del', () => {
    return del('dist/**').then(paths => {
        console.log('Deleted files and folders:\n', paths.join('\n'));
    });
});