
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
 * # Grammar …
 * -----------
 *
 * … this time it's jison.coffee !
 */

(function() {
  var hasProp = {}.hasOwnProperty;

  module.exports = function(yy, notator) {

    /* Use the script's jison-grammar */
    var $1, $2, $3, $4, $5, $6, $7, $8, c, grammar, o, r;
    grammar = (require('goatee-script.js/lib/grammar/jison'))(yy, notator);
    r = notator.resolve;
    o = notator.operation;
    c = notator.conditional;

    /* Actually this is not needed, but it looks nicer ;-) */
    $1 = $2 = $3 = $4 = $5 = $6 = $7 = $8 = null;

    /**
     * -------------
     * Use the default jison-lexer
     * @type {Object}
     * @property lex
     * @static
     */
    grammar.lex = (function() {

      /* Declare all rule-related lexer tokens … */
      var rules;
      rules = [
        r(/([_a-zA-Z]|[-_][_a-zA-Z])(-?\w)*/, function() {
          return 'KEY';
        }), c(['rule'], /\s\!important\b/, function() {
          return 'NONIMPORTANT';
        }), r(':', function() {
          this.begin('rule');
          return ':';
        })
      ].concat(grammar.lex.rules.map(function(v, k) {

        /* … and inherit the other lexer tokens from ScriptGrammar */
        switch (v[1]) {
          case 'return;':
            return [['*']].concat(v);
          case 'return \';\';':
          case 'return \'EOF\';':
            v[1] = 'this.popState();' + v[1];
            return [['*']].concat(v);
          default:
            return [['rule']].concat(v);
        }
      }));
      return {
        startConditions: {

          /* “rule” is implicit (1), not explicit (0) */
          rule: 1
        },
        rules: rules
      };
    })();

    /**
     * -------------
     * The **Rules** is the top-level node in the syntax tree.
     * @type {String}
     * @property startSymbol
     * @static
     */
    grammar.startSymbol = 'Rules';

    /*
     * # Syntax description …
     * ----------------------
     *
     * To build a grammar, a syntax is needed …
     *
     */

    /**
     * -------------
     * … which is inherited and notated here in Backus-Naur-Format.
     * @type {Object}
     * @property bnf
     * @static
     */
    grammar.bnf = (function() {
      var bnf, i, k, len, ops, ref, rule, v;
      bnf = {

        /*
        Since we parse bottom-up, all parsing must end here.
         */
        Rules: [
          r('End', function() {
            return yy.goatee.create('scalar', [void 0]);
          }), r('RuleMap End', function() {
            return $1;
          }), r('Seperator RuleMap End', function() {
            return $2;
          })
        ],
        RuleMap: [
          o('Map', function() {
            return yy.goatee.create('rules', $1);
          }), o('RuleMap Seperator Map', function() {
            return yy.goatee.addRule($1, $3);
          })
        ],
        Map: [
          o('KEY : Rule', function() {
            return [$1].concat($3);
          })
        ],
        Rule: [
          o('List', function() {
            return [$1, false];
          }), o('List NONIMPORTANT', function() {
            return [$1, true];
          })
        ]
      };

      /*
      Inherit all but “Script” and “Statements” operations from script-grammar
       */
      ref = grammar.bnf;
      for (k in ref) {
        if (!hasProp.call(ref, k)) continue;
        v = ref[k];
        if (!(k !== 'Script' && k !== 'Statements')) {
          continue;
        }
        if (k !== 'Operation') {
          bnf[k] = v;
          continue;
        }

        /*
        Tweak “Operation” to include a hack to support “!important” as statement
        expression without interfering the final “!important” declaration
         */
        ops = [];
        for (i = 0, len = v.length; i < len; i++) {
          rule = v[i];
          if (rule[0] === '! Expression') {
            ops.push(o('NONIMPORTANT', function() {
              return yy.goatee.create('!', [yy.goatee.create('reference', ['important'])]);
            }));
          }
          ops.push(rule);
        }
        bnf[k] = ops;
      }
      return bnf;
    })();
    return grammar;
  };

}).call(this);

//# sourceMappingURL=jison.js.map
