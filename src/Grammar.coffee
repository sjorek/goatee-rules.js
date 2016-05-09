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

ScriptGrammar = require 'goatee-script.js/lib/Grammar'
Notator       = require 'goatee-script.js/lib/Notator'
{
  isString,
  isFunction
}             = require 'goatee-script.js/lib//Utility'
Scope         = require './Scope'

class Grammar extends ScriptGrammar

  ###*
  # -------------
  # Loads the our **Grammar**
  #
  # @method loadGrammar
  # @param  {String} [filename]
  # @return {Parser}
  # @static
  ###
  Grammar.load = (filename = './grammar/jison.coffee',
                  scope = {},
                  notator = Notator)->

    scope.goatee = new Scope() unless scope.goatee?

    grammar = require filename
    # console.log 'load', grammar
    # ext = path.extname(filename)
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
    # console.log 'create', grammar
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
