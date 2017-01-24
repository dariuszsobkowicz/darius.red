const gulp         = require("gulp"),
      sass         = require("gulp-sass"),
      autoprefixer = require("gulp-autoprefixer"),
      plumber      = require("gulp-plumber"),
      browserSync  = require("browser-sync"),
      del          = require("del"),
      useref       = require("gulp-useref"),
      uglify       = require("gulp-uglify"),
      gulpif       = require("gulp-if"),
      runSequence  = require("run-sequence"),
      ftp          = require("vinyl-ftp"),
      argv         = require('yargs').argv,
      gutil        = require("gulp-util"),
      rename       = require("gulp-rename"),
      babel        = require("gulp-babel");

gulp.task("css", function () {
    gutil.log(gutil.colors.yellow("Compile SCSS to CSS"));
    return gulp.src("src/scss/app.scss")
        .pipe(plumber())
        .pipe(rename("styles.scss"))
        .pipe(sass.sync({outputStyle: 'compressed'}))
        .pipe(autoprefixer({
            browsers: ["last 3 version"]
        }))
        .pipe(gulp.dest("dist/css/"))
        .pipe(browserSync.stream());
});

gulp.task("js", function () {
    return gulp.src("src/js/**/*.js")
        .pipe(babel())
        .pipe(gulp.dest("dist/js/"));
});

gulp.task("html", function () {
    return gulp.src("src/*.html")
        .pipe(gulpif(argv.dist, useref()))
        .pipe(gulpif("*.js", babel()))
        .pipe(gulpif("*.js", uglify()))
        .pipe(gulp.dest("dist"))
});

gulp.task("watch", function () {
    gulp.watch("src/scss/**/*.scss", ["css"]);
    gulp.watch("src/*.html", ["html", browserSync.reload]);
    gulp.watch("src/js/**/*.js", ["js", browserSync.reload]);
});

gulp.task("server", function () {
    browserSync.init({
        server: "dist/"
    })
});

gulp.task("clean", function () {
    return del("dist/")
});

gulp.task("build", function (cb) {
    runSequence("clean", "css", "html", "upload", cb)
});

gulp.task("build:server", ["build"], function () {
    browserSync.init({
        server: "dist/"
    })
});

gulp.task("upload", function () {
    gutil.log(gutil.colors.yellow("Upload to server"));
    const conn = ftp.create({
        host:     "",
        user:     "",
        password: ""
    });
    return gulp.src("dist/**/*")
        .pipe(gulpif(argv.upload, conn.dest("test")));
});

gulp.task("default", ["css", "html", "js", "server", "watch"]);
