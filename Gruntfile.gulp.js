var gulp   = require('gulp');
  jshint = require('gulp-jshint'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  minifyCSS = require('gulp-minify-css');

module.exports = function(grunt) {
  grunt.initConfig({
    gulp: {
      js: function() {
        return gulp.src('js/**/*.js')
          .pipe(jshint())
          .pipe(jshint.reporter('default'))
          .pipe(jshint.reporter('fail'))
          .pipe(concat('app.min.js'))
          .pipe(uglify())
          .pipe(gulp.dest('./dist'));
      },
      css: function() {
        return gulp.src('css/**/*.css')
          .pipe(concat('app.min.css'))
          .pipe(minifyCSS())
          .pipe(gulp.dest('./dist'))
      }
    },
    watch: {
      options: {
        spawn: true,
        livereload: true
      },
      index: {
        files: ['index.html']
      },
      css: {
        files: ['css/*.css'],
        livereload: true
      },
      scripts: {
        files: ['js/**/*.js'],
        tasks: ['uglify']
      }
    },
    aerobatic: {
      // These are the files that should be deployed to the cloud.
      deploy: {
        src: ['index.html', 'dist/*.*', 'images/*', 'favicon.*']
      },
      sim: {
        index: 'index.html',
        port: 3000,
        livereload: true
      }
    }
  });


  grunt.registerTask('build', ['gulp:js', 'gulp:css']);

  // Specify the sync option to avoid blocking the watch task
  grunt.registerTask('sim', ['aerobatic:sim:sync', 'watch']);

  // Create a deploy alias task which builds then deploys to aerobatic in the cloud
  grunt.registerTask('deploy', ['build', 'aerobatic:deploy']);

  grunt.loadNpmTasks('grunt-aerobatic');
  grunt.loadNpmTasks('grunt-gulp');
  grunt.loadNpmTasks('grunt-contrib-watch');
};
