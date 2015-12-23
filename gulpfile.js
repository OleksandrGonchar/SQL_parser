// Various helper modules
var gulp = require("gulp");
var plug = require("gulp-load-plugins")();
var path = require('path');

// paths
var paths = {
	localhost: "http://localhost:8000/src/index.html"
};

gulp.task("help", plug.taskListing);

// WebServer
gulp.task('webserver', function() {
	return gulp.src('src')
		.pipe(plug.webserver({
			livereload: true,
			directoryListing: true,
			open: paths.localhost
		}));
});

// Transpile ES6 -> ES5
gulp.task("babel", function () {
	return gulp.src(paths.es6)
		.pipe(plug.sourcemaps.init())
		.pipe(plug.babel())
		.pipe(plug.sourcemaps.write('.', { sourceRoot: paths.sourceRoot }))
		.pipe(gulp.dest(paths.es5));
});


gulp.task("hint", function() {
	return gulp
		.src(source)
		.pipe(plug.jshint("./.jshintrc"))

		// default reporter
		// .pipe(plug.jshint.reporter("default"));
		// stylish reporter
		.pipe(plug.jshint.reporter("jshint-stylish"));
});

// watch files, transpile if one of them changes
gulp.task("watch", function() {
	gulp.watch(paths.es6, ["babel"]);
});

// The default task is 'watch'
gulp.task("default", ["watch", "webserver"]);