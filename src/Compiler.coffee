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
  isRuleMap,
  parse
}}              = require './Utility'

{Utility:{
  isString,
  isArray
}}              = require 'goatee-script/lib/Utility'

ScriptCompiler  = require('goatee-script/lib/Compiler').Compiler

{Expressions}   = require './Expressions'

exports = module?.exports ? this

##
# @class
# @namespace GoateeRules
exports.Compiler = class Compiler extends ScriptCompiler

  ##
  # @param  {Function}  parseImpl
  # @constructor
  constructor: (parseImpl = parse) ->
    super(parseImpl)

  ##
  # @param  {Array|String|Object} code, a String, opcode-Array or Object with
  #                               toString method
  # @return {Expression}
  parse: (code) ->
    return @parseImpl(code.toString()) if not isArray code
    map = new Expressions
    for rule in code
      [key, value, important]  = rule
      map.add(key, @toExpression(value), important)
    map

  ##
  # @param  {Array|String|Object} code, a String, opcode-Array or Object with
  #                               toString method
  # @param  {Object}              context (optional)
  # @param  {Object}              variables (optional)
  # @param  {Array}               scope (optional)
  # @param  {Array}               stack (optional)
  # @return {mixed}
  evaluate: (code, context={}, variables={}, scope, stack) ->
    map = @parse(code)
    map.each (key, value, important) ->
      map.rules[key] = value.evaluate(context, variables, scope, stack)
      return

#  ##
#  # @param  {Array|String|Object} code, a String, opcode-Array or Object with
#  #                               toString method
#  # @return {String}
#  render: (code) ->
#    super(code)

  ##
  # @param  {String|Expression} code, a String or an Expression
  # @param  {Function}          callback (optional)
  # @param  {Boolean}           compress, default is on
  # @return {Array}
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

  ##
  # @param  {String|Expression} data
  # @param  {Function}          callback (optional)
  # @param  {Boolean}           compress, default is on
  # @return {String}
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

#  ##
#  # @param  {String|Expression} data
#  # @param  {Function}          callback (optional)
#  # @param  {Boolean}           compress, default is on
#  # @return {Function}
#  closure: (data, callback, compress = on, prefix) ->
#    super(data, callback, compress, prefix)

  ##
  # @param  {String|Array} data, opcode-String or -Array
  # @param  {Boolean}      compress, default = true
  # @return {String}
  load: (data, compress = on) ->
    opcode = if isArray data then data else @expand(data)
    code   = []
    for rule in opcode
      [key, value, important] = rule
      important = if important then ' !important' else ''
      code.push "#{key}:#{super(value, compress)}#{important}"
    code.join ';'

#  ##
#  # @param  {Array|String|Object} code, a String, opcode-Array or Object with
#  #                               toString method
#  # @param  {Function}            callback (optional)
#  # @param  {Boolean}             compress, default = true
#  # @return {String}
#  compile: (data, callback, compress = on) ->
#    opcode = if isArray data then data else @ast(data, callback, false)
#    @load(opcode, compress)
