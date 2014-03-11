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

module.exports = function(grunt) {
    function logError(lineNumber, message) {
        grunt.log.error("[" + lineNumber + "] " + message);
    }

    function lintAny(data) {
        var lineNumber = 1;
        data.split("\n").forEach(function(line) {
            if (line.length > 80) {
                logError(lineNumber, "Line too long");
            }

            if (/[ \t]+$/.test(line)) {
                logError(lineNumber, "Trailing whitespace");
            }

            lineNumber++;
        });
    }

    function lintCss(data) {
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

        var indentLevel = 0;
        var indentCurrent = 0;
        var line = 1;
        var token;

        var lexer = new RegExpLexer(dict, data);
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
                        logError(line, "Unexpected indentation");
                    }
                    break;
            }

            if (token !== "indent") {
                indentCurrent = 0;
            }
        }
    }

    grunt.registerMultiTask('weblint', 'Simple web languages linter',
        function() {
        this.files.forEach(function(f) {
            var src = f.src.map(function(filepath) {
                var data = fs.readFileSync(filepath, {"encoding": "utf-8"});

                lintAny(data);
                lintCss(data);
            });
        });
    });
};
