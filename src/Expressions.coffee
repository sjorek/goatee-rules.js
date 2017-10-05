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
###
# # ExpressionMap …
# ---------------
#
# ExpressionMaps look like “attribute-key: expression; another-key: expression”.
# They provide a implementation of normalized to dash-seperated RuleMap.
#
###

###*
# -------------
# A helping wrapper …
#
# @function _create
# @param {Function} ParentClass
# @private
###
_create = (ParentClass) ->

  ###*
  # -------------
  # @class ExpressionMap
  # @namespace GoateeRules
  ###
  class ExpressionMap extends ParentClass

    # lazy reference to **Parser.parse**
    parse = null

    ###*
    # -------------
    # Compatibillity layer for expressions
    #
    # @property operator
    # @type {Object}
    ###
    operator:
      name: 'rules'

    ###*
    # -------------
    # Parses the given string  and applies the resulting map to this map, taking
    # priorities into consideration.
    #
    # @method apply
    # @param  {String} string
    # @return {RuleMap}
    ###
    apply: (string) ->
      # Delayed require to allow circular dependency during parser creation
      parse ?= require('./Parser').parse
      @inject parse(string, this)

    ###*
    # -------------
    # @method normalizeValue
    # @param  {Expression} expression
    # @return {Expression}
    ###
    normalizeValue: (expression) ->
      expression

    ###*
    # -------------
    # @method toJSON
    # @param  {Function}  callback (optional)
    # @return {Array}
    ###
    toJSON: (callback) ->
      return callback this if callback
      @flatten()

    ###*
    # -------------
    # @method callback
    # @param  {Function}  callback (optional)
    # @return {ExpressionMap}
    ###
    callback: (callback) ->
      @each (key, expression, important) ->
        expression.callback(callback)

    ###*
    # -------------
    # @method evaluate
    # @param  {Object} context (optional)
    # @param  {Object} variables (optional)
    # @param  {Array}  scope (optional)
    # @param  {Array}  stack (optional)
    # @return {Object}
    ###
    evaluate: (context={}, variables={}, scope, stack) ->
      rules = {}
      @map (key, expression, important) ->
        rules[key] = expression.evaluate(context, variables, scope, stack)
      rules

  ExpressionMap

module.exports = _create require('./Ordered/PropertyMap')

# Map all possible implementations for development purposes
for _kind in ['Attribute','Property', 'Rule']
  module.exports["Ordered#{_kind}Expressions"]   = \
    _create require("./Ordered/#{_kind}Map")
  module.exports["Unordered#{_kind}Expressions"] = \
    _create require("./Unordered/#{_kind}Map")
