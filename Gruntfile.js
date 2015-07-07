module.exports = function(grunt) {

  // Default port
  var LIVERELOAD_PORT = 35729;

  var globalConfig = {
    site: '_site/',
    scssdir: '_scss/'
  };

  // Grunt Loaded Tasks
  // http://chrisawren.com/posts/Advanced-Grunt-tooling
  // ------------------------------------------------
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);


  // Project configuration
  // ------------------------------------------------
  grunt.initConfig({

    // Load vars from globalConfig
    // http://chrisawren.com/posts/Advanced-Grunt-tooling
    globalConfig: globalConfig,

    // JSON Grunt Package
    // Stores your Package file so you can reference its specific data whenever necessary
    // http://gruntfiles.github.io/gruntfiles/integralist/Gruntfile.js
    // ------------------------------------------------
    pkg: grunt.file.readJSON('package.json'),


    // Notify
    // Automatic desktop notifications for Grunt
    // https://github.com/dylang/grunt-notify
    // ------------------------------------------------
    notify: {
      alert: {
        options: {
          title: 'Success',
          message: 'Build complete'
        }
      },
    },

    // SCSS compilation
    // Let grunt handle this so we can get a .css file and copy it into the _includes dir.
    // This allows us to include the .css file inline when jekyll builds out
    // ------------------------------------------------
    sass: {
			dist: {
				options: {
					style: 'compressed'
				},
				files: {
					'_includes/critical.css': '<%= globalConfig.scssdir %>critical.scss',
          '_includes/highlight.css': '<%= globalConfig.scssdir %>syntax-highlighting.scss',
          'css/styles.css': '<%= globalConfig.scssdir %>styles.scss'
				}
			}
		},

    shell: {
			jekyll: {
				command: 'jekyll build',
				options: {
					stdout: true,
					execOptions: {
					//	cwd: '<%= config.root %>'
					}
				}
			}
		},

    // HTML Minification
    // ------------------------------------------------
    htmlmin: {
			main: {
				options: {
					removeComments: true,
					collapseWhitespace: true
				},
				files: [
					{
						expand: true,
						cwd: '<%= globalConfig.site %>',
						src: '**/*.html',
						dest: '<%= globalConfig.site %>'
					}
				]
			}
		},

    connect: {
      server: {
        options: {
          port: 9001,
          base: '_site/',
          // This will inject live reload script into the html
          livereload: LIVERELOAD_PORT
        }
      }
    },


    watch: {
      options: {
        livereload: LIVERELOAD_PORT
      },
      assets: {
        files: ['<%= globalConfig.scssdir %>**/*.scss'],
        tasks: ['assets', 'content']
      },
      content: {
        files: ['_posts/**/*', '_layouts/**/*', 'about/**/*', 'index.html', '_plugins/**/*', '_includes/**/*' ],
        tasks: ['content']
      }
    }
  });


  // Registered Grunt Tasks
  // ------------------------------------------------
  grunt.registerTask('assets', ['sass']);
  grunt.registerTask('content', ['shell:jekyll', 'htmlmin']);
  grunt.registerTask('build', ['assets', 'content', 'notify']);
  grunt.registerTask('serve', ['connect', 'watch']);
  grunt.registerTask('default', ['build']);


};
