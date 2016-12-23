'use strict';

import path from 'path'
import gulp from 'gulp'
import conf,{errorHandler} from './conf'
import browserSync from 'browser-sync'
import util from 'util'
import proxyMiddleware from 'http-proxy-middleware'

function browserSyncInit(baseDir, browser) {
    browser = browser === undefined ? 'default' : browser;

    var server = {
        baseDir: baseDir
    };

    server.middleware = proxyMiddleware('/api', { target: 'http://139.196.101.78:8668', changeOrigin: true });

    browserSync.instance = browserSync.init({
        startPath: '/',
        server: server,
        browser: browser
    });
}

gulp.task('serve', ['watch'], () =>{
    browserSyncInit([path.join(conf.tmp, '/serve'), conf.src]);
});

