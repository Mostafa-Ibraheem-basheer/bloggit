const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));

function buildStyles() {
  //compiles scss file to css
  return src('styles/*.scss').pipe(sass()).pipe(dest('src/styles'));
}

function watchTask() {
  // watches the scss file for changes to run the compiler
  watch(['styles/**/*.scss'], buildStyles);
}

exports.default = series(buildStyles, watchTask);
