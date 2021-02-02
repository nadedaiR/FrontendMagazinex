var gulp = require('gulp')
var uglify = require('gulp-uglify')
var minifyCss = require('gulp-minify-css')
var less = require('gulp-less')
var clean = require('gulp-clean')
var RevAll = require('gulp-rev-all')
var imagemin = require('gulp-imagemin')
// var insert = require('gulp-insert')

gulp.task('less', function () {
  return gulp.src('src/less/Frontend-Magazine.less')
    .pipe(less())
    .pipe(gulp.dest('src/css/'))
})

gulp.task('min-script', function () {
  return gulp.src('src/js/**/*.js')
    .pipe(uglify().on('error', function(e) { console.log('\x07',e.message);}))
    .pipe(gulp.dest('dist/js/'))
})

gulp.task('min-style', ['less'], function () {
  return gulp.src('src/css/**/*.css')
    .pipe(minifyCss())
    .pipe(gulp.dest('dist/css/'))
})

gulp.task('min-images', function () {
  return gulp.src('src/images/**/*.{jpg,gif,png}')
    // .pipe(imagemin({
    //   progressive: true
    // }))
    .pipe(gulp.dest('dist/images/'))
})

gulp.task('copy', function () {
    return gulp.src([
        'src/**',
        '!src/css/**',
        '!src/images/**',
        '!src/js/**',
        '!src/less/**'
      ])
    .pipe(gulp.dest('dist/'))
})

gulp.task('clean', function () {
  return gulp.src(['dist', 'build', '_config.yml'], {read: false})
    .pipe(clean());
})

gulp.task('dist', ['min-script', 'min-style', 'min-images', 'copy'])

gulp.task('build', ['dist'], function () {
  var revAll = new RevAll({
    dontRenameFile: ['.html', '.xml', '.md', '.yml', '.ico'],
    dontUpdateReference: ['.html', '.xml', '.md', '.yml', '.ico']
  })
  return gulp.src('dist/**')
    .pipe(revAll.revision())
    .pipe(gulp.dest('.'))
})
