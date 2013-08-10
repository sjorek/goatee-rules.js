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

exports = module?.exports ? this

##
# @class
# @namespace GoateeScript
exports.Utility = class Utility

  _parser = null

  Utility.lib = require.resolve('goatee-script').replace /\.js$/, '/'

  ##
  # @param  {String}     code
  # @return {Expression}
  Utility.parse = \
  Utility.parseRules = do ->
    cache  = {}
    (code) ->
      return cache[code] if cache.hasOwnProperty(code)
      _parser ?= require './Parser'
      expression = _parser.parse code
      cache[code] = cache['' + expression] = expression
