/*
© Copyright 2013-2016 Stephan Jorek <stephan.jorek@gmail.com>

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

<http://www.apache.org/licenses/LICENSE-2.0>

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
implied. See the License for the specific language governing
permissions and limitations under the License.
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

    ref = require('goatee-script.js/lib//Utility'), isString = ref.isString, isFunction = ref.isFunction;

    Scope = require('./Scope');

    Grammar = (function(superClass) {

        /**
         * -------------
         * Loads the our **Grammar**
         *
         * @method loadGrammar
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
