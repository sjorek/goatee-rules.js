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
ScriptGrammar = require 'goatee-script.js/lib/Grammar'
Notator       = require 'goatee-script.js/lib/Notator'
{
  isString,
  isFunction
}             = require 'goatee-script.js/lib/Utility'
Scope         = require './Scope'

class Grammar extends ScriptGrammar

  ###*
  # -------------
  # Loads the our **Grammar**
  #
  # @method load
  # @param  {String} [filename]
  # @return {Parser}
  # @static
  ###
  Grammar.load = (filename = './grammar/jison.coffee',
                  scope = {},
                  notator = Notator)->

    scope.goatee = new Scope() unless scope.goatee?

    grammar = require filename
    #console.log 'load', grammar, 'from', filename
    grammar = grammar(scope, notator) if isFunction grammar
    grammar.yy.goatee = scope.goatee
    grammar

  ###*
  # -------------
  # Initializes our **Grammar**
  #
  # @method create
  # @param  {String|Object} grammar filepath or object
  # @return {Grammar}
  # @static
  ###
  Grammar.create = (grammar = null, scope = {}, notator = Notator)->
    if grammar is null or isString grammar
      grammar = Grammar.load(grammar, scope, notator)
    #console.log 'create', grammar
    grammar = new Grammar grammar

  ###*
  # -------------
  # Create and return the parsers source code wrapped into a closure, still
  # keeping the value of `this`.
  #
  # @method generateParser
  # @param  {Function} [generator]
  # @param  {String} [comment]
  # @param  {String} [prefix]
  # @param  {String} [suffix]
  # @return {String}
  # @static
  ###
  Grammar.generateParser = (parser = null,
                            comment = '''
                                      /* Goatee Rules Parser */

                                      ''',
                            prefix  = null,
                            suffix  = null) ->

    if parser is null or isString parser
      parser = Grammar.createParser parser
    ScriptGrammar.generateParser parser, comment, prefix, suffix

  ###*
  # -------------
  # Initializes the **Parser** with our **Grammar**
  #
  # @method createParser
  # @param  {Grammar} [grammar]
  # @param  {Function|Boolean} [log]
  # @return {Parser}
  # @static
  ###
  Grammar.createParser = (grammar = null, log = null) ->
    if grammar is null or isString grammar
      grammar = Grammar.create grammar
    ScriptGrammar.createParser(grammar, log)


  ###*
  # -------------
  # Use the default jison-lexer
  #
  # @constructor
  ###
  constructor: (@grammar) ->
    super(@grammar)

module.exports = Grammar
