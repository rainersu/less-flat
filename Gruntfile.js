
'use strict';

module.exports = function(grunt) {

    grunt.util.linefeed = '\n';
    
    grunt.initConfig({
        
        pkg: grunt.file.readJSON('package.json'),
        
        update_json: {
            bower: {
                src: 'package.json',
                dest: 'bower.json',
                fields: [
                    'name',
                    'description',     
                    'version',
                    'keywords',
                    'homepage',
                    'author',
                    'licenses',
                    'title',
                    'repository'
                ]
            }
        },
        
        clean: [
            'dist/js/**/*',
            'dist/css/**/*',
            '_docs/js/**/*',
            '_docs/css/**/*'
        ],
        
        less: {
            dist: {
                files: [{
                    '_docs/css/less-flat.css': 'less/less-flat.less'                  
                },{
                    expand: true,
                    cwd: 'less/doc/',
                    src: ['*.less'],
                    dest: '_docs/css/doc/',
                    ext: '.css' 
                }]
            }
        },
        
        autoprefixer: {
            options: {
                browsers: [
                    '> 1%',
                    'last 2 versions',
                    'Chrome >= 1',
                    'Opera >= 9',
                    'ff >= 2',
                    'ie >= 7',
                    'Opera 12.1',
                    'Firefox ESR'
                ]
            },
            dist: {
				diff: true,
                expand: true,
                src: [
					'_docs/css/*.css',
					'_docs/css/doc/*.css'
				]
            }
        },
        
        cssmin: {
            options: {
                report: 'gzip'
            },
            dist: {
                expand: true,
                cwd: '_docs/css/',
                src: ['*.css', '!*.min.css'],
                dest: 'dist/css/',
                ext: '.min.css'             
            }
        },
        
        uglify: {
            init: {
                options: {
					mangle: false,
                    beautify: true
                },
                files: [{
                    '_docs/js/less-flat.js': ['js/less-flat.js']
                },{
                    expand: true,
                    cwd: 'js/doc/',
                    src: ['*.js', '!*.min.js'],
                    dest: '_docs/js/doc/'       
                }]
            },
            dist: {
                options: {
                    mangle: true,
                    preserveComments: true,
                    report: 'gzip'
                },
                files: [{
                    expand: true,
                    cwd: '_docs/js',
                    src: ['*.js', '!*.min.js'],
                    dest: 'dist/js/',
                    ext: '.min.js' 
                }]
            }
        },
        
        copy: {
            init: {
                files: [{
                    expand: true,
                    flatten: true,
                    src: [
                        'bower_libs/respond/dest/respond.min.js',
                        'bower_libs/jquery-1x/dist/jquery.min.js'
                    ],
                    dest: 'dist/js/'                      
                },{
                    expand: true,
                    flatten: true,
                    src: [
                        'bower_libs/respond/dest/respond.min.js',
                        'bower_libs/jquery-1x/dist/jquery.min.js'
                    ],
                    dest: '_docs/js/'                     
                }
            ]}
        }

    });
    
    require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});
    require('time-grunt')(grunt);
    
    grunt.registerTask('default',[
        'update_json',
        'clean',
        'less',
        'autoprefixer',
        'cssmin',
        'copy',
        'uglify'
    ]);

};
