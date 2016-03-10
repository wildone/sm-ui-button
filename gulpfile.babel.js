// Core deps
// Use require() as because of rollup babel preset
var gulp = require('gulp'),
    notify = require('gulp-notify'),
    gulpif = require('gulp-if'),
    size = require('gulp-size'),
    plumber = require('gulp-plumber'),
    gulprun = require('run-sequence'),
    yargs = require('yargs'),
    browserSync = require('browser-sync'),
    wct = require('web-component-tester'),

    // HTML
    inline = require('gulp-inline-source'),
    processInline = require('gulp-process-inline'),
    minify = require('gulp-htmlmin'),

    // JS
    eslint = require('gulp-eslint'),
    rollup = require('gulp-rollup-file'),
    resolve = require('rollup-plugin-node-resolve'),
    commonJs = require('rollup-plugin-commonjs'),
    babel = require('rollup-plugin-babel'),

    // CSS
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer');

const bs = browserSync.create(),
      argv = yargs.boolean(['debug']).argv,
      errorNotifier = () => plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }),
      OPTIONS = {
        rollup: {
          plugins: [
            resolve({ main: true }),
            commonJs(),
            babel()
          ],
          format: 'iife'
        },
        postcss: [
          autoprefixer()
        ],
        inline: {
          compress: false,
          swallowErrors: true
        },
        HTMLmin: {
          removeComments: true,
          removeCommentsFromCDATA: true,
          collapseWhitespace: true,
          conservativeCollapse: true,
          caseSensitive: true,
          keepClosingSlash: true,
          customAttrAssign: [/\$=/],
          minifyCSS: true,
          minifyJS: true
        },
        browserSync: {
          server: {
            baseDir: './',
            index: 'demo/index.html',
            routes: {
              '/': './bower_components'
            }
          },
          open: false,
          notify: false
        }
      };

wct.gulp.init(gulp);

gulp.task('build', () => {
  return gulp.src(['src/*.html'])
          .pipe(errorNotifier())

            // Inline styles and scripts
            .pipe(inline(OPTIONS.inline))

            // Js
            .pipe(processInline().extract('script'))
              .pipe(eslint())
              .pipe(eslint.format())
              .pipe(gulpif(!argv.debug, eslint.failAfterError()))
              .pipe(rollup(OPTIONS.rollup))
            .pipe(processInline().restore())

            // CSS
            .pipe(processInline().extract('style'))
              .pipe(postcss(OPTIONS.postcss))
            .pipe(processInline().restore())

            // Minify and pipe out
            .pipe(gulpif(!argv.debug, minify(OPTIONS.HTMLmin)))
            .pipe(size({ gzip: true }))
          .pipe(gulp.dest('.'));
});

gulp.task('demo', (callback) => bs.init(OPTIONS.browserSync));

gulp.task('refresh', () => bs.reload());

gulp.task('test', ['build', 'test:local']);

gulp.task('watch', () => gulp.watch(['src/**/*'], () => gulprun('build', 'refresh')));

gulp.task('default', ['build', 'demo', 'watch']);
