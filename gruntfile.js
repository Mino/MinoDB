module.exports = function(grunt) {

    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            build: {
                options: {
                    mangle: false,
                    compress: false,
                    beautify: true
                },
                files: {
                    'public/javascript.js': [
                        'public/Strings.js',
                        'public/common.js',
                        'public/sa-site-framework/jquery.min.js',
                        'public/sa-site-framework/jquery.history.js',
                        'public/sa-site-framework/jquery.cms_string.js',
                        'public/sa-site-framework/jquery.ajax_url.js',
                        'public/sa-site-framework/jquery.tappable.js',
                        'public/sa-site-framework/Page.js',
                        'public/sa-site-framework/SiteFramework.js',
                        'public/Libraries/**/**.js',
                        'public/Classes/**/**.js',
                        'public/Elements/*/*.js',
                        'public/Pages/**/*.js',
                        'public/init.js'
                    ]
                }
            }
        },
        less: {
            development: {
                options: {
                    paths: ["assets/css"],
                    cleancss: true
                },
                files: {
                    "public/style.css": "public/Style/style.less"
                }
            }
        },
        watch: {
            less: {
                files: [
                    'public/**/*.subless',
                    'public/**/**/*.subless',
                    'public/**/*.less',
                    '!public/style.css'
                ],
                tasks: ['less']
            },
            js: {
                files: [
                    '**/*.js',
                    '**/**/*.js',
                    '!public/javascript.js'
                ],
                tasks: ['uglify']
            }
        }
    });

    grunt.registerTask('default', []);

};