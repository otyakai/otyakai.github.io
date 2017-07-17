const gulp = require("gulp");
const browserSync = require("browser-sync");
const pug = require("gulp-pug");
const less = require("gulp-less");

const pugOptions = {
  pretty: false
};

const lessOptions = {}

gulp.task("build", [
  "build:pug",
  "build:less"
]);

gulp.task("watch", () => {
  browserSync({
    server: {
      baseDir: "./dist"
    }
  })
  gulp.watch(["src/**/*.pug", "src/**/*.less"], ["build", "reload"]);
});

gulp.task("reload", ["build"], () => {
  console.log("build complete")
  browserSync.reload();
});

gulp.task(
  "build:pug",
  () => gulp.src(["src/**/[^_]*.pug"])
        .pipe(pug(pugOptions))
        .pipe(gulp.dest("dist/"))
);

gulp.task(
  "build:less",
  () => gulp.src(["src/**/[^_]*.less"])
        .pipe(less(lessOptions))
        .pipe(gulp.dest("dist/"))
);