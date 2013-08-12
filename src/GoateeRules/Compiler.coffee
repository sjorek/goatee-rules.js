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
  parse,
  lib
}}              = require './Utility'
ScriptCompiler  = require(lib + 'Compiler').Compiler

exports = module?.exports ? this

##
# @class
# @namespace GoateeRules
exports.Compiler = class Compiler

  ##
  # @param  {Array|String|Object} code, a String, opcode-Array or Object with
  #                               toString method
  # @return Expression
  Compiler.parse = (code, _impl = parse) ->
    ScriptCompiler.parse(code, _impl)

  ##
  # @param  {Array|String|Object} code, a String, opcode-Array or Object with
  #                               toString method
  # @param  {Object}              context
  # @return mixed
  Compiler.evaluate = (code, context, _impl = parse) ->
    ScriptCompiler.evaluate(code, context, _impl)

  ##
  # @param  {Array|String|Object} code, a String, opcode-Array or Object with
  #                               toString method
  # @return {String}
  Compiler.render = (code, _impl = parse) ->
    ScriptCompiler.render(code, _impl)

  ##
  # @param  {String|Expression} code, a String or an Expression
  # @param  {Function}          callback (optional)
  # @param  {Boolean}           compress, default is on
  # @return {Array|String|Number|true|false|null}
  Compiler.ast = (data, callback, compress = on, _impl = parse) ->
    ScriptCompiler.ast(data, callback, compress, _impl)

  ##
  # @param  {String|Expression} data
  # @param  {Function}          callback (optional)
  # @param  {Boolean}           compress, default is on
  # @return {String}
  Compiler.stringify = (data, callback, compress = on, _impl = parse) ->
    ScriptCompiler.stringify(data, callback, compress, _impl)

  ##
  # @param  {String|Expression} data
  # @param  {Function}          callback (optional)
  # @param  {Boolean}           compress, default is on
  # @return Function
  Compiler.closure = (data, callback, compress = on, prefix, _impl = parse) ->
    ScriptCompiler.closure(data, callback, compress, prefix, _impl)

  ##
  # @param  {String|Array} data, code-String or opcode-Array
  # @param  {Function}     callback (optional)
  # @param  {Boolean}      compress, default = true
  # @return String
  Compiler.compile = (data, callback, compress = on, _impl = parse) ->
    ScriptCompiler.compile(data, callback, compress, _impl)

  for own k,v of ScriptCompiler when not Compiler[k]?
    Compiler[k] = v
