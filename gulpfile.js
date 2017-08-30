var gulp = require('gulp')
var babel = require('gulp-babel')


gulp.task('babelify', function () {
  gulp.
    src('./src/*/*.js').
    pipe(babel({
      presets: ['env']
    })).
    pipe(gulp.dest('generators/'))
})

gulp.task('copy-templates', function() {
  return gulp.
    src('./src/**/templates/**/*').
    pipe(gulp.dest('./generators/'))
})

gulp.task('watch', ['default'], function() {
  gulp.watch('./src/**/*', ['default'])
})

gulp.task('default', ['babelify', 'copy-templates'])
