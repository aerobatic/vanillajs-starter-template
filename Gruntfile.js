module.exports = function(grunt) {
  grunt.initConfig({
    favicons: {
      options: {
        appleTouchBackgroundColor: "#ffffff",
        html: 'index.html',
        HTMLPrefix: 'favicons/',
        windowsTile: false
      },
      icons: {
        src: 'favicon.png',
        dest: 'favicons'
      }
    },
    uglify: {
      build: {
        files: {
          'dist/app.min.js': ['js/main.js', 'js/component.js']
        }
      }
    },
    stylus: {
      compile: {
        files: {
          'dist/styles.css': ['styl/*.styl'] // compile and concat into single file
        }
      }
    },
    watch: {
      scripts: {
        files: ['**/*.js'],
        tasks: ['uglify', 'stylus']
      },
    },
    aerobatic: {
      push: {
        files: ['*.html', 'dist/*.*'],
      },
      sim: {
        index: 'index.html',
        port: 3000
      }
    }
  });

  grunt.registerTask('sim', ['aerobatic:sim']);
  grunt.registerTask('push', ['aerobatic:push']);

  grunt.loadNpmTasks('grunt-favicons');
  // grunt.loadNpmTasks('grunt-aerobatic');
  grunt.loadTasks('../grunt-aerobatic/tasks');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
};
