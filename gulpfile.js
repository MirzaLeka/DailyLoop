const gulp = require('gulp');
const uglify = require('gulp-uglify');
const liveReload = require('gulp-livereload');
const concat = require('gulp-concat');
const minifyCss = require('gulp-minify-css');
const gls = require('gulp-live-server');
const htmlMin = require('gulp-htmlmin');
const autoPrefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const zip = require('gulp-zip');
var babel = require('gulp-babel');
const imagemin = require('gulp-imagemin');
const imageminJpg = require("imagemin-jpeg-recompress");
const imageminPng = require("imagemin-pngquant");

const STYLES_PATH = 'Resources/css/**/*.css';
const SCRIPTS_PATH = 'Resources/js/**/*.js'; 
const DEST_PATH = 'Resources/dist';
const HTML_PATH = 'Web-Info/**/*.html';
const IMG_PATH = 'Resources/readMeImg/**/*';
const IMG_DEST = 'Resources/img/**/*';

// HTML
gulp.task('html', () => {
console.log("Running html task");
return gulp.src(HTML_PATH)
.pipe(htmlMin({collapseWhitespace: true}))
.pipe(gulp.dest(DEST_PATH))
.pipe(liveReload());
})


// Styles
gulp.task('styles', () => {
console.log("Starting styles task"); 
 
return gulp.src(STYLES_PATH)
		.pipe(plumber(function (err) { 
			console.log('Styles Task Error'); 
			console.log(err.toString()); 
			this.emit('end');
		}))
        .pipe(sourcemaps.init()) 
        .pipe(autoPrefixer({ 
})) 
.pipe(minifyCss()) 
.pipe(sourcemaps.write()) 
.pipe(gulp.dest(DEST_PATH))
.pipe(liveReload());
});


// Scripts
gulp.task('scripts', function () {
	console.log('Starting scripts task');

	return gulp.src(SCRIPTS_PATH)
		.pipe(plumber(function (err) {
			console.log('Scripts Task Error');
			console.log(err);
			this.emit('end');
		}))
		.pipe(sourcemaps.init())
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(uglify())	
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(DEST_PATH))
		.pipe(liveReload());
});



//Images
gulp.task('images', () => {
	console.log("Starting images task");
	gulp.src(IMG_PATH)
	.pipe(imagemin(
		[
			imagemin.gifsicle({interlaced: true}),
			imagemin.jpegtran({progressive: true}),
			imagemin.optipng({optimizationLevel: 1}),
			imagemin.svgo({
				plugins: [
					{removeViewBox: true},
					{cleanupIDs: false}
				]}),

			imageminJpg({
				quality: "low",
				min: 40,
				max: 60,
				optimizationLevel: 1
			}),
			imageminPng({
				min: 40,
				max: 60,
				optimizationLevel: 1
			})
		]
	))
	.pipe(gulp.dest(IMG_DEST));
	});


// Clean
gulp.task('clean', () => {
return del.sync([DEST_PATH]); 
});


// Zip files
gulp.task('export', () => {
return gulp.src(['web-info/**/*', 'resources/**/*'])
.pipe(zip('website.zip'))
.pipe(gulp.dest('./')); 
});


gulp.task('watch', () => {
console.log("Gulp is watching");
require('./server/server.js'); 
liveReload.listen();
gulp.watch(HTML_PATH, ['html']);
gulp.watch(STYLES_PATH, ['styles']); 
gulp.watch(SCRIPTS_PATH, ['scripts']); 
});


gulp.task('default', ['html', 'styles', 'scripts', 'watch'], () => { 
console.log("Starting default task");
});