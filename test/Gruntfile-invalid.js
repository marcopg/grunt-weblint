'use strict';

module.exports = function(grunt) {

    grunt.initConfig({
        weblint: {
            1: { src: ['fixtures/2.css'] },
            2: { src: ['fixtures/3.css'] },
            3: { src: ['fixtures/1.css'] }
        }
    });

    grunt.loadTasks('../tasks');

    grunt.registerTask('default', ['weblint']);
};
