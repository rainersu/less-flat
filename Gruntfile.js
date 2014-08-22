
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
                    'dist/css/less-grid.css': 'less/less-grid.less' 
                }
            }
        },
        
        autoprefixer: {
            options: {
                browsers: [
                    '> 1%',
                    'last 2 versions',
                    'Firefox ESR',
                    'Opera 12.1',
                    'ie >= 7'
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
        
        copy: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'dist/',
                    src: ['**'],
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
        'clean',
        'newer:less',
        'newer:autoprefixer',
        'newer:cssmin',
        'newer:copy',
        'newer:update_json'
    ]);

};
