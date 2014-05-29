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
            options: {
                expectFail: true
            },
            valid: {
                options: {
                    expectFail: false
                },
                src: ['test/Gruntfile-valid.js']
            },
            invalid1: {
                options: { task: ['weblint:1'] },
                src: ['test/Gruntfile-invalid.js']
            },
            invalid2: {
                options: { task: ['weblint:2'] },
                src: ['test/Gruntfile-invalid.js']
            },
            invalid3: {
                options: { task: ['weblint:3'] },
                src: ['test/Gruntfile-invalid.js']
            }
        }
    });

    grunt.loadTasks('tasks');

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-run-grunt');

    grunt.registerTask('test', ['run_grunt']);
    grunt.registerTask('default', ['jshint', 'test']);
};
