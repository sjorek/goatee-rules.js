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

{RuleMap}   = require './RuleMap'

exports = module?.exports ? this

## ExpressionMap

# ExpressionMaps look like “attribute-key: expression; another-key: expression”.
# They provide a implementation of normalized to dash-seperated RuleMap.
#
# @class
# @namespace GoateeRules.Unordered
exports.ExpressionMap = class ExpressionMap extends RuleMap

  # lazy reference to **Parser.parse**
  parse = null

  ##
  # Compatibilliy layer for expressions
  #
  # @type {Object}
  operator:
    name: 'rules'

  ##
  # Parses the given string  and applies the resulting map to this map, taking
  # priorities into consideration.
  #
  # @param  {String} string
  # @return {RuleMap}
  apply: (string) ->
    # Delayed require to allow circular dependency during parser creation
    parse ?= require('../Parser').parse
    @inject parse(string, this)

  ##
  # @param  {Expression} expression
  # @return {Expression}
  normalizeValue: (expression) ->
    expression
