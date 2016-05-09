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
    var AttributeMap, RuleMap, dashify,
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

    dashify = require('../Utility').dashify;


    /*
     * # AttributeMaps …
     * -----------------
     *
     * … look like “attribute-key: expression; another-key: value”. They
     * provide a implementation of unordered `RuleMap`s having its keys
     * normalized to dash-seperation.
     */


    /**
     * -------------
     * @class AttributeMap
     * @namespace GoateeRules.Unordered
     */

    AttributeMap = (function(superClass) {
        extend(AttributeMap, superClass);

        function AttributeMap() {
            return AttributeMap.__super__.constructor.apply(this, arguments);
        }


        /**
         * -------------
         * @method normalizeKey
         * @param  {String} string
         * @return {String}
         */

        AttributeMap.prototype.normalizeKey = function(string) {
            return dashify(AttributeMap.__super__.normalizeKey.call(this, string));
        };

        return AttributeMap;

    })(RuleMap);

    module.exports = AttributeMap;

}).call(this);
//# sourceMappingURL=AttributeMap.js.map
