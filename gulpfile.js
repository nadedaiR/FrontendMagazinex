var gulp = require('gulp')
var uglify = require('gulp-uglify')
var minifyCss = require('gulp-minify-css')
var less = require('gulp-less')
var clean = require('gulp-clean')
var RevAll = require('gulp-rev-all')
var imagemin = require('gulp-imagemin')
var qiniu = require('gulp-qiniu')
var qiniuConfig = require('../../../.qiniu.json')
var jekyll = require('gulp-jekyll')

gulp.task('less', function () {
  return gulp.src('./less/Frontend-Magazine.less')
    .pipe(less())
    .pipe(gulp.dest('./css/'))
})

gulp.task('min-script', function () {
  return gulp.src('./js/**/*.js')
    .pipe(uglify().on('error', function(e) { console.log('\x07',e.message);}))
    .pipe(gulp.dest('dist/js/'))
})

gulp.task('min-style', ['less'], function () {
  return gulp.src('./css/**/*.css')
    .pipe(minifyCss())
    .pipe(gulp.dest('dist/css/'))
})

gulp.task('min-images', function () {
  return gulp.src('./images/**/*.{jpg,gif,png}')
    .pipe(imagemin({
      progressive: true
    }))
    .pipe(gulp.dest('dist/images/'))
})

gulp.task('copy', function () {
    return gulp.src([
      './_includes/**',
      './_layouts/**',
      './_posts/**',
      './fonts/**',
      './*.html',
      './_config.yml',
      './favicon.ico',
      'feed.xml'
      ], {base: './'})
    .pipe(gulp.dest('dist/'))
})

gulp.task('clean', function () {
  return gulp.src([
    'dist'
  ], {read: false})
    .pipe(clean());
})

gulp.task('dist', ['min-script', 'min-style', 'min-images', 'copy'])

gulp.task('build', ['dist'], function () {
  var revAll = new RevAll({
    prefix: 'http://7xrvqo.com1.z0.glb.clouddn.com',
    dontRenameFile: ['.html', '.xml', '.md', '.yml', '.ico'],
    dontUpdateReference: ['.html', '.xml', '.md', '.yml', '.ico']
  })
  return gulp.src('dist/**')
    .pipe(revAll.revision())
    .pipe(gulp.dest('.'))
})

gulp.task('watch', function () {
  return gulp.watch('./less/**/*.less', ['less'])
});

gulp.task('qiniu', function () {
  return gulp.src([
    'css/**',
    'fonts/**',
    'js/**',
    'images/**'
  ], {base: '.'})
  .pipe(qiniu({
    accessKey: qiniuConfig.accessKey,
    secretKey: qiniuConfig.secretKey,
    bucket: "qianduan",
    private: false
  }, {
    dir: '/',
    concurrent: 10
  }))
})
