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
