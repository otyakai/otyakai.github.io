const gulp = require("gulp");
const pug = require("gulp-pug");
const less = require("gulp-less");

const pugOptions = {
  pretty: true
};

const lessOptions = {}

gulp.task("build", [
  "build:pug",
  "build:less"
]);

gulp.task(
  "build:pug",
  () => gulp.src(["src/**/[^_]*.pug"])
        .pipe(pug(pugOptions))
        .pipe(gulp.dest("dist/"))
);

gulp.task(
  "build:less",
  () => gulp.src(["src/**/*.less"])
        .pipe(less(lessOptions))
        .pipe(gulp.dest("dist/"))
);