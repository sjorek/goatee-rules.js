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
