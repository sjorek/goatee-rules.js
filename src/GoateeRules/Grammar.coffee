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
{Utility:{
  lib
}}            = require './Utility'

{Notator:{
  r,o,c
}}            = require lib + 'Notator'

yy            = require(lib + 'Scope').Scope
ScriptGrammar = require(lib + 'Grammar').Grammar

exports = module?.exports ? this

exports.Grammar = class Grammar extends ScriptGrammar

  # Actually this is not needed, but it looks nicer ;-)
  $1 = $2 = $3 = $4 = $5 = $6 = $7 = $8 = null

  create: (comment  = 'Goatee Rules Parser', \
           prefix   = '', \
           suffix   = 'parser.yy = require(
                         require("./Utility").Utility.lib + "Scope"
                       ).Scope;' ) ->
    super(comment, prefix, suffix)

  lex: do ->
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
      c ['rule'], /\!important\b/     , -> 'NONIMPORTANT'
      r ':'                           , -> @begin 'rule' ; ':'
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
        r 'End'                       , -> new yy.Expression 'scalar', [undefined]
        r 'RuleMap End'               , -> $1
        r 'Seperator RuleMap End'     , -> $2
      ]
      RuleMap: [
        o 'Map'
        o 'RuleMap Seperator Map'     , ->
          if $1.operator.name is 'block'
            $1.parameters.push $3
            $1
          else
            new yy.Expression 'block', [$1, $3]
      ]
      Map: [
        o 'KEY : Rule'                , ->
          new yy.Expression '=', [$1,
            if $3[0].operator.name is 'list'
              new yy.Expression 'group', [$3[0]]
            else
              $3[0]
          ]
      ]
      Rule: [
        o 'List'                      , -> [$1, off]
        o 'List NONIMPORTANT'         , -> [$1, on]
      ]

    for own k,v of ScriptGrammar::bnf when k isnt 'Script' and k isnt 'Statements'
      if k isnt 'Operation'
        grammar[k] = v
        continue

      ops = []
      for rule in v
        if rule[0] is '! Expression'
          ops.push o 'NONIMPORTANT', ->
            new yy.Expression '!' , [
              new yy.Expression 'reference', ['important']
            ]
        ops.push rule

      grammar[k] = ops

    grammar

##
# Initializes the **Parser** with our **Grammar**
#
# @param  {Grammar} grammar
# @param  {Scope}   scope
# @return {Parser}
Grammar.createParser = (grammar = new Grammar, scope = yy) ->
  ScriptGrammar.createParser grammar, scope
