### ^
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
