'use strict';

import path from 'path'
import gulp from 'gulp'
import conf,{errorHandler} from './conf'
import loadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync'

const $ =loadPlugins();

gulp.task('styles-reload', ['styles'],()=>{
    return buildStyles()
        .pipe(browserSync.stream());
});

gulp.task('styles', function() {
    return buildStyles();
});

var buildStyles = function() {
    var lessOptions = {
       paths:[
            path.join(conf.src, '/assets/**')
        ],
        relativeUrls: true
    };

    var injectFiles = gulp.src([
        path.join(conf.src, '/**/*.less'),
        path.join('!' + conf.src, '/assets/styles/app.less')
    ], { read: false });

    var injectOptions = {
        starttag: '// injector',
        endtag: '// endinjector',
        addRootSlash: false
    };


    return gulp.src('src/assets/**/*.less')
        .pipe($.sourcemaps.init())
        .pipe($.less(lessOptions)).on('error', errorHandler('Less'))
        .pipe($.concat('app.css'))
        .pipe($.autoprefixer()).on('error', errorHandler('Autoprefixer'))
        .pipe($.sourcemaps.write('map'))
        .pipe(gulp.dest(path.join(conf.tmp, '/serve/app/styles')));
};
