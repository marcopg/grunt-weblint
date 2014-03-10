/*
 * grunt-weblint
 * https://github.com/marcopg/grunt-weblint
 *
 * Copyright (c) 2014 Marco Pesenti Gritti
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs');
var RegExpLexer = require("jison-lex");

function lintCss(filepath) {
    var dict = {
        rules: [
            ["$", "return 'EOF';" ],
            [".*{", "return 'open';" ],
            [".*}", "return 'close';" ],
            ["\/.*", "return 'comment';" ],
            ["@import.*", "return 'import';" ],
            ["\\n", "return 'newline';"],
            ["\\s{4}", "return 'indent';" ],
            ["[^\\s].*;", "return 'rule';" ]
        ]
    };

    var css = fs.readFileSync(filepath, {"encoding": "utf-8"});

    var indentLevel = 0;
    var indentCurrent = 0;
    var line = 1;
    var token;

    var lexer = new RegExpLexer(dict, css);
    while (token = lexer.lex(), token !== "EOF") {
        switch(token) {
            case "open":
                indentLevel++;
                break;
            case "close":
                indentLevel--;
                break;
            case "indent":
                indentCurrent++;
                break;
            case "newline":
                line++;
                break;
            case "rule":
                if (indentLevel !== indentCurrent) {
                    throw new Error("Unexpected indentation, line " + line);
                }
                break;
        }

        if (token !== "indent") {
            indentCurrent = 0;
        }
    }
}

module.exports = function(grunt) {
    grunt.registerMultiTask('weblint', 'Simple web languages linter',
        function() {
        this.files.forEach(function(f) {
            var src = f.src.map(function(filepath) {
                lintCss(filepath);
            });
        });
    });
};
