const gulp = require('gulp');
const cleancss = require('gulp-clean-css');

gulp.task('css', function() {
  return gulp.src("public/stylesheets/style.css")
    .pipe(cleancss())
    .pipe(gulp.dest('public/dist/css'))
});

gulp.task('watch', function() {
  gulp.watch('public/stylesheets/style.css', ['css'])
});
