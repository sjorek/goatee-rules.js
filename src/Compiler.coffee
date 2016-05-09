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

# External dependencies.
{
  isRuleMap,
  parse
}              = require './Utility'

{
  isString,
  isArray
}              = require 'goatee-script.js/lib/Utility'

ScriptCompiler = require 'goatee-script.js/lib/Compiler'

Expressions    = require './Expressions'

###
# Compiling …
# -----------
#
# … the goatee-rules.
###

###*
# -------------
# @class Compiler
# @namespace GoateeRules
###
class Compiler extends ScriptCompiler

  ###*
  # -------------
  # @param  {Function}  [parseImpl=GoateeRules.Utility.parse]
  # @constructor
  ###
  constructor: (parseImpl = parse) ->
    super(parseImpl)

  ###*
  # -------------
  # @method parse
  # @param  {Array|String|Object} code, a String, opcode-Array or Object with
  #                               toString method
  # @return {Expression}
  ###
  parse: (code) ->
    return @parseImpl(code.toString()) if not isArray code
    map = new Expressions
    for rule in code
      [key, value, important]  = rule
      map.add(key, @toExpression(value), important)
    map

  ###*
  # -------------
  # @method evaluate
  # @param  {Array|String|Object} code, a String, opcode-Array or Object with
  #                               toString method
  # @param  {Object}              context (optional)
  # @param  {Object}              variables (optional)
  # @param  {Array}               scope (optional)
  # @param  {Array}               stack (optional)
  # @return {mixed}
  ###
  evaluate: (code, context={}, variables={}, scope, stack) ->
    map = @parse(code)
    map.each (key, value, important) ->
      map.rules[key] = value.evaluate(context, variables, scope, stack)
      return

  ###*
  # -------------
  # @method ast
  # @param  {Array|String|Object} code, a String, opcode-Array or Object with
  #                               toString method
  # @param  {Function}            callback (optional)
  # @param  {Boolean}             [compress=true]
  # @return {Array}
  ###
  ast: (data, callback, compress = on) ->
    rules = if isRuleMap data then data else @parse(data)
    self  = this
    save  = @save
    comp  = @compress
    tree  = []
    rules.map (key, value, important) ->
      ast = save.call(self, value, callback, compress)
      tree.push [
        key
        if compress then comp.call(self, ast) else ast
        important
      ]
      return
    tree

  ###*
  # -------------
  # @method stringyfy
  # @param  {Array|String|Object} code, a String, opcode-Array or Object with
  #                               toString method
  # @param  {Function}            callback (optional)
  # @param  {Boolean}             [compress=true]
  # @return {String}
  ###
  stringify: (data, callback, compress = on) ->
    opcode = @ast(data, callback, compress)
    if compress
      for rule, index in opcode
        [key, value, important]  = rule
        key       = JSON.stringify key
        value     = "[#{value[0]},#{JSON.stringify value[1]}]"
        important = JSON.stringify important
        opcode[index] = "[#{key},#{value},#{important}]"
      "[#{opcode.join '],['}]"
    else
      JSON.stringify opcode

  ###*
  # -------------
  # @method load
  # @param  {String|Array} data            opcode-String or -Array
  # @param  {Boolean}      [compress=true]
  # @return {String}
  ###
  load: (data, compress = on) ->
    opcode = if isArray data then data else @expand(data)
    code   = []
    for rule in opcode
      [key, value, important] = rule
      important = if important then ' !important' else ''
      code.push "#{key}:#{super(value, compress)}#{important}"
    code.join ';'

module.exports = Compiler
