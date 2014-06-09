###
© Copyright 2013-2014 Stephan Jorek <stephan.jorek@gmail.com>  

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

exports = module?.exports ? this

## ExpressionMap

# ExpressionMaps look like “attribute-key: expression; another-key: expression”.
# They provide a implementation of normalized to dash-seperated RuleMap.
#
# @class
# @namespace GoateeRules
_create = (ParentClass) ->

  ExpressionMap = class ExpressionMap extends ParentClass

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
      parse ?= require('./Parser').parse
      @inject parse(string, this)

    ##
    # @param  {Expression} expression
    # @return {Expression}
    normalizeValue: (expression) ->
      expression

    ##
    # @param  {Function}  callback (optional)
    # @return {Array}
    toJSON: (callback) ->
      return callback this if callback
      @flatten()

    ##
    # @param  {Function}  callback (optional)
    # @return {ExpressionMap}
    callback: (callback) ->
      @each (key, expression, important) ->
        expression.callback(callback)

    ##
    # @param  {Object} context (optional)
    # @param  {Object} variables (optional)
    # @param  {Array}  scope (optional)
    # @param  {Array}  stack (optional)
    # @return {Object}
    evaluate: (context={}, variables={}, scope, stack) ->
      rules = {}
      @map (key, expression, important) ->
        rules[key] = expression.evaluate(context, variables, scope, stack)
      rules

  ExpressionMap

#for _kind in ['Attribute','Property', 'Rule']
#  exports["Ordered#{_kind}Expressions"]   = \
#    _create require("./Ordered/#{_kind}Map")["#{_kind}Map"]
#  exports["Unordered#{_kind}Expressions"] = \
#    _create require("./Unordered/#{_kind}Map")["#{_kind}Map"]

exports.Expressions = _create require("./Ordered/PropertyMap").PropertyMap
