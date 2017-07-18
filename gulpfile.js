const gulp = require("gulp");
const browserSync = require("browser-sync");

const pug = require("gulp-pug");
const layout = require("gulp-layout");
const markdown = require("gulp-markdown");
const highlight = require("highlight.js");

const less = require("gulp-less");

const pugOptions = {
  pretty: false
};

const markedOptions = {
  highlight: (code) => `<div class="highlight">${highlight.highlightAuto(code).value}</div>`
}

const lessOptions = {}


gulp.task("watch", ["build"], () => {
  browserSync({
    server: {
      baseDir: "./dist"
    }
  })
  gulp.watch([
    "src/**/*.pug",
    "src/**/*.md",
    "src/**/*.less",
  ], ["build", "reload"]);
});

gulp.task("reload", ["build"], () => {
  console.log("build complete")
  browserSync.reload();
});

gulp.task("build", [
  "build:pug",
  "build:markdown",
  "build:less",
]);

gulp.task(
  "build:pug",
  () => gulp.src(["src/**/[^_]*.pug"])
        .pipe(pug(pugOptions))
        .pipe(gulp.dest("dist/"))
);

gulp.task(
  "build:markdown",
  () => gulp.src(["src/**/*.md"])
        .pipe(markdown(markedOptions))
        .pipe(layout({
          layout: "src/_md-template.pug",
        }))
        .pipe(gulp.dest("dist/"))
);

gulp.task(
  "build:less",
  () => gulp.src(["src/**/[^_]*.less"])
        .pipe(less(lessOptions))
        .pipe(gulp.dest("dist/"))
);