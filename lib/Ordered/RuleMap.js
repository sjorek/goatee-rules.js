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
