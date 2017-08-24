// 获取 gulp
var gulp = require('gulp');
// 获取 uglify 模块（用于压缩 JS）
var uglify = require('gulp-uglify');
// 获取 cleancss 模块（用于压缩 CSS）
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var gutil = require('gulp-util');
var babel = require('gulp-babel');

// 压缩 js 文件
// 在命令行使用 gulp jscompress 启动此任务
gulp.task('jscompress', function() {
    // 1. 找到文件
   return gulp.src('js/1.js')
       .pipe(rename({suffix: '.min'}))
       .pipe(babel({
           presets: ['es2015']
       }))
    // 2. 压缩文件
        .pipe(uglify())
       .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
        // 3. 另存压缩后的文件
        .pipe(gulp.dest('js'));
});
// 压缩 css 文件
// 在命令行使用 gulp csscompress 启动此任务
gulp.task('csscompress', function() {
    // 1. 找到文件
   return gulp.src('css/my.css')
        .pipe(rename({suffix: '.min'}))
    // 2. 压缩文件
        .pipe(cleanCSS())
        // 3. 另存压缩后的文件
        .pipe(gulp.dest('css'));
});

// 在命令行使用 gulp auto 启动此任务
gulp.task('auto', function () {
    // 监听文件修改，当文件被修改则执行 script 任务
    gulp.watch('js/1.js', ['jscompress']);
    gulp.watch('css/my.css', ['csscompress']);
});


// 使用 gulp.task('default') 定义默认任务
// 在命令行使用 gulp 启动 script 任务和 auto 任务
gulp.task('default', ['auto']);

