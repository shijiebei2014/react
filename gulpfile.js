var gulp = require('gulp')
var browserify = require('browserify')
var babelify = require('babelify')
var source = require('vinyl-source-stream')
var babel = require('gulp-babel');
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");
var less = require('gulp-less');
var cssmin = require('gulp-minify-css');
gulp
	.task('default', function() {
		return browserify('./source/app.js')
			.transform(babelify, {
				presets: ["es2015", "react"],
				plugins: []
			})
			.bundle()
			.pipe(source('reacttest.js'))
			.pipe(gulp.dest('./public/pagejs'))
	})
	.task('line', function() {
		return browserify('./source/components/line.js')
			.transform(babelify, {
				presets: ["es2015", "react"]
			})
			.bundle()
			.pipe(source('line.js'))
			.pipe(gulp.dest('./public/pagejs'))
	})
	.task('views', function() {
		return browserify('./source/components/views.js')
			.transform(babelify, {
				presets: ["es2015", "react"]
			})
			.bundle()
			.pipe(source('es6.js'))
			.pipe(gulp.dest('./build/components'))
	})
	.task('mytest', function() {
		return browserify('./source/components/my_test.js')
			.transform(babelify, {
				presets: ["es2015", "react"],
				plugins: []
			})
			.bundle()
			.pipe(source('mytest.js'))
			.pipe(gulp.dest('./public/pagejs'))
	})
	.task("interfaces", function() {
		//return gulp.src("src/**/*.ts")
		return tsProject.src()
			.pipe(tsProject())
			.js.pipe(gulp.dest("build"));
	})
	.task("watch", ["interfaces"], function() {
		gulp.watch("src/**/*.ts", ["interfaces"])
	})
	.task("less",  function() {
		gulp.src(['../zhisiyun/less/*.less'])
            .pipe(less())
            .pipe(cssmin())
            .pipe(gulp.dest('../zhisiyun/client/assets/css/flow'))
	})
    .task("wless", function() {
        gulp.watch('../zhisiyun/less/*.less', ['less'])
    })
