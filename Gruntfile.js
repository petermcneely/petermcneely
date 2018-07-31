module.exports = function (grunt) {

    grunt.registerTask('production-default', ['clean', 'env:build', 'copy', 'hapi', 'watch']);

    grunt.registerTask('development-default', ['clean', 'env:dev', 'copy', 'hapi', 'watch']);

    grunt.registerTask('production-build', ['clean', 'env:build', 'copy']);

    grunt.registerTask('development-build', ['clean', 'env:dev', 'copy']);

    grunt.registerTask('run', ['hapi', 'watch']);

    grunt.initConfig({

        env: {
            dev: {
                NODE_ENV: 'development'
            },
            build: {
                NODE_ENV: 'production'
            }
        },

        watch: {
            hapi: {
                files: [
                    './app/assets/**/*.{png,jpg,jpeg,mp3,ico,pdf}',
                    './app/scripts/**/*.js',
                    './app/styles/**/*.css',
                    './app/pages/**/*.html',
                    './app/templates/**/*.html',
                    'Gruntfile.js'
                ],
                tasks: [
                    'clean',
                    'copy'
                ],
                options: {
                    spawn: false
                }
            }
        },

        copy: {
            main: {
                expand: true,
                    src: ['index.html'],
                        dest: './dist',
                            cwd: './app/pages',
                        options: {
                    process: function (content, srcpath) {
                        return content.replace(/scripts\/firebase\.js/g, 'scripts/firebase.' + process.env.NODE_ENV + '.js');
                    }
                }
            },
            dist: {
                files: [{
                    expand: true,
                    src: ['./assets/**/*.{png,jpg,jpeg,mp3,ico,pdf}'],
                    dest: './dist',
                    cwd: './app'
                }, {
                    expand: true,
                    src: ['./**/*.html', '!./**/index.html'],
                    dest: './dist',
                    cwd: './app/pages'
                }, {
                    expand: true,
                    src: ['./**/*.css'],
                    dest: './dist/styles',
                    cwd: './app/styles'
                }, {
                    expand: true,
                    src: ['./**/*.js'],
                    dest: './dist/scripts',
                    cwd: './app/scripts'
                }, {
                    expand: true,
                    src: ['./**/*.html'],
                    dest: './dist/templates',
                    cwd: './app/templates'
                }]
            },
            
        },

        hapi: {
            custom_options: {
                options: {
                    server: require('path').resolve('./server'),
                    bases: {
                        '/dist': require('path').resolve('./dist/')
                    }
                }
            }
        },

        clean: ['./dist'],
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-hapi');
    grunt.loadNpmTasks('grunt-env');

};
