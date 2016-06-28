// Include Gulp and all plugins
        var gulp = require('gulp');
       var babel = require("gulp-babel");
        var sass = require('gulp-sass');
 var browserSync = require('browser-sync');
var autoprefixer = require('gulp-autoprefixer');

var exec = require('child_process').exec;

gulp.task('babel', function () {
  return gulp.src('src/js/app.js')
    .pipe(babel())
    .pipe(gulp.dest('app/static/js'))
    .pipe(browserSync.reload({stream: true}));
});


// Compile SASS
gulp.task('sass', function () {
  return gulp.src('src/sass/main.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('app/static/css'))
    .pipe(browserSync.reload({stream: true}));
});


// Run Flask server
gulp.task('runserver', function() {
    var proc = exec('python app/index.py');
});


// browserSync

gulp.task('sync', ['runserver'], function() {

  // browserSync.init({
  //   // baseDir is location of index.html
  //   server: {
  //     baseDir: 'app',
  //     index: 'templates/index.html'
  //   }

  browserSync({
    // notify: false
    port: 3000,
    notify: false,
    proxy: "127.0.0.1:5003"
  });


  gulp.watch('src/js/app.js', ['babel']);
  gulp.watch('src/sass/*.sass', ['sass']);
  gulp.watch('app/templates/index.html').on('change', browserSync.reload)
});

gulp.task('default', ['babel', 'sass', 'sync']);
