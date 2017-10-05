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
# External dependencies.
UnorderedRuleMap = require '../Unordered/RuleMap'

###
# # RuleMaps …
# -----------------
#
# … look like “identifier: expression; identifier2: expression2”.
# They provide a simplified implementation of RuleMap keeping the
# initial order of all rules added.
###

###*
# -------------
# @class RuleMap
# @namespace GoateeRules.Ordered
###
class RuleMap extends UnorderedRuleMap

  ###*
  # -------------
  # @param {Array}  [sequence]
  # @param {Object} rules
  # @param {Object} priority
  # @constructor
  ###
  constructor: (@sequence = [], @rules, @priority) ->
    super @rules, @priority

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

    @sequence.push(id) if exists is false

    this

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
    fn key, @rules[key], @priority.hasOwnProperty(key) for key in @sequence

module.exports = RuleMap
