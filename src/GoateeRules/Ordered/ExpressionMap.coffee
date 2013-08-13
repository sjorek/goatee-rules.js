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
{parse}     = require '../Parser'


exports = module?.exports ? this

## ExpressionMap

# ExpressionMap look like “attribute-key: expression; another-key: value”.
# They provide a implementation of normalized to dash-seperated RuleMap.
#
# @class
# @namespace GoateeRules.Unordered
exports.ExpressionMap = class ExpressionMap extends RuleMap

  ##
  # Parses the given string  and applies the resulting map to this map, taking
  # priorities into consideration.
  #
  # @param  {String} string
  # @return {RuleMap}
  apply: (string) ->
    @inject parse(string, this)

  ##
  # @param  {Expression} expression
  # @return {Expression}
  normalizeValue: (expression) ->
