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
    var Compiler, Expressions, ScriptCompiler, isArray, isRuleMap, isString, parse, ref, ref1,
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

    ref = require('./Utility'), isRuleMap = ref.isRuleMap, parse = ref.parse;

    ref1 = require('goatee-script.js/lib/Utility'), isString = ref1.isString, isArray = ref1.isArray;

    ScriptCompiler = require('goatee-script.js/lib/Compiler');

    Expressions = require('./Expressions');


    /*
     * Compiling …
     * -----------
     *
     * … the goatee-rules.
     */


    /**
     * -------------
     * @class Compiler
     * @namespace GoateeRules
     */

    Compiler = (function(superClass) {
        extend(Compiler, superClass);


        /**
         * -------------
         * @param  {Function}  [parseImpl=GoateeRules.Utility.parse]
         * @constructor
         */

        function Compiler(parseImpl) {
            if (parseImpl == null) {
                parseImpl = parse;
            }
            Compiler.__super__.constructor.call(this, parseImpl);
        }


        /**
         * -------------
         * @method parse
         * @param  {Array|String|Object} code, a String, opcode-Array or Object with
         *                               toString method
         * @return {Expression}
         */

        Compiler.prototype.parse = function(code) {
            var i, important, key, len, map, rule, value;
            if (!isArray(code)) {
                return this.parseImpl(code.toString());
            }
            map = new Expressions;
            for (i = 0, len = code.length; i < len; i++) {
                rule = code[i];
                key = rule[0], value = rule[1], important = rule[2];
                map.add(key, this.toExpression(value), important);
            }
            return map;
        };


        /**
         * -------------
         * @method evaluate
         * @param  {Array|String|Object} code, a String, opcode-Array or Object with
         *                               toString method
         * @param  {Object}              context (optional)
         * @param  {Object}              variables (optional)
         * @param  {Array}               scope (optional)
         * @param  {Array}               stack (optional)
         * @return {mixed}
         */

        Compiler.prototype.evaluate = function(code, context, variables, scope, stack) {
            var map;
            if (context == null) {
                context = {};
            }
            if (variables == null) {
                variables = {};
            }
            map = this.parse(code);
            return map.each(function(key, value, important) {
                map.rules[key] = value.evaluate(context, variables, scope, stack);
            });
        };


        /**
         * -------------
         * @method ast
         * @param  {Array|String|Object} code, a String, opcode-Array or Object with
         *                               toString method
         * @param  {Function}            callback (optional)
         * @param  {Boolean}             [compress=true]
         * @return {Array}
         */

        Compiler.prototype.ast = function(data, callback, compress) {
            var comp, rules, save, self, tree;
            if (compress == null) {
                compress = true;
            }
            rules = isRuleMap(data) ? data : this.parse(data);
            self = this;
            save = this.save;
            comp = this.compress;
            tree = [];
            rules.map(function(key, value, important) {
                var ast;
                ast = save.call(self, value, callback, compress);
                tree.push([key, compress ? comp.call(self, ast) : ast, important]);
            });
            return tree;
        };


        /**
         * -------------
         * @method stringyfy
         * @param  {Array|String|Object} code, a String, opcode-Array or Object with
         *                               toString method
         * @param  {Function}            callback (optional)
         * @param  {Boolean}             [compress=true]
         * @return {String}
         */

        Compiler.prototype.stringify = function(data, callback, compress) {
            var i, important, index, key, len, opcode, rule, value;
            if (compress == null) {
                compress = true;
            }
            opcode = this.ast(data, callback, compress);
            if (compress) {
                for (index = i = 0, len = opcode.length; i < len; index = ++i) {
                    rule = opcode[index];
                    key = rule[0], value = rule[1], important = rule[2];
                    key = JSON.stringify(key);
                    value = "[" + value[0] + "," + (JSON.stringify(value[1])) + "]";
                    important = JSON.stringify(important);
                    opcode[index] = "[" + key + "," + value + "," + important + "]";
                }
                return "[" + (opcode.join('],[')) + "]";
            } else {
                return JSON.stringify(opcode);
            }
        };


        /**
         * -------------
         * @method load
         * @param  {String|Array} data            opcode-String or -Array
         * @param  {Boolean}      [compress=true]
         * @return {String}
         */

        Compiler.prototype.load = function(data, compress) {
            var code, i, important, key, len, opcode, rule, value;
            if (compress == null) {
                compress = true;
            }
            opcode = isArray(data) ? data : this.expand(data);
            code = [];
            for (i = 0, len = opcode.length; i < len; i++) {
                rule = opcode[i];
                key = rule[0], value = rule[1], important = rule[2];
                important = important ? ' !important' : '';
                code.push(key + ":" + (Compiler.__super__.load.call(this, value, compress)) + important);
            }
            return code.join(';');
        };

        return Compiler;

    })(ScriptCompiler);

    module.exports = Compiler;

}).call(this);
//# sourceMappingURL=Compiler.js.map
