###
© Copyright 2013 Stephan Jorek <stephan.jorek@gmail.com>  

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

{RuleMap}   = require './RuleMap'

{Utility:{
  camelize
}}          = require '../Utility'

exports = module?.exports ? this

## PropertyMap

# PropertyMap look like “propertyId: expression; anotherProp: value”.
# They provide a implementation of normalized to camel-case RuleMap.
#
# @class
# @namespace GoateeRules.Unordered
exports.PropertyMap = class PropertyMap extends RuleMap

  ##
  # @param  {String} string
  # @return {String}
  normalizeKey: (string) ->
    camelize super(string)
