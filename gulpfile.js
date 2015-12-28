"use strict";
// Various helper modules
var gulp = require("gulp");
var plug = require("gulp-load-plugins")();
var minifyCss = require('gulp-minify-css');
var minifyHTML = require('gulp-minify-html');
var uglify = require('gulp-uglify');

// paths
var paths = {
    localhost: "http://localhost:8000/index.html"
};

gulp.task("help", plug.taskListing);

// WebServer
gulp.task('webserver', ["minify","minify-css", "minify-html"], function() {
    return gulp.src('build')
        .pipe(plug.webserver({
            livereload: true,
            directoryListing: true,
            open: paths.localhost
        }));
});

//minification css
gulp.task('minify-css', function() {
    return gulp.src('source/css/*.css')
        .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(gulp.dest('build/css'));
});

//minification html
gulp.task('minify-html', function() {
    return gulp.src('source/*.html')
        .pipe(minifyHTML({ empty: true }))
        .pipe(gulp.dest('build'));
});

//minification js
gulp.task('minify', ["lib"], function () {
    gulp.src('source/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('build'))
});

//minification move js libraries to build folder and minification them
gulp.task('lib', function () {
    gulp.src('bower_components/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('build/app/lib'))
});

// The default task is 'watch'
gulp.task("default", ["webserver"]);