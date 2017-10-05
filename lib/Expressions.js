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


/*
 * # ExpressionMap …
 * ---------------
 *
 * ExpressionMaps look like “attribute-key: expression; another-key: expression”.
 * They provide a implementation of normalized to dash-seperated RuleMap.
 *
 */


/**
 * -------------
 * A helping wrapper …
 *
 * @function _create
 * @param {Function} ParentClass
 * @private
 */

(function() {
    var _create, _kind, i, len, ref,
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

    _create = function(ParentClass) {

        /**
         * -------------
         * @class ExpressionMap
         * @namespace GoateeRules
         */
        var ExpressionMap;
        ExpressionMap = (function(superClass) {
            var parse;

            extend(ExpressionMap, superClass);

            function ExpressionMap() {
                return ExpressionMap.__super__.constructor.apply(this, arguments);
            }

            parse = null;


            /**
             * -------------
             * Compatibillity layer for expressions
             *
             * @property operator
             * @type {Object}
             */

            ExpressionMap.prototype.operator = {
                name: 'rules'
            };


            /**
             * -------------
             * Parses the given string  and applies the resulting map to this map, taking
             * priorities into consideration.
             *
             * @method apply
             * @param  {String} string
             * @return {RuleMap}
             */

            ExpressionMap.prototype.apply = function(string) {
                if (parse == null) {
                    parse = require('./Parser').parse;
                }
                return this.inject(parse(string, this));
            };


            /**
             * -------------
             * @method normalizeValue
             * @param  {Expression} expression
             * @return {Expression}
             */

            ExpressionMap.prototype.normalizeValue = function(expression) {
                return expression;
            };


            /**
             * -------------
             * @method toJSON
             * @param  {Function}  callback (optional)
             * @return {Array}
             */

            ExpressionMap.prototype.toJSON = function(callback) {
                if (callback) {
                    return callback(this);
                }
                return this.flatten();
            };


            /**
             * -------------
             * @method callback
             * @param  {Function}  callback (optional)
             * @return {ExpressionMap}
             */

            ExpressionMap.prototype.callback = function(callback) {
                return this.each(function(key, expression, important) {
                    return expression.callback(callback);
                });
            };


            /**
             * -------------
             * @method evaluate
             * @param  {Object} context (optional)
             * @param  {Object} variables (optional)
             * @param  {Array}  scope (optional)
             * @param  {Array}  stack (optional)
             * @return {Object}
             */

            ExpressionMap.prototype.evaluate = function(context, variables, scope, stack) {
                var rules;
                if (context == null) {
                    context = {};
                }
                if (variables == null) {
                    variables = {};
                }
                rules = {};
                this.map(function(key, expression, important) {
                    return rules[key] = expression.evaluate(context, variables, scope, stack);
                });
                return rules;
            };

            return ExpressionMap;

        })(ParentClass);
        return ExpressionMap;
    };

    module.exports = _create(require('./Ordered/PropertyMap'));

    ref = ['Attribute', 'Property', 'Rule'];
    for (i = 0, len = ref.length; i < len; i++) {
        _kind = ref[i];
        module.exports["Ordered" + _kind + "Expressions"] = _create(require("./Ordered/" + _kind + "Map"));
        module.exports["Unordered" + _kind + "Expressions"] = _create(require("./Unordered/" + _kind + "Map"));
    }

}).call(this);
//# sourceMappingURL=Expressions.js.map
