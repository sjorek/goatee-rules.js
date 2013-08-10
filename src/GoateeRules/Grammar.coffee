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

yy            = require('GoateeScript/Scope').Scope
ScriptGrammar = require('GoateeScript/Grammar').Grammar

exports = module?.exports ? this

exports.Grammar = class Grammar extends ScriptGrammar

  {
    r,o # ,aop,bop
  } = ScriptGrammar

  comment: 'Goatee Rules Parser'

  ##
  # The syntax description
  # ----------------------

  startSymbol : 'Rules'

  bnf: do ->

    grammar =

      # The **Rules** is the top-level node in the syntax tree.
      # Since we parse bottom-up, all parsing must end here.
      Rules: [
        r 'End'                       , -> new yy.Expression 'scalar', [undefined]
        r 'Map End'                 , -> $1
        r 'Seperator Map End'       , -> $2
      ]
      Map: [
        o 'Rule'
        o 'Map Seperator Rule'          , ->
          if $1.operator.name is 'block'
            $1.parameters.push $3
            $1
          else
            new yy.Expression 'block', [$1, $3]
      ]
      Rule: [
        o 'REFERENCE : List'              , ->
          new yy.Expression '=', [$1,
            if $3.operator.name is 'list'
              new yy.Expression 'group', [$3]
            else
              $3
          ]
      ]

    for k,v in ScriptGrammar::bnf when k isnt 'Script' and k isnt 'Statements'
      grammar[k] = v

    grammar

# Initialize the **Parser** with our **Grammar**
Grammar.createParser = (grammar = new Grammar, scope = yy) ->
  ScriptGrammar.createParser grammar, scope
