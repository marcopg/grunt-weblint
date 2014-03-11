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

    function lintAny(data) {
        var errors = [];
        var lineNumber = 1;

        data.split("\n").forEach(function(line) {
            // Ignore lines containing urls. less 1.3 cannot split them
            if (line.indexOf("://") < 0) {
                if (line.length > 80) {
                    errors.push({"line": lineNumber,
                                 "message": "Line too long"});
                }
            }

            if (/[ \t]+$/.test(line)) {
                errors.push({"line": lineNumber,
                             "message": "Trailing whitespace"});
            }

            lineNumber++;
        });

        return errors;
    }

    function lintCss(data) {
        var dict = {
            rules: [
                ["$", "return 'EOF';" ],
                ["\/.*", "return 'comment';" ],
                ["@import.*", "return 'import';" ],
                ["\\n", "return 'newline';"],
                ["\\s{4}", "return 'indent';" ],
                ["[^\\s{}][^;{}]*;", "return 'rule';" ],
                ["[^{}]*{", "return 'open';" ],
                [".*}", "return 'close';" ]
            ]
        };

        var errors = [];
        var indentLevel = 0;
        var indentCurrent = 0;
        var line = 1;
        var token;

        var lexer = new RegExpLexer(dict, data);
        while (token !== "EOF") {
            try {
                token = lexer.lex();
            } catch (e) {
                errors.push({"line": line,
                             "message": e.message});
                break;
            }

            switch (token) {
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
                        errors.push({"line": line,
                                     "message": "Unexpected indentation"});
                    }
                    break;
            }

            if (token !== "indent") {
                indentCurrent = 0;
            }
        }

        return errors;
    }

    grunt.registerMultiTask('weblint', 'Simple web languages linter',
        function() {
        var success = true;

        this.files.forEach(function(f) {
            var src = f.src.map(function(filepath) {
                var data = fs.readFileSync(filepath, {"encoding": "utf-8"});

                var anyErrors = lintAny(data);
                var cssErrors = lintCss(data);
                var allErrors = anyErrors.concat(cssErrors);

                if (allErrors.length > 0) {
                    success = false;

                    grunt.log.writeln((filepath + ":").bold);

                    for (var i = 0; i < allErrors.length; i++) {
                        var error = allErrors[i];
                        grunt.log.error("[" + error.line + "] " +
                                        error.message);
                    }
                }
            });
        });

        return success;
    });
};
