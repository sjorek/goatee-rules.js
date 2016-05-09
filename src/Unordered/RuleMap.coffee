###
© Copyright 2013-2016 Stephan Jorek <stephan.jorek@gmail.com>

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

{
  parse
}          = require '../Rules'

{
  trim
}          = require '../Utility'

###
# # RuleMaps …
# -----------------
#
# … look like “identifier: expression; identifier2: expression2”. They
# provide a simplified implementation of:
# @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Style-20001113/css.html#CSS-ElementCSSInlineStyle
# @see http://www.w3.org/TR/1998/REC-html40-19980424/present/styles.html#h-14.2.2
###

###*
# -------------
# @class RuleMap
# @namespace GoateeRules.Unordered
###
class RuleMap

  ###*
  # -------------
  # @param {Object} [rules]
  # @param {Object} [priority]
  # @constructor
  ###
  constructor: (@rules = {}, @priority = {}) ->

  ###*
  # -------------
  # adds a new rule to this instance
  #
  # @method add
  # @param  {String}  key
  # @param  {mixed}   value
  # @param  {Boolean} important
  # @return {RuleMap}
  ###
  add: (key, value, important) ->

    id     = @normalizeKey key
    exists = @rules.hasOwnProperty(id)

    return this unless important is true or \
                       exists is false or \
                       @priority.hasOwnProperty(id) is false

    @rules[id]    = @normalizeValue value
    @priority[id] = true if important is true

    this

  ###*
  # -------------
  # Call fn for each rule's key, value and priority and return this.
  #
  # @method map
  # @param  {Function} fn
  # @return {Array}
  ###
  each: (fn) ->
    @map(fn)
    @

  ###*
  # -------------
  # Call fn for each rule's key, value and priority and return the resulting
  # Array.
  #
  # @method map
  # @param  {Function} fn
  # @return {Array}
  ###
  map: (fn) ->
    fn key, value, @priority.hasOwnProperty(key) for own key, value of @rules

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
    parse string, @

  ###*
  # -------------
  # Opposite of @project(map). Returns this map with all rules from given map
  # applied to this map, taking my and their priorities into consideration.
  #
  # @method inject
  # @param  {RuleMap} map
  # @return {RuleMap}
  ###
  inject: (map) ->
    map.project this
    this

  ###*
  # -------------
  # Opposite of @inject(map). Returns the given map with all my rules applied
  # to given map, taking their and my priorities into consideration.
  #
  # @method inject
  # @param  {RuleMap} map
  # @return {RuleMap}
  ###
  project: (map) ->
    @each (key, value, priority) ->
      map.add(key, value, priority)
    this

  ###*
  # -------------
  # @method normalizeKey
  # @param  {String} string
  # @return {String}
  ###
  normalizeKey: (string) ->
    trim string

  ###*
  # -------------
  # @method normalizeValue
  # @param  {String} string
  # @return {String}
  ###
  normalizeValue: (string) ->
    trim string

  ###*
  # -------------
  # Return each rule's key, value and priority as Array of Arrays.
  #
  # @method flatten
  # @param  {Function} fn
  # @return {Array}
  ###
  flatten: (fn) ->
    @map (key, value, priority) ->
      [key, value, priority]

  ###*
  # -------------
  # Return a css-like representation of this maps' rules. It looks, like:
  #
  #     identifier: value; key: expression=1+1; action: expr( … ; … );
  #
  # @method toString
  # @return {String}
  ###
  toString: ->
    rules = @map (key, value, priority) ->
      rule  = "#{key}:#{value}"
      rule += " !important" if priority is true
      rule
    rules.join ';'

module.exports = RuleMap
