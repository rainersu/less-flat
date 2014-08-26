
'use strict';

module.exports = function(grunt) {

    grunt.util.linefeed = '\n';
    
    grunt.initConfig({
        
        pkg: grunt.file.readJSON('package.json'),

        clean: [
            'dist/js/**/*',
            'dist/css/**/*',
            'jekyll_src/js/**/*',
            'jekyll_src/css/**/*'
        ],
        
        less: {
            dist: {
                files: {
                    'jekyll_src/css/doc.css': 'less/doc.less',
                    'dist/css/less-grid.css': 'less/less-grid.less'
                }
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
                expand: true,
                src: 'dist/css/*.css'
            }
        },
        
        cssmin: {
            options: {
                report: 'gzip'
            },
            dist: {
                expand: true,
                cwd: 'dist/css/',
                src: ['*.css', '!*.min.css'],
                dest: 'dist/css/',
                ext: '.min.css'             
            }
        },
        
        uglify: {
            build: {
                options: {  
                    beautify: true,
                    preserveComments: true
                },
                files: {
                   'dist/js/less-grid.js': ['js/less-grid.js'] 
                }
                
            },
            dist: {
                options: {
                    mangle: true,
                    report: 'gzip'
                },
                files: [{
                    expand: true,
                    cwd: 'dist/js',
                    src: ['*.js', '!*.min.js'],
                    dest: 'dist/js/',
                    ext: '.min.js' 
                }]
            }
        },
        
        copy: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'dist/',
                    src: ['**', '!*.min.*'],
                    dest: 'jekyll_src/'
                }]
            }   
        },
                
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
        }

    });
    
    require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});
    require('time-grunt')(grunt);
    
    grunt.registerTask('default',[
        'newer:update_json',
        'clean',
        'less',
        'autoprefixer',
        'cssmin',
        'uglify',
        'newer:copy'
    ]);

};
