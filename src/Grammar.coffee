###
© Copyright 2013 Stephan Jorek <stephan.jorek@gmail.com>

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
implied. See the License for the specific language governing
permissions and limitations under the License.
###

{Notator:{
  r,o,c
}}            = require 'goatee-script/lib/Notator'

ScriptGrammar = require('goatee-script/lib/Grammar').Grammar

{Scope}       = require './Scope'

exports = module?.exports ? this

exports.Grammar = class Grammar extends ScriptGrammar

  # Actually this is not needed, but it looks nicer ;-)
  $1 = $2 = $3 = $4 = $5 = $6 = $7 = $8 = null

  yy = new Scope

  ##
  # Initializes the **Parser** with our **Grammar**
  #
  # @param  {Grammar} grammar
  # @param  {Scope}   scope
  # @return {Parser}
  Grammar.createParser = (grammar = new Grammar, scope = yy) ->
    ScriptGrammar.createParser grammar, scope

  ##
  # Create and return the parsers source code wrapped into a closure, still
  # keeping the value of `this`.
  #
  # @return {String}
  create: (comment  = 'Goatee Rules Parser', prefix   = '', \
           suffix   = 'parser.yy = new (require("./Scope").Scope);') ->
    super(comment, prefix, suffix)

  # Use the default jison-lexer
  lex: do ->

    # Declare all lexer tokens
    rules = [
      r ///
        (
          [_a-zA-Z]     |
          [-_][_a-zA-Z]
        )
        (
          -?\w
        )*
      ///                             , -> 'KEY'
      c ['rule'], /\s\!important\b/   , -> 'NONIMPORTANT'
      r ':'                           , -> @begin 'rule' ; ':'

    # Inherit lexer tokens from ScriptGrammar
    ].concat ScriptGrammar::lex.rules.map (v, k) ->
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
        # “rule” is implicit (1), not explicit (0)
        rule          : 1
      rules           : rules
    }

  # The **Rules** is the top-level node in the syntax tree.
  startSymbol : 'Rules'

  ##
  # The syntax description notated in Backus-Naur-Format
  # ----------------------------------------------------
  bnf: do ->

    grammar =

      # Since we parse bottom-up, all parsing must end here.
      Rules: [
        r 'End'                       , -> yy.create 'scalar', [undefined]
        r 'RuleMap End'               , -> $1
        r 'Seperator RuleMap End'     , -> $2
      ]
      RuleMap: [
        o 'Map'                       , -> yy.create 'rules', $1
        o 'RuleMap Seperator Map'     , -> yy.addRule $1, $3
      ]
      Map: [
        o 'KEY : Rule'                , -> [$1].concat $3
      ]
      Rule: [
        o 'List'                      , -> [$1, off]
        o 'List NONIMPORTANT'         , -> [$1, on]
      ]

    # Inherit all but “Script” and “Statement” operations from ScriptGrammar
    for own k,v of ScriptGrammar::bnf when k isnt 'Script' and k isnt 'Statements'
      if k isnt 'Operation'
        grammar[k] = v
        continue

      # Tweak “Operation” to include a hack to support “!important” as statement
      # expression without interfering the final “!important” declaration
      ops = []
      for rule in v
        if rule[0] is '! Expression'
          ops.push o 'NONIMPORTANT', ->
            yy.create '!' , [
              yy.create 'reference', ['important']
            ]
        ops.push rule

      grammar[k] = ops

    grammar
