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
    var Expressions, Scope, ScriptScope,
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

    ScriptScope = require('goatee-script.js/lib/Scope');

    Expressions = require('./Expressions');


    /*
     * # Scope
     * -------
     *
     */


    /**
     *  -------------
     * @class Scope
     * @namespace GoateeRules
     */

    Scope = (function(superClass) {
        extend(Scope, superClass);

        function Scope() {
            return Scope.__super__.constructor.apply(this, arguments);
        }


        /**
         * -------------
         * Create a new **Expression** or **Expressions** instance
         *
         * @method create
         * @param  {String}      operator
         * @param  {Array}       parameters
         * @return {Expressions|Expression}
         */

        Scope.prototype.create = function(operator, parameters) {
            if (operator === 'rules') {
                return this.addRule(new Expressions, parameters);
            }
            return Scope.__super__.create.call(this, operator, parameters);
        };


        /**
         *  -------------
         * Add a Expression to the given ExpressionMap **rule**
         *
         * @method addRule
         * @param {ExpressionMap} rule
         * @param {Array}         parameters
         */

        Scope.prototype.addRule = function(rule, parameters) {
            var expression, important, key;
            key = parameters[0], expression = parameters[1], important = parameters[2];
            if (expression.operator.name === 'list') {
                expression = this.create('group', [expression]);
            }
            return rule.add(key, expression, important);
        };

        return Scope;

    })(ScriptScope);

    module.exports = Scope;

}).call(this);
//# sourceMappingURL=Scope.js.map
