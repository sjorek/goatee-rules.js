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
