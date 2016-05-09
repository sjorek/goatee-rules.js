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
    var RuleMap, parse, trim,
        hasProp = {}.hasOwnProperty;

    parse = require('../Rules').parse;

    trim = require('../Utility').trim;


    /*
     * # RuleMaps …
     * -----------------
     *
     * … look like “identifier: expression; identifier2: expression2”. They
     * provide a simplified implementation of:
     * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Style-20001113/css.html#CSS-ElementCSSInlineStyle
     * @see http://www.w3.org/TR/1998/REC-html40-19980424/present/styles.html#h-14.2.2
     */


    /**
     * -------------
     * @class RuleMap
     * @namespace GoateeRules.Unordered
     */

    RuleMap = (function() {

        /**
         * -------------
         * @param {Object} [rules]
         * @param {Object} [priority]
         * @constructor
         */
        function RuleMap(rules1, priority1) {
            this.rules = rules1 != null ? rules1 : {};
            this.priority = priority1 != null ? priority1 : {};
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
            return this;
        };


        /**
         * -------------
         * Call fn for each rule's key, value and priority and return this.
         *
         * @method map
         * @param  {Function} fn
         * @return {Array}
         */

        RuleMap.prototype.each = function(fn) {
            this.map(fn);
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
            var key, ref, results, value;
            ref = this.rules;
            results = [];
            for (key in ref) {
                if (!hasProp.call(ref, key)) continue;
                value = ref[key];
                results.push(fn(key, value, this.priority.hasOwnProperty(key)));
            }
            return results;
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

        RuleMap.prototype.apply = function(string) {
            return parse(string, this);
        };


        /**
         * -------------
         * Opposite of @project(map). Returns this map with all rules from given map
         * applied to this map, taking my and their priorities into consideration.
         *
         * @method inject
         * @param  {RuleMap} map
         * @return {RuleMap}
         */

        RuleMap.prototype.inject = function(map) {
            map.project(this);
            return this;
        };


        /**
         * -------------
         * Opposite of @inject(map). Returns the given map with all my rules applied
         * to given map, taking their and my priorities into consideration.
         *
         * @method inject
         * @param  {RuleMap} map
         * @return {RuleMap}
         */

        RuleMap.prototype.project = function(map) {
            this.each(function(key, value, priority) {
                return map.add(key, value, priority);
            });
            return this;
        };


        /**
         * -------------
         * @method normalizeKey
         * @param  {String} string
         * @return {String}
         */

        RuleMap.prototype.normalizeKey = function(string) {
            return trim(string);
        };


        /**
         * -------------
         * @method normalizeValue
         * @param  {String} string
         * @return {String}
         */

        RuleMap.prototype.normalizeValue = function(string) {
            return trim(string);
        };


        /**
         * -------------
         * Return each rule's key, value and priority as Array of Arrays.
         *
         * @method flatten
         * @param  {Function} fn
         * @return {Array}
         */

        RuleMap.prototype.flatten = function(fn) {
            return this.map(function(key, value, priority) {
                return [key, value, priority];
            });
        };


        /**
         * -------------
         * Return a css-like representation of this maps' rules. It looks, like:
         *
         *     identifier: value; key: expression=1+1; action: expr( … ; … );
         *
         * @method toString
         * @return {String}
         */

        RuleMap.prototype.toString = function() {
            var rules;
            rules = this.map(function(key, value, priority) {
                var rule;
                rule = key + ":" + value;
                if (priority === true) {
                    rule += " !important";
                }
                return rule;
            });
            return rules.join(';');
        };

        return RuleMap;

    })();

    module.exports = RuleMap;

}).call(this);
//# sourceMappingURL=RuleMap.js.map
