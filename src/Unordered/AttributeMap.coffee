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

RuleMap   = require './RuleMap'

{
  dashify
}         = require '../Utility'

###
# # AttributeMaps …
# -----------------
#
# … look like “attribute-key: expression; another-key: value”. They
# provide a implementation of unordered `RuleMap`s having its keys
# normalized to dash-seperation.
###

###*
# -------------
# @class AttributeMap
# @namespace GoateeRules.Unordered
###
class AttributeMap extends RuleMap

  ###*
  # -------------
  # @method normalizeKey
  # @param  {String} string
  # @return {String}
  ###
  normalizeKey: (string) ->
    dashify super(string)

module.exports = AttributeMap
