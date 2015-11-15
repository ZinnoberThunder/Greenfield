var browserify = require('browserify');
var gulp = require('gulp');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var watchify = require('watchify');

var production = process.env.NODE_ENV === 'production';

// A browserify object with parameters that customize
// it to the application
var bundler = browserify({
  // Entry points to our app. In this case, it is the
  // app.js file (which loads our top-level component
  // and renders it to the index.html onto a div
  entries:      [ "./client/app.js" ],

  // Specify the 'translator' too that will convert JSX 
  // syntax to javascript. Babelify runs Babel, which 
  // is a javascript compiler
  transform:    [ babelify ],

  // Specify the specific 'translator(s)' needed to 
  // for the app. In this case, it is the react preset
  // package (babel-preset-react npm package). This
  // preset is also specified in the .babelrc file
  preset:       ["react"],

  // Use browserfiy in debug mode only when we are not
  // in production env
  debug:        !production,

  cache:        {}, // for watchify
  packageCache: {}, // for watchify
  fullPaths:    !production // for watchify
});

var build = function(watch) {
  // when in dev env, wrap the bundler in watchify
  // watchify monitors saved changes to any file that is
  // part of the bundle
  if(watch) {
    bundler = watchify(bundler);
  }

  // Performs the bundling of all the files, and concats
  // them into a bundle.js file in the dist folder
  // The bundle.js file is loaded by the index.html, and
  // contains all the application initialization/logic; 
  // basically, it is the application
  var rebundle = function() {
    var stream = bundler.bundle();
    stream.on('error', function (err) {
      console.log('Error with Browserify:', err);
    });
    stream = stream.pipe(source('bundle.js'));
    return stream.pipe(gulp.dest('./dist'));
  };

  // Event listener for a watchify 'update' event. When
  // there is a change, we want to rebundle the files to 
  // get an updated bundle.js
  bundler.on('update', rebundle);

  // Perform the bundling when this function is called
  return rebundle();
};

// A build task that calls build() and passes in false, 
// meaning we do not want to wrap it in watchify
gulp.task('build:js', function() {
  return build(false);
});

// A build task that calls build() and passes in true, 
// meaning we are in dev env and want to watchify
gulp.task('watch:js', function() {
  return build(true);
});

// A simple gulp task to copy the index.html to the dist
// folder upon each build
gulp.task('copy:html', function() {
    gulp.src('./client/index.html')
    .pipe(gulp.dest('./dist'));
});

// Use 'gulp serve' to run the watch:js task (which will
// build and watchify the app), and then start a nodemon 
// server that runs our server file
gulp.task('serve', ['watch:js', 'copy:html'], function() {
  return require('gulp-nodemon')({
    script: './server/server.js',
    ignore: ["gulpfile.js", "dist/bundle.js", "node_modules/*", "client/components/*"]
  });
});

// Is run upon deployment on Heroku with the npm start 
// script in package.json 
gulp.task('build', ['build:js', 'copy:html'], function() {
  return;
});

// Work around for exit bug and needing to hit ctrl-c twice
function exitHandler() { process.exit(0); }
process.once('SIGINT', exitHandler);
