var browserify = require('browserify');
var gulp = require('gulp');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var watchify = require('watchify');

var production = process.env.NODE_ENV === 'production';

var bundler = browserify({
  entries:      [ "./client/app.js" ],
  transform:    [ babelify ],
  preset:       ["react"],
  debug:        !production,
  cache:        {}, // for watchify
  packageCache: {}, // for watchify
  fullPaths:    !production // for watchify
});

var build = function(watch) {
  if(watch) {
    bundler = watchify(bundler);
  }

  var rebundle = function() {
    var stream = bundler.bundle();
    stream.on('error', function (err) {
      console.log('Error with Browserify:', err);
    });
    stream = stream.pipe(source('bundle.js'));
    return stream.pipe(gulp.dest('./dist'));
  };

  bundler.on('update', rebundle);
  return rebundle();
};

gulp.task('build:js', function() {
  return build(false);
});

gulp.task('watch:js', function() {
  return build(true);
});

gulp.task('serve', ['watch:js'], function() {
  return require('gulp-nodemon')({
    exec: 'node-inspector & node --debug',
    ext: 'js',
    script: './server/server.js',
    ignore: ["gulpfile.js", "bundle.js", "node_modules/*", "app/components/*"]
  });
});

gulp.task('build', ['build:js', 'css', 'font-awesome:fonts'], function() {
  return;
});

// work around for exit bug and needing to hit ctrl-c twice
function exitHandler() { process.exit(0); }
process.once('SIGINT', exitHandler);