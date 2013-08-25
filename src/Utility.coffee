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
# @namespace GoateeRules
exports.Utility = class Utility

  ##
  # @param  {Object}  The object to test
  # @return {Boolean}
  Utility.isRuleMap = (obj) ->
    obj? and obj.rules? and obj.priority?

  ##
  # @param  {String}     code
  # @return {Expression}
  Utility.parse = \
  Utility.parseExpression = do ->
    parser = null
    cache  = {}
    (code) ->
      return cache[code] if cache.hasOwnProperty(code)
      parser ?= require './Parser'
      expression = parser.parse code
      cache[code] = cache['' + expression] = expression

  ##
  # NON-STANDARD
  # lightweight version of CSSOM.CSSStyleRule.parse
  #
  # @param  {String}          rules
  # @param  {UnorderedRules}  _map  Optional instance to merge rules into
  #                                 meant to be used for internally.
  # @return {UnorderedRules}
  Utility.parseRules    = do ->
    parser = null
    cache  = {}
    (code) ->
      return cache[code] if cache.hasOwnProperty(code)
      parser ?= require './Rules'
      rules = parser.parse code
      cache[code] = cache['' + rules] = rules

  ##
  # Trim whitespace from begin and end of string.
  #
  # @param  {String}  string  Input string.
  # @return {String}  Trimmed string.
  Utility.trim          =
    if String::trim?
      (string) -> string.trim()
    else do ->
      # Un-inlined literal, to avoid object creation.
      _REGEXP_trim = /^\s+|\s+$/g
      (string)    -> string.replace _REGEXP_trim, ''

  ##
  # Converts “a-property-name” to “aPropertyName”
  #
  # @param  {String}  string  Input string.
  # @return {String}  Camelized string.
  Utility.camelize      = do ->
    _REGEXP_camelize    = /-([a-z0-9])/gi
    _camelize           =  (match, char, index, str) -> char.toUpperCase()
    (string)            -> string.replace _REGEXP_camelize, _camelize

  ##
  # Converts “aPropertyName” to “a-property-name”
  #
  # @param  {String}  string  Input string.
  # @return {String}  Dashed string.
  Utility.dashify       = do ->
    _CHAR_dash          = '-'
    _REGEXP_dashify     = /(^|[a-z0-9])([A-Z])/g
    _dashify            = (match, char, camel, index, str) ->
      char.toLowerCase() + _CHAR_dash + camel.toLowerCase()
    (string)            -> string.replace _REGEXP_dashify, _dashify

