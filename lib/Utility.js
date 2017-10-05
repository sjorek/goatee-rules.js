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
 * # Utilities
 * -------------
 *
 */


/**
 * -------------
 * @class Utility
 * @namespace GoateeRules
 */

(function() {
    var Utility;

    Utility = (function() {

        /**
         * -------------
         * @method isRuleMap
         * @param {mixed} obj
         * @return {Boolean}
         * @static
         */
        function Utility() {}

        Utility.isRuleMap = function(obj) {
            return (obj != null) && (obj.rules != null) && (obj.priority != null);
        };


        /**
         * -------------
         * @method parseScript
         * @alias  parse
         * @param  {String}     code
         * @return {Expression}
         * @static
         */

        Utility.parse = Utility.parseScript = (function() {
            var cache, parser;
            parser = null;
            cache = {};
            return function(code) {
                var expression;
                if (cache.hasOwnProperty(code)) {
                    return cache[code];
                }
                if (parser == null) {
                    parser = require('./Parser');
                }
                expression = parser.parse(code);
                return cache[code] = cache['' + expression] = expression;
            };
        })();


        /**
         * -------------
         * NON-STANDARD
         * caching lightweight version of CSSOM.CSSStyleRule.parse
         *
         * @method parseRules
         * @param  {String}       code
         * @return {Expressions}
         * @static
         */

        Utility.parseRules = (function() {
            var cache, parser;
            parser = null;
            cache = {};
            return function(code) {
                var rules;
                if (cache.hasOwnProperty(code)) {
                    return cache[code];
                }
                if (parser == null) {
                    parser = require('./Rules');
                }
                rules = parser.parse(code);
                return cache[code] = cache['' + rules] = rules;
            };
        })();


        /**
         * -------------
         * Trim whitespace from begin and end of string.
         * @method trim
         * @param  {String}  string  Input string.
         * @return {String}  Trimmed string.
         * @static
         */

        Utility.trim = String.prototype.trim != null ? function(string) {
            return string.trim();
        } : (function() {
            var _REGEXP_trim;
            _REGEXP_trim = /^\s+|\s+$/g;
            return function(string) {
                return string.replace(_REGEXP_trim, '');
            };
        })();


        /**
         * -------------
         * Converts “a-property-name” to “aPropertyName”
         *
         * @method camelize
         * @param  {String}  string  Input string.
         * @return {String}  a camelized string.
         * @static
         */

        Utility.camelize = (function() {
            var _REGEXP_camelize, _camelize;
            _REGEXP_camelize = /-([a-z0-9])/gi;
            _camelize = function(match, char, index, str) {
                return char.toUpperCase();
            };
            return function(string) {
                return string.replace(_REGEXP_camelize, _camelize);
            };
        })();


        /**
         * -------------
         * Converts “aPropertyName” to “a-property-name”
         *
         * @method dashify
         * @param  {String}  string  Input string.
         * @return {String}  Dashed string.
         * @static
         */

        Utility.dashify = (function() {
            var _CHAR_dash, _REGEXP_dashify, _dashify;
            _CHAR_dash = '-';
            _REGEXP_dashify = /(^|[a-z0-9])([A-Z])/g;
            _dashify = function(match, char, camel, index, str) {
                return char.toLowerCase() + _CHAR_dash + camel.toLowerCase();
            };
            return function(string) {
                return string.replace(_REGEXP_dashify, _dashify);
            };
        })();

        return Utility;

    })();

    module.exports = Utility;

}).call(this);
//# sourceMappingURL=Utility.js.map
