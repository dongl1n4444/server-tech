const gulp = require('gulp');
// const less = require('gulp-less');
const browserSync = require('browser-sync').create();
const nodemon = require('gulp-nodemon');
// const header = require('gulp-header');
// const cleanCSS = require('gulp-clean-css');
// const rename = require('gulp-rename');
// const uglify = require('gulp-uglify');
// const pkg = require('./package.json');

// Set the banner content
// var banner = ['/*!\n',
//   ' * Start Bootstrap - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
//   ' * Copyright 2013-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
//   ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n',
//   ' */\n',
//   ''
// ].join('');

// Compile LESS files from /less into /css
// gulp.task('less', function() {
//     return gulp.src('less/sb-admin-2.less')
//         .pipe(less())
//         .pipe(header(banner, { pkg: pkg }))
//         .pipe(gulp.dest('dist/css'))
//         .pipe(browserSync.reload({
//             stream: true
//         }))
// });

// Minify compiled CSS
// gulp.task('minify-css', ['less'], function() {
//     return gulp.src('dist/css/sb-admin-2.css')
//         .pipe(cleanCSS({ compatibility: 'ie8' }))
//         .pipe(rename({ suffix: '.min' }))
//         .pipe(gulp.dest('dist/css'))
//         .pipe(browserSync.reload({
//             stream: true
//         }))
// });

// Copy JS to dist
// gulp.task('js', function() {
//     return gulp.src(['js/sb-admin-2.js'])
//         .pipe(header(banner, { pkg: pkg }))
//         .pipe(gulp.dest('dist/js'))
//         .pipe(browserSync.reload({
//             stream: true
//         }))
// })

// Minify JS
// gulp.task('minify-js', ['js'], function() {
//     return gulp.src('js/sb-admin-2.js')
//         .pipe(uglify())
//         .pipe(header(banner, { pkg: pkg }))
//         .pipe(rename({ suffix: '.min' }))
//         .pipe(gulp.dest('dist/js'))
//         .pipe(browserSync.reload({
//             stream: true
//         }))
// });

// Copy vendor libraries from /bower_components into /vendor
gulp.task('copy', function() {
  gulp.src(['bower_components/bootstrap/dist/**/*', '!**/npm.js', '!**/bootstrap-theme.*', '!**/*.map'])
      .pipe(gulp.dest('vendor/bootstrap'));

  gulp.src(['bower_components/bootstrap-social/*.css', 'bower_components/bootstrap-social/*.less', 'bower_components/bootstrap-social/*.scss'])
      .pipe(gulp.dest('vendor/bootstrap-social'));

  gulp.src(['bower_components/datatables/media/**/*'])
      .pipe(gulp.dest('vendor/datatables'));

  gulp.src(['bower_components/datatables-plugins/integration/bootstrap/3/*'])
      .pipe(gulp.dest('vendor/datatables-plugins'));

  gulp.src(['bower_components/datatables-responsive/css/*', 'bower_components/datatables-responsive/js/*'])
      .pipe(gulp.dest('vendor/datatables-responsive'));

  gulp.src(['bower_components/flot/*.js'])
      .pipe(gulp.dest('vendor/flot'));

  gulp.src(['bower_components/flot.tooltip/js/*.js'])
      .pipe(gulp.dest('vendor/flot-tooltip'));

  gulp.src(['bower_components/font-awesome/**/*', '!bower_components/font-awesome/*.json', '!bower_components/font-awesome/.*'])
      .pipe(gulp.dest('vendor/font-awesome'));

  gulp.src(['bower_components/jquery/dist/jquery.js', 'bower_components/jquery/dist/jquery.min.js'])
      .pipe(gulp.dest('vendor/jquery'));

  gulp.src(['bower_components/metisMenu/dist/*'])
      .pipe(gulp.dest('vendor/metisMenu'));

  gulp.src(['bower_components/morrisjs/*.js', 'bower_components/morrisjs/*.css', '!bower_components/morrisjs/Gruntfile.js'])
      .pipe(gulp.dest('vendor/morrisjs'));

  gulp.src(['bower_components/raphael/raphael.js', 'bower_components/raphael/raphael.min.js'])
      .pipe(gulp.dest('vendor/raphael'));

  gulp.src(['bower_components/sb-admin-2/js/sb-admin-2.js', 'bower_components/sb-admin-2/css/sb-admin-2.css'])
      .pipe(gulp.dest('vendor/sb-admin-2'));
});

// Run everything
// gulp.task('default', ['minify-css', 'minify-js', 'copy']);

// Configure the browserSync task
gulp.task('browserSync', function() {
  browserSync.init({
    // server: {
    //   baseDir: './views',
    //   index: 'index.html'
    // }
    proxy: 'http://localhost:3000',
    files: ['./views/*.html'],
    // browser: 'google chrome',
    // notify: false,
    port: 7000
  });
});

// Dev task with browserSync
// gulp.task('dev', ['browserSync', 'less', 'minify-css', 'js', 'minify-js'], function() {
//     gulp.watch('less/*.less', ['less']);
//     gulp.watch('dist/css/*.css', ['minify-css']);
//     gulp.watch('js/*.js', ['minify-js']);
//     // Reloads the browser whenever HTML or JS files change
//     gulp.watch('pages/*.html', browserSync.reload);
//     gulp.watch('dist/js/*.js', browserSync.reload);
// });

gulp.task('nodemon', function(cb) {
  let started = false;
  return nodemon({
    script: 'app.js',
    ext: 'js html',
    ignore: [
      'gulpfile.js',
      'node_modules/',
      'bower_components/'
    ],
    env: {'NODE_ENV': 'development'},
    stdout: true,
    watch: ['app.js', 'views/', 'routes/']
  // }).on('start', function() {
  //   console.log('start');
  //   // browserSync.reload();
  //   browserSync.init({
  //     // server: {
  //     //   baseDir: './views',
  //     //   index: 'index.html'
  //     // }
  //     proxy: 'http://localhost:3000',
  //     // files: ['./views/*.html'],
  //     // browser: 'google chrome',
  //     // notify: false,
  //     port: 7000
  //   }, function() {});
  // }).on('restart', function() {
  //   console.log('restart');
  //   // browserSync.reload();
  // });
  }).on('start', function() {
    if (!started) {
      cb();
      started = true;
    }
  });
});

// gulp.task('default', gulp.series('browserSync', function() {
//   gulp.watch('views/*.html', browserSync.reload);
// }));
// gulp.task('default', gulp.parallel('browserSync'));
// gulp.task('dev', gulp.parallel('browserSync'));
gulp.task('dev', gulp.series('nodemon', 'browserSync'));
