var browserSync = require('browser-sync'),
    gulp        = require('gulp'),
    connect     = require('gulp-connect');

var localConfig = {
  buildSrc: './build/',
  appFiles: './build/**/*.*',
  defaultPort: 3000
};

gulp.task('serve', function() {
    browserSync({
        server: {
            baseDir: localConfig.buildSrc
        },
        files: localConfig.appFiles,
        reloadDelay: 1000,
        open: false,
        port: localConfig.defaultPort
    });
});

gulp.task('serve:static', function() {
  connect.server({
    root: localConfig.buildSrc,
    port: process.env.PORT || localConfig.defaultPort
  });
});
