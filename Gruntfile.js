/*
 * grunt-weblint
 * https://github.com/marcopg/grunt-weblint
 *
 * Copyright (c) 2014 Marco Pesenti Gritti
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js'
            ],
            options: {
                jshintrc: '.jshintrc',
            },
        },
        run_grunt: {
            valid: {
                src: ['test/Gruntfile-succeed.js']
            },
            invalid: {
                options: {
                    expectFail: true
                },
                src: ['test/Gruntfile-fail.js']
            }
        }
    });

    grunt.loadTasks('tasks');

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-run-grunt');

    grunt.registerTask('test', ['run_grunt']);
    grunt.registerTask('default', ['jshint', 'test']);
};
