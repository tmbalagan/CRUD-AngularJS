'use strict';

var gulp = require('gulp'),
    inject = require('gulp-inject'),
    series = require('stream-series'),
    CONFIG = require('./config/gulp');

gulp.task('site-development', function () {
    var JSvendorStream = gulp.src(CONFIG.app.site.vendor.js.src, {read: false});
    var CSSvendorStream = gulp.src(CONFIG.app.site.vendor.css.src, {read: false});
    var JSappStream = gulp.src(CONFIG.app.site.modules.js.src, {read: false});

    return gulp.src('./views/index.html')
        .pipe(inject(series(JSvendorStream, CSSvendorStream, JSappStream)))
        .pipe(gulp.dest('./views'));
});

gulp.task('development', ['site-development']);
