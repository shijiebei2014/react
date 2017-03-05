var gulp = require('gulp')
var browserify = require('browserify')
var babelify = require('babelify')
var source = require('vinyl-source-stream')
var babel = require('gulp-babel');
gulp
	.task('default', function() {
		return browserify('./source/app.js')
			.transform(babelify, {
				presets: ["es2015", "react"],
				plugins: [
				]
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