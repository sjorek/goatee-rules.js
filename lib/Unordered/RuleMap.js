// Generated by CoffeeScript 1.6.3
/*
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
*/


(function() {
  var RuleMap, exports, parse, trim, _ref,
    __hasProp = {}.hasOwnProperty;

  parse = require('../Rules').Rules.parse;

  trim = require('../Utility').Utility.trim;

  exports = (_ref = typeof module !== "undefined" && module !== null ? module.exports : void 0) != null ? _ref : this;

  exports.RuleMap = RuleMap = (function() {
    function RuleMap(rules, priority) {
      this.rules = rules != null ? rules : {};
      this.priority = priority != null ? priority : {};
    }

    RuleMap.prototype.add = function(key, value, important) {
      var exists, id;
      id = this.normalizeKey(key);
      exists = this.rules.hasOwnProperty(id);
      if (!(important === true || exists === false || this.priority.hasOwnProperty(id) === false)) {
        return this;
      }
      this.rules[id] = this.normalizeValue(value);
      if (important === true) {
        this.priority[id] = true;
      }
      return this;
    };

    RuleMap.prototype.each = function(fn) {
      this.map(fn);
      return this;
    };

    RuleMap.prototype.map = function(fn) {
      var key, value, _ref1, _results;
      _ref1 = this.rules;
      _results = [];
      for (key in _ref1) {
        if (!__hasProp.call(_ref1, key)) continue;
        value = _ref1[key];
        _results.push(fn(key, value, this.priority.hasOwnProperty(key)));
      }
      return _results;
    };

    RuleMap.prototype.apply = function(string) {
      return parse(string, this);
    };

    RuleMap.prototype.inject = function(map) {
      map.project(this);
      return this;
    };

    RuleMap.prototype.project = function(map) {
      this.each(function(key, value, priority) {
        return map.add(key, value, priority);
      });
      return this;
    };

    RuleMap.prototype.normalizeKey = function(string) {
      return trim(string);
    };

    RuleMap.prototype.normalizeValue = function(string) {
      return trim(string);
    };

    RuleMap.prototype.flatten = function(fn) {
      return this.map(function(key, value, priority) {
        return [key, value, priority];
      });
    };

    RuleMap.prototype.toString = function() {
      var rules;
      rules = this.map(function(key, value, priority) {
        var rule;
        rule = "" + key + ":" + value;
        if (priority === true) {
          rule += " !important";
        }
        return rule;
      });
      return rules.join(';');
    };

    return RuleMap;

  })();

}).call(this);

/*
//@ sourceMappingURL=RuleMap.map
*/