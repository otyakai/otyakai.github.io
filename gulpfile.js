const gulp = require("gulp");
const browserSync = require("browser-sync");
const pug = require("gulp-pug");
const less = require("gulp-less");
const layout = require("gulp-layout");
const markdown = require("gulp-markdown")

const pugOptions = {
  pretty: false
};

const lessOptions = {}


gulp.task("watch", () => {
  browserSync({
    server: {
      baseDir: "./dist"
    }
  })
  gulp.watch([
    "src/**/*.pug",
    "src/**/*.less",
    "src/**/*.md"
  ], ["build", "reload"]);
});

gulp.task("reload", ["build"], () => {
  console.log("build complete")
  browserSync.reload();
});

gulp.task("build", [
  "build:pug",
  "build:less",
  "build:markdown"
]);

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

gulp.task(
  "build:markdown",
  () => gulp.src(["src/**/*.md"])
        .pipe(markdown())
        .pipe(layout({
          layout: "src/_md-template.pug",
        }))
        .pipe(gulp.dest("dist/"))
);