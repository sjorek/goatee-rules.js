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
