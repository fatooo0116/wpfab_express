// 載入 gulp
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var gulpSass = require('gulp-sass');
var del = require('del');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');


gulp.task('webserver', function() {
	gulp.src('app') //起始目錄
	.pipe(webserver({
		host: '0.0.0.0', //host設定'0.0.0.0'，就可以用內網檢視
		port: 9000, //設定一個沒在使用的port
		livereload: true, //auto refresh
		open: true //執行gulp時自動開啟browser
	}));
});





var paths = {
   styles:  ['./sass/**/style.scss','./sass/tpl_node/*.scss'],
   scripts: ['./js/origin/imageload.js','./js/origin/isotope.js','./js/origin/slick.min.js','./js/origin/script.js'],
   images: './img/*',
   app:'./dist/*'
};






// Not all tasks need to use streams
// A gulpfile is just another node program and you can use any package available on npm
gulp.task('clean', function() {
  // You can use multiple globbing patterns as you would with `gulp.src`
  return del(['build']);
});




gulp.task('styles', function () {
  return gulp.src(paths.styles)   // 指定要處理的 Scss 檔案目錄
        .pipe(sourcemaps.init())
        .pipe(gulpSass({          // 編譯 Scss
         //   outputStyle: 'compressed'
        }))         // 編譯 Scss
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/css'));
          // 指定編譯後的 css 檔案目錄
});








gulp.task('scripts', ['clean'], function() {
  // Minify and copy all JavaScript (except vendor scripts)
  // with sourcemaps all the way down
  return gulp.src(paths.scripts)
    .pipe(sourcemaps.init())
      .pipe(uglify())
    .pipe(concat('script.js'))
    /* .pipe(sourcemaps.write()) */
    .pipe(gulp.dest('./dist/js'));
});






// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.styles, ['styles']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', [ 'scripts','styles','watch']);
