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
 * # Rules …
 * -------------
 * … provide a lightweight version of CSSOM.CSSStyleRule.
 *
 */


/**
 *  -------------
 * @class Rules
 * @namespace GoateeRules
 */

(function() {
    var Rules;

    Rules = (function() {

        /**
         *  -------------
         * NON-STANDARD
         * lightweight version of CSSOM.CSSStyleRule.parse
         * @see implementation below
         */
        function Rules() {}

        Rules.parse = (function() {
            var _CHAR_asterisk, _CHAR_backslash, _CHAR_colon, _CHAR_cr, _CHAR_doublequote, _CHAR_exclamation, _CHAR_ff, _CHAR_lf, _CHAR_semicolon, _CHAR_singlequote, _CHAR_slash, _CHAR_space, _CHAR_tab, _CHAR_vtab, _REGEXP_isEscaped, _STRING_closecomment, _STRING_empty, _STRING_nonimportant, _STRING_opencomment, _error, _errors;
            _CHAR_space = ' ';
            _CHAR_tab = '\t';
            _CHAR_vtab = '\v';
            _CHAR_cr = '\r';
            _CHAR_lf = '\n';
            _CHAR_ff = '\f';
            _CHAR_doublequote = '"';
            _CHAR_singlequote = "'";
            _CHAR_slash = '/';
            _CHAR_backslash = '\\';
            _CHAR_colon = ':';
            _CHAR_semicolon = ';';
            _CHAR_exclamation = '!';
            _CHAR_asterisk = '*';
            _STRING_empty = '';
            _STRING_opencomment = '/*';
            _STRING_closecomment = '*/';
            _STRING_nonimportant = '!important';
            _REGEXP_isEscaped = /[^\\](\\\\)*$/;

            /**
             *  -------------
             * Internal list of error messages, used by Expressions.parse
             * @type {Array}
             */
            _errors = ['Unexpected content after important declaration', 'Missing closing string', 'Missing closing comment', 'Unexpected string opener', 'Missing identifier key', 'Important already declared'];

            /**
             *  -------------
             * Internal error message function
             * @function _error
             * @param  {Number} num
             * @param  {String} rules
             * @param  {Number} i
             * @return {String}
             * @private
             */
            _error = function(num, rules, i) {
                return _errors[num - 1] + ":\n“" + (rules.slice(0, i)) + "»»»" + (rules.charAt(i)) + "«««" + (rules.slice(i + 1)) + "”";
            };

            /**
             *  -------------
             * NON-STANDARD
             * lightweight version of CSSOM.CSSStyleRule.parse
             *
             * @method parse
             * @param  {String} rules
             * @param  {AttributeMap|PropertyMap|RuleMap} [_map] Optional instance to
             *                                                   merge rules into.
             * @return {AttributeMap|PropertyMap|RuleMap}        The filled **_map**
             * @static
             */
            return function(rules, _map) {
                var buffer, char, i, important, index, j, key, state, stateKey, stateValue, value;
                if (_map == null) {
                    _map = new(require('./Unordered/RuleMap'));
                }
                i = 0;
                j = i;
                stateKey = 'key';
                stateValue = 'value';
                state = stateKey;
                buffer = '';
                char = '';
                key = '';
                value = '';
                important = false;
                for (char = '';
                    (char = rules.charAt(i)) !== ''; i++) {;
                    switch (char) {
                        case _CHAR_space:
                        case _CHAR_tab:
                        case _CHAR_vtab:
                        case _CHAR_cr:
                        case _CHAR_lf:
                        case _CHAR_ff:
                            if (state === stateValue && !important) {
                                buffer += char;
                            }
                            continue;
                            break;
                        case _CHAR_singlequote:
                        case _CHAR_doublequote:
                            if (important) {
                                throw _error(1, rules, i);
                            } else if (state === stateValue) {
                                j = i + 1;
                                while (index = rules.indexOf(char, j) + 1) {
                                    if (rules.charAt(index - 2) !== _CHAR_backslash || _REGEXP_isEscaped.test(rules.slice(i, index - 1))) {
                                        break;
                                    }
                                    j = index;
                                }
                                if (index === 0) {
                                    throw _error(2, rules, i);
                                }
                                buffer += rules.slice(i, index);
                                i = index - 1;
                                continue;
                            } else {
                                throw _error(4, rules, i);
                            }
                            break;
                        case _CHAR_slash:
                            if (rules.charAt(i + 1) === _CHAR_asterisk) {
                                i += 2;
                                index = rules.indexOf(_STRING_closecomment, i);
                                if (index === -1) {
                                    throw _error(3, rules, i);
                                }
                                i = index + 1;
                                continue;
                            } else if (important) {
                                throw _error(1, rules, i);
                            } else {
                                buffer += char;
                                continue;
                            }
                            break;
                        case _CHAR_colon:
                            if (state === stateKey) {
                                key += buffer;
                                if (key === _STRING_empty) {
                                    throw _error(5, rules, i);
                                }
                                buffer = '';
                                state = stateValue;
                                continue;
                            } else if (important) {
                                throw _error(1, rules, i);
                            } else {
                                buffer += char;
                                continue;
                            }
                            break;
                        case _CHAR_exclamation:
                            if (state === stateValue && rules.indexOf(_STRING_nonimportant, i) === i) {
                                if (important) {
                                    throw _error(6, rules, i);
                                }
                                important = true;
                                i += 9;
                                continue;
                            } else if (important) {
                                throw _error(1, rules, i);
                            } else {
                                buffer += char;
                                continue;
                            }
                            break;
                        case _CHAR_semicolon:
                            if (state === stateKey) {
                                continue;
                            }
                            if (state === stateValue) {
                                value += buffer;
                                _map.add(key, value, important);
                                important = false;
                                key = '';
                                value = '';
                                buffer = '';
                                state = stateKey;
                                continue;
                            } else if (important) {
                                throw _error(1, rules, i);
                            } else {
                                buffer += char;
                                continue;
                            }
                            break;
                        default:
                            if (important) {
                                throw _error(1, rules, i);
                            }
                            buffer += char;
                            continue;
                            break;
                    }
                };
                if (state === stateValue) {
                    _map.add(key, value + buffer, important);
                }
                return _map;
            };
        })();

        return Rules;

    })();

    module.exports = Rules;

}).call(this);
//# sourceMappingURL=Rules.js.map
