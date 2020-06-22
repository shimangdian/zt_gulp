const { src, dest, watch, series } = require("gulp")
const autoPrefixer = require("gulp-autoprefixer")
const less = require("gulp-less")
const imagemin = require("gulp-imagemin")
const babel = require("gulp-babel")
const cssnano = require('gulp-cssnano')
const plumber = require('gulp-plumber')
const rev = require('gulp-rev')
const revCollector = require('gulp-rev-collector')
const del = require('del')
const gulpif = require('gulp-if')


const publicPath = './dist'
const devPath = './src'
const isProd = process.env.npm_lifecycle_event === 'build'

// 转换less到src/css目录
const lessTask = function () {
  return src(`${devPath}/less/*.less`)
  .pipe(plumber())
  .pipe(less())
  .pipe(dest(`${devPath}/css/`))
}

// 将src/css目录的css添加浏览器前缀后输出到public目录的css文件夹
const cssTask = function () {
  return src(`${devPath}/css/**/*.css`)
  .pipe(autoPrefixer('last 3 version'))
  .pipe(cssnano())
  .pipe(gulpif(isProd, rev()))
  .pipe(dest(`${publicPath}/css`))
  .pipe(rev.manifest())
  .pipe(dest(`${devPath}/rev/css/`))
}

// 将src/img目录的图片都压缩一遍，然后输出到public目录的img文件夹
const imgTask = function () {
  return src(`${devPath}/img/*`)
  .pipe(imagemin())
  .pipe(gulpif(isProd, rev()))
  .pipe(dest(`${publicPath}/img`))
  .pipe(rev.manifest())
  .pipe(dest(`${devPath}/rev/img/`))
}

// 将src/font copy 到 public目录的font文件夹
const fontTask =  function () {
  return src(`${devPath}/font/*`)
  .pipe(gulpif(isProd, rev()))
  .pipe(dest(`${publicPath}/font`))
  .pipe(rev.manifest())
  .pipe(dest(`${devPath}/rev/font/`))
}

// 将src/lib copy 到 public目录的lib文件夹
const libTask =  function () {
  return src(`${devPath}/lib/*`)
  .pipe(gulpif(isProd, rev()))
  .pipe(dest(`${publicPath}/lib`))
  .pipe(rev.manifest())
  .pipe(dest(`${devPath}/rev/lib/`))
}

// 将src/js目录下面的js文件转换成es5的代码后 输出 到 public目录的js文件夹
const jsTask =  function () {
  return src(`${devPath}/js/*`)
  .pipe(plumber())
  .pipe(babel())
  .pipe(gulpif(isProd, rev()))
  .pipe(dest(`${publicPath}/js`))
  .pipe(rev.manifest())
  .pipe(dest(`${devPath}/rev/js/`))
}

// 将src/html copy 到 public目录的html文件夹
const htmlTask = function () {
  return src([`${devPath}/rev/**/*.json`,`${devPath}/*.html`])
  .pipe(gulpif(isProd, revCollector({replaceReved: true})))
  .pipe(dest(`${publicPath}/`))
}

const cleanDist = async function() {
  await del(`${publicPath}/`)
}

const defaultTask = function () {
  watch(`${devPath}/less/**/*.less`, lessTask)
  watch(`${devPath}/css/**/*.css`, cssTask)
  watch(`${devPath}/img/**/*.**`, imgTask)
  watch(`${devPath}/font/**/*.**`, fontTask)
  watch(`${devPath}/lib/**/*.js`, libTask)
  watch(`${devPath}/js/**/*.js`, jsTask)
  watch(`${devPath}/*.html`, htmlTask)
}


exports.default = series(cleanDist, lessTask, cssTask, imgTask, fontTask, jsTask, libTask, htmlTask, defaultTask)

exports.build = series(cleanDist, lessTask, cssTask, imgTask, fontTask, jsTask, libTask, htmlTask)