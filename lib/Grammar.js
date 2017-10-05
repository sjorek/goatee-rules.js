/* ^
BSD 3-Clause License

Copyright (c) 2017, Stephan Jorek
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this
  list of conditions and the following disclaimer.

* Redistributions in binary form must reproduce the above copyright notice,
  this list of conditions and the following disclaimer in the documentation
  and/or other materials provided with the distribution.

* Neither the name of the copyright holder nor the names of its
  contributors may be used to endorse or promote products derived from
  this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function() {
    var Grammar, Notator, Scope, ScriptGrammar, isFunction, isString, ref,
        extend = function(child, parent) {
            for (var key in parent) {
                if (hasProp.call(parent, key)) child[key] = parent[key];
            }

            function ctor() {
                this.constructor = child;
            }
            ctor.prototype = parent.prototype;
            child.prototype = new ctor();
            child.__super__ = parent.prototype;
            return child;
        },
        hasProp = {}.hasOwnProperty;

    ScriptGrammar = require('goatee-script.js/lib/Grammar');

    Notator = require('goatee-script.js/lib/Notator');

    ref = require('goatee-script.js/lib/Utility'), isString = ref.isString, isFunction = ref.isFunction;

    Scope = require('./Scope');

    Grammar = (function(superClass) {

        /**
         * -------------
         * Loads the our **Grammar**
         *
         * @method load
         * @param  {String} [filename]
         * @return {Parser}
         * @static
         */
        extend(Grammar, superClass);

        Grammar.load = function(filename, scope, notator) {
            var grammar;
            if (filename == null) {
                filename = './grammar/jison.coffee';
            }
            if (scope == null) {
                scope = {};
            }
            if (notator == null) {
                notator = Notator;
            }
            if (scope.goatee == null) {
                scope.goatee = new Scope();
            }
            grammar = require(filename);
            if (isFunction(grammar)) {
                grammar = grammar(scope, notator);
            }
            grammar.yy.goatee = scope.goatee;
            return grammar;
        };


        /**
         * -------------
         * Initializes our **Grammar**
         *
         * @method create
         * @param  {String|Object} grammar filepath or object
         * @return {Grammar}
         * @static
         */

        Grammar.create = function(grammar, scope, notator) {
            if (grammar == null) {
                grammar = null;
            }
            if (scope == null) {
                scope = {};
            }
            if (notator == null) {
                notator = Notator;
            }
            if (grammar === null || isString(grammar)) {
                grammar = Grammar.load(grammar, scope, notator);
            }
            return grammar = new Grammar(grammar);
        };


        /**
         * -------------
         * Create and return the parsers source code wrapped into a closure, still
         * keeping the value of `this`.
         *
         * @method generateParser
         * @param  {Function} [generator]
         * @param  {String} [comment]
         * @param  {String} [prefix]
         * @param  {String} [suffix]
         * @return {String}
         * @static
         */

        Grammar.generateParser = function(parser, comment, prefix, suffix) {
            if (parser == null) {
                parser = null;
            }
            if (comment == null) {
                comment = '/* Goatee Rules Parser */\n';
            }
            if (prefix == null) {
                prefix = null;
            }
            if (suffix == null) {
                suffix = null;
            }
            if (parser === null || isString(parser)) {
                parser = Grammar.createParser(parser);
            }
            return ScriptGrammar.generateParser(parser, comment, prefix, suffix);
        };


        /**
         * -------------
         * Initializes the **Parser** with our **Grammar**
         *
         * @method createParser
         * @param  {Grammar} [grammar]
         * @param  {Function|Boolean} [log]
         * @return {Parser}
         * @static
         */

        Grammar.createParser = function(grammar, log) {
            if (grammar == null) {
                grammar = null;
            }
            if (log == null) {
                log = null;
            }
            if (grammar === null || isString(grammar)) {
                grammar = Grammar.create(grammar);
            }
            return ScriptGrammar.createParser(grammar, log);
        };


        /**
         * -------------
         * Use the default jison-lexer
         *
         * @constructor
         */

        function Grammar(grammar1) {
            this.grammar = grammar1;
            Grammar.__super__.constructor.call(this, this.grammar);
        }

        return Grammar;

    })(ScriptGrammar);

    module.exports = Grammar;

}).call(this);
//# sourceMappingURL=Grammar.js.map
