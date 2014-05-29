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
        weblint: {
            valid: {
                src: ['fixtures/2.css']
            }
        }
    });

    grunt.loadTasks('../tasks');

    grunt.registerTask('default', ['weblint']);
};
