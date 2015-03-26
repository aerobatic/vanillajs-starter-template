module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      all: ['Gruntfile.js', 'js/**/*.js']
    },
    uglify: {
      build: {
        files: {
          'dist/app.min.js': ['js/**/*.js']
        }
      }
    },
    // If you are using a
    cssmin: {
      combine: {
        files: {
          'dist/app.min.css': ['node_modules/normalize-css/normalize.css', 'css/main.css']
        }
      }
    },
    copy: {
      dist: {
        files: [
          {src: 'index.html', dest: 'dist/index.html'},
          {expand: true, src: ['images/**'], dest: 'dist/'}
        ]
      }
    }
  });

  grunt.registerTask('build', ['jshint', 'copy:dist', 'uglify', 'cssmin']);

  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
};
