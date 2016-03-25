var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var nodemon = require('nodemon');
var jsFiles = ['*.js', 'src/**/*.js'];

/*This will check the code for syntax an styling errors*/
gulp.task('style', function () {
	return gulp.src(jsFiles)
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish', {
			verbose: true
		}))
		.pipe(jscs());
});
/*This will inject the dependencies into the html files*/
gulp.task('inject', function () {
	var wiredep = require('wiredep').stream;
	var inject = require('gulp-inject');

	var injectSrc = gulp.src(	['./public/css/*.css',
								'./public/js/*.js'],
								{read: false}); // specify whether the just the filename should be read
	/*Options for developer styles/scripts*/
	var injectOptions = {ignorePath: '/public'}; // remove the leading public from the returned path
	/*Options for vendor styles/scripts*/
	var options = {
		bowerJson: require('./bower.json'),
		directory: './public/lib',
		ignorePath: '../../public'
	};

	return gulp.src/*('./src/views/*.html')*/('./src/views/*.jade')
		.pipe(wiredep(options))
		.pipe(inject(injectSrc, injectOptions))
		.pipe(gulp.dest('./src/views'));
});
/*This will watch for changes in the javascript files and will run style and inject before running the specified script.
* Style and inject will be run asynchronously */
gulp.task('serve', ['style', 'inject'], function () {
	var options = {
		script: 'app.js', // the file to be run
		delayTime : 1, // how long to wait before executing the task
		env:{
			'PORT': 5000 // the port environment variable
		},
		watch: jsFiles // watch the files specified in the jsFiles array
	};
	return nodemon(options)
		.on('restart', function (ev) {
			console.log('Restarting..');
		});
});