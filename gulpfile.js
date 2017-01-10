var gulp = require('gulp'),
	sass = require('gulp-sass'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	browserSync = require('browser-sync').create();

var PATH = {
		js : {
			vendor : [
				'./node_modules/jquery/dist/jquery.min.js',
				'./node_modules/phaser/build/phaser.min.js',
				'./node_modules/rx/dist/rx.min.js',
				'./node_modules/q/q.js'
			]
		},
    src : './src/',
    dest : './www/'
	};

gulp.task('vendorjs',function(){
	gulp.src(PATH.js.vendor)
	.pipe(concat('vendor.js'))
	.pipe(uglify())
	.pipe(gulp.dest(PATH.dest+'js/'));
});

gulp.task('js',function(){
	gulp.src(PATH.src+'modules/**/*.js')
	.pipe(concat('main.js'))
	.pipe(uglify())
	.pipe(gulp.dest(PATH.dest+'js/'));
	// .pipe(browserSync.reload());
	browserSync.reload();
	// .pipe(browserSync.reload());
});

gulp.task('sass',function(){
	gulp.src(PATH.src+'sass/*.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(gulp.dest(PATH.dest+'css/'))
	.pipe(browserSync.stream());
});

gulp.task('html',function(){
	gulp.src(PATH.src+'*.html')
	// .pipe(uglify())
	.pipe(gulp.dest(PATH.dest));
	browserSync.reload();
	// .pipe(browserSync.stream());
});

// gulp.task('ijs',function(){
// 	gulp.src('./js/**/*.js')
// 	// .pipe(uglify())
// 	.pipe(gulp.dest('./app/js/'));
// 	browserSync.reload();
// 	// .pipe(browserSync.stream());
// });

gulp.task('assets',function(){
	gulp.src(PATH.src+'assets/**/*')
	.pipe(gulp.dest(PATH.dest+'assets/'));
	browserSync.reload();
});

// gulp.task('root',function(){
// 	gulp.src('./root/**/*')
// 	.pipe(gulp.dest('./app/'));
// 	browserSync.reload();
// });

gulp.task('data',function(){
  gulp.src(PATH.src+'data/**/*')
  .pipe(gulp.dest(PATH.dest+'data/'));
	browserSync.reload();
  
})

gulp.task('serve',function(){
	browserSync.init({
		'server': {
			'baseDir': PATH.dest
		}
	});

	gulp.watch(PATH.src+'modules/**/*.js', ['js']);
	gulp.watch(PATH.src+'assets/**/*', ['assets']);
	gulp.watch(PATH.src+'sass/*.scss', ['sass']);
	gulp.watch(PATH.src+'data/**/*', ['data']);
	gulp.watch(PATH.src+'*.html', ['html']);
});

gulp.task('retask',function(){
	gulp.watch(PATH.src+'modules/**/*.js', ['js']);
	gulp.watch(PATH.src+'assets/**/*', ['assets']);
	gulp.watch(PATH.src+'sass/*.scss', ['sass']);
	gulp.watch(PATH.src+'data/**/*', ['data']);
	gulp.watch(PATH.src+'*.html', ['html']);
})

gulp.task('watch',['vendorjs','assets','js','data','html','sass','retask']);

gulp.task('default',['vendorjs','assets','js','data','html','sass','serve']);
