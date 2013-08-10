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
# @namespace GoateeScript
exports.Compiler = class Compiler

  for own k,v of ScriptCompiler when k isnt 'parse'
    Compiler[k] = v

  ##
  # @param  {Array|String|Object} code, a String, opcode-Array or Object with
  #                               toString method
  # @return Expression
  Compiler.parse = (code, _impl = parse) ->
    ScriptCompiler.parse(code, _impl)
