// Various helper modules
var gulp = require("gulp");
var plug = require("gulp-load-plugins")();
var path = require('path');

// paths
var paths = {
    localhost: "http://localhost:8000/index.html"
};

gulp.task("help", plug.taskListing);

// WebServer
gulp.task('webserver', ["build"], function () {
    return gulp.src('src')
        .pipe(plug.webserver({
            livereload: true,
            directoryListing: true,
            open: paths.localhost
        }));
});

//build
gulp.task('build', function () {
    // copy any html files in source/ to public/
    gulp.src('bower_components/**/*.js')
        .pipe(gulp.dest('src/js/lib'));
});

// The default task is 'watch'
gulp.task("default", ["webserver"]);