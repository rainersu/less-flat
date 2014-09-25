
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
            'jekyll_src/js/**/*',
            'jekyll_src/css/**/*'
        ],
        
        less: {
            dist: {
                files: [{
                    'jekyll_src/css/less-grid.css': 'less/less-grid.less'                  
                },{
                    expand: true,
                    cwd: 'less/doc/',
                    src: ['*.less'],
                    dest: 'jekyll_src/css/doc/',
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
					'jekyll_src/css/*.css',
					'jekyll_src/css/doc/*.css'
				]
            }
        },
        
        cssmin: {
            options: {
                report: 'gzip'
            },
            dist: {
                expand: true,
                cwd: 'jekyll_src/css/',
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
                    'jekyll_src/js/less-grid.js': ['js/less-grid.js']
                },{
                    expand: true,
                    cwd: 'js/doc/',
                    src: ['*.js', '!*.min.js'],
                    dest: 'jekyll_src/js/doc/'       
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
                    cwd: 'jekyll_src/js',
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
                    dest: 'jekyll_src/js/'                     
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
