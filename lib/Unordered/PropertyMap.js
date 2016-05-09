/*
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
 */

(function() {
    var PropertyMap, RuleMap, camelize,
        extend = function(child, parent) {
            for (var key in parent) {
                if (hasProp.call(parent, key)) child[key] = parent[key];
            }

            function ctor() {
                this.constructor = child;
            }
            ctor.prototype = parent.prototype;
            child.prototype = new ctor();
            child.__super__ = parent.prototype;
            return child;
        },
        hasProp = {}.hasOwnProperty;

    RuleMap = require('./RuleMap');

    camelize = require('../Utility').camelize;


    /*
     * # PropertyMaps …
     * -----------------
     *
     * … look like “propertyId: expression; anotherProp: value”. They
     * provide a implementation of unordered `RuleMap`s having its keys
     * normalized to camel-case.
     */


    /**
     * -------------
     * @class PropertyMap
     * @namespace GoateeRules.Unordered
     */

    PropertyMap = (function(superClass) {
        extend(PropertyMap, superClass);

        function PropertyMap() {
            return PropertyMap.__super__.constructor.apply(this, arguments);
        }


        /**
         * -------------
         * @method normalizeKey
         * @param  {String} string
         * @return {String}
         */

        PropertyMap.prototype.normalizeKey = function(string) {
            return camelize(PropertyMap.__super__.normalizeKey.call(this, string));
        };

        return PropertyMap;

    })(RuleMap);

    module.exports = PropertyMap;

}).call(this);
//# sourceMappingURL=PropertyMap.js.map
