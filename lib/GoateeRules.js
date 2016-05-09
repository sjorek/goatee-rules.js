/*
© Copyright 2013-2016 Stephan Jorek <stephan.jorek@gmail.com>

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
 */


/*
 * # GoateeRules's …
 * ------------------
 *
 * … main entry-point.
 *
 */


/**
 * -------------
 * @class GoateeRules
 * @namespace GoateeRules
 */

(function() {
    var GoateeRules;

    GoateeRules = (function() {
        var _compiler;

        function GoateeRules() {}

        GoateeRules.NAME = require('../package.json').name;

        GoateeRules.VERSION = require('../package.json').version;

        _compiler = null;


        /**
         * -------------
         * @method parse
         * @param {String} code
         * @return {Expression}
         * @static
         */

        GoateeRules.parse = function(code) {
            if (_compiler == null) {
                _compiler = new(require('./Compiler'));
            }
            return _compiler.parse(code);
        };


        /**
         * -------------
         * @method evaluate
         * @param {String} code
         * @param {Object} [context]
         * @param {Object} [variables]
         * @param {Array}  [scope]
         * @param {Array}  [stack]
         * @return {mixed}
         * @static
         */

        GoateeRules.evaluate = function(code, context, variables, scope, stack) {
            if (_compiler == null) {
                _compiler = new(require('./Compiler'));
            }
            return _compiler.evaluate(code, context, variables, scope, stack);
        };


        /**
         * -------------
         * @method render
         * @param {String} code
         * @return {String}
         * @static
         */

        GoateeRules.render = function(code) {
            if (_compiler == null) {
                _compiler = new(require('./Compiler'));
            }
            return _compiler.render(code);
        };


        /**
         * -------------
         * @method ast
         * @param  {String|Expression} code
         * @param  {Function}          [callback]
         * @param  {Boolean}           [compress=true]
         * @return {Array|String|Number|true|false|null}
         * @static
         */

        GoateeRules.ast = function(data, callback, compress) {
            if (_compiler == null) {
                _compiler = new(require('./Compiler'));
            }
            return _compiler.ast(data, callback, compress);
        };


        /**
         * -------------
         * @method stringify
         * @param  {String|Expression} data
         * @param  {Function}          [callback]
         * @param  {Boolean}           [compress=true]
         * @return {String}
         * @static
         */

        GoateeRules.stringify = function(data, callback, compress) {
            if (_compiler == null) {
                _compiler = new(require('./Compiler'));
            }
            return _compiler.stringify(data, callback, compress);
        };


        /**
         * -------------
         * @method compile
         * @param  {String|Array}      data
         * @param  {Function}          [callback]
         * @param  {Boolean}           [compress=true]
         * @return {String}
         * @static
         */

        GoateeRules.compile = function(data, callback, compress) {
            if (_compiler == null) {
                _compiler = new(require('./Compiler'));
            }
            return _compiler.compile(data, callback, compress);
        };

        return GoateeRules;

    })();

    module.exports = GoateeRules;

}).call(this);
//# sourceMappingURL=GoateeRules.js.map
