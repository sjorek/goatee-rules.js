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
    var RuleMap, UnorderedRuleMap,
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

    UnorderedRuleMap = require('../Unordered/RuleMap');


    /*
     * # RuleMaps …
     * -----------------
     *
     * … look like “identifier: expression; identifier2: expression2”.
     * They provide a simplified implementation of RuleMap keeping the
     * initial order of all rules added.
     */


    /**
     * -------------
     * @class RuleMap
     * @namespace GoateeRules.Ordered
     */

    RuleMap = (function(superClass) {
        extend(RuleMap, superClass);


        /**
         * -------------
         * @param {Array}  [sequence]
         * @param {Object} rules
         * @param {Object} priority
         * @constructor
         */

        function RuleMap(sequence, rules, priority) {
            this.sequence = sequence != null ? sequence : [];
            this.rules = rules;
            this.priority = priority;
            RuleMap.__super__.constructor.call(this, this.rules, this.priority);
        }


        /**
         * -------------
         * adds a new rule to this instance
         *
         * @method add
         * @param  {String}  key
         * @param  {mixed}   value
         * @param  {Boolean} important
         * @return {RuleMap}
         */

        RuleMap.prototype.add = function(key, value, important) {
            var exists, id;
            id = this.normalizeKey(key);
            exists = this.rules.hasOwnProperty(id);
            if (!(important === true || exists === false || this.priority.hasOwnProperty(id) === false)) {
                return this;
            }
            this.rules[id] = this.normalizeValue(value);
            if (important === true) {
                this.priority[id] = true;
            }
            if (exists === false) {
                this.sequence.push(id);
            }
            return this;
        };


        /**
         * -------------
         * Call fn for each rule's key, value and priority and return the resulting
         * Array.
         *
         * @method map
         * @param  {Function} fn
         * @return {Array}
         */

        RuleMap.prototype.map = function(fn) {
            var i, key, len, ref, results;
            ref = this.sequence;
            results = [];
            for (i = 0, len = ref.length; i < len; i++) {
                key = ref[i];
                results.push(fn(key, this.rules[key], this.priority.hasOwnProperty(key)));
            }
            return results;
        };

        return RuleMap;

    })(UnorderedRuleMap);

    module.exports = RuleMap;

}).call(this);
//# sourceMappingURL=RuleMap.js.map
