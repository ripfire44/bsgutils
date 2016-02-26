'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');
var addsrc = require('gulp-add-src');
var rimraf = require('gulp-rimraf');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var ejs = require('gulp-ejs');
var templateCache = require('gulp-angular-templatecache');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var minifyCss = require('gulp-minify-css');

var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');

var projectName = 'angular-bsg-utils';

var bcd = './bower_components'; // Bower Components Directory

gulp.task('default', function(cb) {
	runSequence('clean', 'compileWatch', 'browserSync', cb);
});
//distribution
gulp.task('distClean', function() {
	return gulp.src('./dist/**/*', {
			read: false
		})
		.pipe(rimraf());
})
gulp.task('dist', ['distClean', 'compile'], function() {
	gulp.src(['./license.js', './public/js/' + projectName + '.min.js'])
		.pipe(concat(projectName + '.min.js'))
		.pipe(uglify({
			preserveComments: 'license'
		}))
		.pipe(gulp.dest('./dist'));
});

// Clean
gulp.task('clean', function(cb) {
	return gulp.src(['./public/**', '!./public'], {
			read: false
		})
		.pipe(rimraf());
});

// Copy bower components
gulp.task('bowerComponents', function() {
	return gulp.src([bcd + '/angular/angular.min.js',
			bcd + '/angular-bootstrap/ui-bootstrap-tpls.min.js',
			bcd + '/bootstrap/dist/css/bootstrap.min.css',
			bcd + '/bootstrap/dist/fonts/**/*'
		], {
			base: bcd
		})
		.pipe(gulp.dest('./public/lib'));
});

// Compile Ejs templates
gulp.task('compileIndex', function() {
	return gulp.src('./source/index.ejs')
		.pipe(ejs(null, {
			ext: '.html'
		}))
		.pipe(gulp.dest('./public'));
});

// Compile Javascripts: Concat files and mini/Uglify
gulp.task('compileJavascripts', function() {
	return gulp.src(['./source/js/**/app.*.js', // order is important
			'./source/js/**/service.*.js',
			'./source/js/**/filter.*.js',
			'./source/js/**/directive.*.js',
			'./source/js/**/controller.*.js'
		])
		.pipe(concat(projectName + '.js'))
		.pipe(gulp.dest('./public/js'))
		.pipe(rename(projectName + '.min.js'))
		.pipe(uglify({
			preserveComments: 'license'
		}))
		.pipe(gulp.dest('./public/js'));
});
// Compile Public Javascripts: Concat files and mini/Uglify
gulp.task('compilePublicJavascripts', function() {
	return gulp.src(['./source/pubjs/**/app.*.js', // order is important
			'./source/pubjs/**/service.*.js',
			'./source/pubjs/**/filter.*.js',
			'./source/pubjs/**/directive.*.js',
			'./source/pubjs/**/controller.*.js'
		])
		.pipe(concat('app.js'))
		.pipe(gulp.dest('./public/js'))
		.pipe(rename('app.min.js'))
		.pipe(uglify({
			preserveComments: 'license'
		}))
		.pipe(gulp.dest('./public/js'));
});

// Compile directive templates
gulp.task('compileTemplates', function() {
	return gulp.src(['./source/js/template/**/*.html'])
		.pipe(templateCache('templates.js', {
			module: 'bsg',
			base: function(file) {
				var filename = /[^/]*$/.exec(file.relative)[0];
				return 'template/' + filename;
			}
		}))
		.pipe(gulp.dest('./public/js'));
});

// Compile less and copy to public/css
gulp.task('compileStyles', function() {
	return gulp.src('./source/less/**/*.less')
		.pipe(less()).on('error', function(error) {
			console.log(error.message);
		})
		.pipe(autoprefixer())
		.pipe(rename({
			extname: '.min.css'
		}))
		.pipe(minifyCss()).on('error', function(error) {
			console.log(error.message);
		})
		.pipe(gulp.dest('./public/css'));
});
gulp.task('compile', ['bowerComponents', 'compileIndex', 'compileJavascripts', 'compilePublicJavascripts', 'compileTemplates', 'compileStyles']);

gulp.task('compileWatch', ['compile'], function() {
	gulp.watch(['./source/js/**/*.js'], ['compileJavascripts']);
	gulp.watch(['./source/pubjs/**/*.js'], ['compilePublicJavascripts']);
	gulp.watch(['./source/index.ejs'], ['compileIndex']);
	gulp.watch(['./source/js/template/**/*.html'], ['compileTemplates']);
	gulp.watch(['./source/less/**/*.less'], ['compileStyles']);
});

// Combine browser sync with nodemon to detect any changes in code
gulp.task('browserSync', ['nodemon'], function() {
	browserSync.init(null, {
		proxy: "http://localhost:5000", //match port with app listen
		files: ["public/**/*.*"], // Reload browser sync on any file change in public
		browser: "google chrome", // use chrome as the default browser
		port: 7000,
	});
});
// Nodemon will detect any changes to app.js and rerun server to apply changes
gulp.task('nodemon', function(cb) {
	var started = false;
	return nodemon({
		script: 'app.js',
		ignore: './public/'
	}).on('start', function() {
		// to avoid nodemon being started multiple times
		// thanks @matthisk
		if (!started) {
			console.log("Start nodemon.");
			cb();
			started = true;
		}
	});
});