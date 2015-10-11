
module.exports = function(grunt) {

  grunt.initConfig({

    jekyll: {
      build: {
        dest: '_site'
      }
    },

    sass: {
      dist: {
        files: {
          'css/app.css': 'sass/app.scss'
        }
      }
    },

    watch: {
      sass: {
        files: 'sass/**/*.scss',
        tasks: ['sass', 'cssmin']
      },
      jekyll: {
        files: ['_layouts/*.html', '_includes/*.html', '_plugins/*', '_posts/*', 'about/*', 'contact/*', 'portfolio/*', 'projects/*', 'blog/**/*', 'index.html', 'css/app.css'],
        tasks: ['jekyll']
      },
      scripts: {
        files: ['js/*.js'],
        tasks: ['uglify']
      }
    },
    // http://192.168.1.143:3001/
    // '_site/css/*.css'

    browser_sync: {
      dev: {
        options: {
          host: '192.168.1.143',
          files: ['_site/css/*.css'],
          watchTask: true,
          server: {
            baseDir: '_site'
          }
        }
      }
    },

    cssmin: {
      combine: {
        files: {
          'css/app.min.css': ['css/app.css']
        }
      }
    },

    uglify: {
      the_targets: {
        files: {
          'js/app.min.js': ['lib/modernizr.js', 'js/projects.js', 'js/gMap.js'],
          'js/lib.min.js': ['lib/jquery.typer.js', 'lib/jquery.hoverdir.js', 'lib/headroom/headroom.min.js']
        }
      }
    },

    buildcontrol: {
      options: {
        dir: '_site',
        commit: true,
        push: true,
        message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
      },
      pages: {
        options: {
          remote: 'git@github.com:jamesdmosier/jamesdmosier.github.io.git',
          branch: 'master'
        }
      }
    },

    clean: [
      '_site'
    ],


  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jekyll');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-build-control');
  grunt.loadNpmTasks('grunt-contrib-clean');


  // Custom tasks
  grunt.registerTask('build', ['sass', 'cssmin', 'uglify', 'jekyll']);
  //grunt.registerTask('postbuild', []);
  grunt.registerTask('default', ['build', 'browser_sync', 'watch']);

  grunt.registerTask('prod', ['sass', 'jekyll', 'cssmin', 'uglify', 'buildcontrol']);

  grunt.registerTask('publish', ['buildcontrol']);

};
