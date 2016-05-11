###
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
###

###
# # Grammar …
# -----------
#
# … this time it's jison.coffee !
###
module.exports = (yy, notator) ->

  ### Use the script's jison-grammar ###
  grammar = (require 'goatee-script.js/lib/grammar/jison')(yy, notator)

  r = notator.resolve
  o = notator.operation
  c = notator.conditional

  ### Actually this is not needed, but it looks nicer ;-) ###
  $1 = $2 = $3 = $4 = $5 = $6 = $7 = $8 = null

  ###*
  # -------------
  # Use the default jison-lexer
  # @type {Object}
  # @property lex
  # @static
  ###
  grammar.lex = do ->

    ### Declare all rule-related lexer tokens … ###
    rules = [
      r ///
        (
          [_a-zA-Z]     |
          [-_][_a-zA-Z]
        )
        (
          -?\w
        )*
      ///                            , -> 'KEY'
      c ['rule'], /\s\!important\b/  , -> 'NONIMPORTANT'
      r ':'                          , -> @begin 'rule' ; ':'

    ].concat grammar.lex.rules.map (v, k) ->
      ### … and inherit the other lexer tokens from ScriptGrammar ###
      switch v[1]
        # '\s+', '/* … */'
        when 'return;'
          [['*']].concat v
        # ';', 'EOF'
        when 'return \';\';', 'return \'EOF\';'
          v[1] = 'this.popState();' + v[1]
          [['*']].concat v
        else [['rule']].concat v

    {
      startConditions :
        ### “rule” is implicit (1), not explicit (0) ###
        rule          : 1
      rules           : rules
    }

  ###*
  # -------------
  # The **Rules** is the top-level node in the syntax tree.
  # @type {String}
  # @property startSymbol
  # @static
  ###
  grammar.startSymbol = 'Rules'

  ###
  # # Syntax description …
  # ----------------------
  #
  # To build a grammar, a syntax is needed …
  #
  ###

  ###*
  # -------------
  # … which is inherited and notated here in Backus-Naur-Format.
  # @type {Object}
  # @property bnf
  # @static
  ###
  grammar.bnf = do ->

    bnf =

      ###
      Since we parse bottom-up, all parsing must end here.
      ###
      Rules: [
        # TODO use a precompiled “undefined” expression in Rules » End
        r 'End'                      , -> yy.goatee.create 'scalar', [undefined]
        r 'RuleMap End'              , -> $1
        r 'Seperator RuleMap End'    , -> $2
      ]
      RuleMap: [
        o 'Map'                      , -> yy.goatee.create 'rules', $1
        o 'RuleMap Seperator Map'    , -> yy.goatee.addRule $1, $3
      ]
      Map: [
        o 'KEY : Rule'               , -> [$1].concat $3
      ]
      Rule: [
        o 'List'                     , -> [$1, off]
        o 'List NONIMPORTANT'        , -> [$1, on]
      ]

    ###
    Inherit all but “Script” and “Statements” operations from script-grammar
    ###
    for own k,v of grammar.bnf when k isnt 'Script' and k isnt 'Statements'
      if k isnt 'Operation'
        bnf[k] = v
        continue

      ###
      Tweak “Operation” to include a hack to support “!important” as statement
      expression without interfering the final “!important” declaration
      ###
      ops = []
      for rule in v
        if rule[0] is '! Expression'
          ops.push o 'NONIMPORTANT', ->
            yy.goatee.create '!' , [
              yy.goatee.create 'reference', ['important']
            ]
        ops.push rule

      bnf[k] = ops

    bnf

  grammar
