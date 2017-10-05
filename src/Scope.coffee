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
ScriptScope = require 'goatee-script.js/lib/Scope'

Expressions = require './Expressions'

###
# # Scope
# -------
#
###

###*
#  -------------
# @class Scope
# @namespace GoateeRules
###
class Scope extends ScriptScope

  ###*
  # -------------
  # Create a new **Expression** or **Expressions** instance
  #
  # @method create
  # @param  {String}      operator
  # @param  {Array}       parameters
  # @return {Expressions|Expression}
  ###
  create  : (operator, parameters) ->
    return @addRule new Expressions, parameters if operator is 'rules'
    super(operator, parameters)

  ###*
  #  -------------
  # Add a Expression to the given ExpressionMap **rule**
  #
  # @method addRule
  # @param {ExpressionMap} rule
  # @param {Array}         parameters
  ###
  addRule: (rule, parameters) ->
    [key,expression,important] = parameters
    if expression.operator.name is 'list'
      expression = @create 'group', [expression]
    rule.add key, expression, important

module.exports = Scope
