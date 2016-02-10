module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-svgmin');
    grunt.initConfig({
        /*
        uglify: {
            my_target: {
                files: {
                    'js/script.js' : ['components/js/*.js']
                } //files
            } //my_target
        },//uglify*/
        compass: {
            dev: {
                options: {
                    environment: 'development',
                    config: 'config.rb'
                } //options
            }, //dev
            /*
            production: {
                options: {
                        environment: 'production',
                        config: 'config.rb'                        
                    } //options
            } //production*/
        },//compass
        
        svgmin: {
            options: {
                    plugins: [
                            { removeViewBox: false }, 
                            //{ removeUselessStrokeAndFill: false }
                    ]
            },
            dist: {
                files: {
                    'images/*.svg': 'images/svg/*.svg'
                }
            }
        },//svgmin
        postcss: {
            options: {
              map: true, // inline sourcemaps

              // or
              map: {
                  inline: false, // save all sourcemaps as separate files...
                  annotation: 'dist/css/maps/' // ...to the specified directory
              },

              processors: [
                require('pixrem')(), // add fallbacks for rem units
                require('autoprefixer')({browsers: 'last 2 versions'}), // add vendor prefixes
                require('cssnext')(),
                require('precss')(),
                require('cssnano')() // minify the result
              ]
            },
            dist: {
              src: 'css/*.css'
            }
          },
        watch: {
            options: {livereload: true },
            svg: {
                files: ['images/svg/*.svg'],
                tasks: ['svgmin']
            }, //svg
            scripts: {
                files: ['js/*.js'],
                tasks: ['uglify']
            }, //scripts
            sass: {
                files: ['scss/**/*.scss'],
                tasks: ['compass']
            } //sass
          } //watch

    })//initConfig
    grunt.loadNpmTasks('grunt-postcss');
    grunt.registerTask('default', 'watch');
}//exports