###
© Copyright 2013-2014 Stephan Jorek <stephan.jorek@gmail.com>  

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

exports = module?.exports ? this

##
# @class
# @namespace GoateeRules
exports.Rules = class Rules

  ##
  # NON-STANDARD
  # lightweight version of CSSOM.CSSStyleRule.parse
  #
  # @param  {String} rules
  # @param  {AttributeMap|PropertyMap|RuleMap}  _map  Optional instance to merge
  #                                                   rules into, internally.
  # @return {AttributeMap|PropertyMap|RuleMap}        The filled **_map**
  Rules.parse             = do ->

    ##
    # Un-inlined literals, to avoid object creation.
    _CHAR_space           = " "
    _CHAR_tab             = "\t" # tabulator
    _CHAR_vtab            = "\v" # vertical tabulator
    _CHAR_cr              = "\r" # carriage return
    _CHAR_lf              = "\n" # line feed
    _CHAR_ff              = "\f" # form feed
    _CHAR_doublequote     = '"'
    _CHAR_singlequote     = "'"
    _CHAR_slash           = '/'
    _CHAR_backslash       = '''\\'''
    _CHAR_colon           = ':'
    _CHAR_semicolon       = ';'
    _CHAR_exclamation     = '!'
    _CHAR_asterisk        = '*'

    _STRING_empty         = ''
    _STRING_opencomment   = '/*'
    _STRING_closecomment  = '*/'
    _STRING_nonimportant  = '!important'

    _REGEXP_isEscaped     = /[^\\](\\\\)*$/

    ##
    # Internal list of error messages, used by UnorderedRules.parse
    # @type {Array}
    _errors               = [
      "Unexpected content after important declaration"
      "Missing closing string"
      "Missing closing comment"
      "Unexpected string opener"
      "Missing identifier key"
      "Important already declared"
    ]

    ##
    # Internal error message function
    # @param  {Number} num
    # @param  {String} rules
    # @return {String}
    _error                = (num, rules, i) ->
      """
      #{_errors[num - 1]}:
      “#{rules.slice(0, i)}»»»#{rules.charAt(i)}«««#{rules.slice(i + 1)}”
      """

    (rules, _map)       ->

      _map      ?= new (require('./Unordered/RuleMap').RuleMap)
      i          = 0
      j          = i
      stateKey   = "key"
      stateValue = "value"
      state      = stateKey
      buffer     = ""
      char       = ""
      key        = ""
      value      = ""
      important  = false

      `for (char = ""; (char = rules.charAt(i)) !== ""; i++) {`

      # console.log 'Processing', i, '=', char

      switch char

        # " ", "\t", "\v", "\r", "\n", "\f"
        when _CHAR_space, _CHAR_tab, _CHAR_vtab, _CHAR_cr, _CHAR_lf, _CHAR_ff

          # SIGNIFICANT_WHITESPACE
          buffer += char if state is stateValue and not important
          continue
          break

        # String
        # "'", '"'
        when _CHAR_singlequote, _CHAR_doublequote
          if important
            throw (_error 1, rules, i)
          else if state is stateValue
            j = i + 1
            while index = rules.indexOf(char, j) + 1
              if rules.charAt(index - 2) isnt _CHAR_backslash or \
                 _REGEXP_isEscaped.test rules.slice(i, index - 1)
                break
              j = index

            throw (_error 2, rules, i) if index is 0
            buffer += rules.slice(i, index)
            i = index - 1
            continue
          else
            throw (_error 4, rules, i)
          break

        # Comment
        # "/"
        when _CHAR_slash
          if rules.charAt(i + 1) is _CHAR_asterisk # "*"
            i += 2
            index = rules.indexOf _STRING_closecomment, i # "*/", i
            throw (_error 3, rules, i) if index is -1
            i = index + 1
            continue
          else if important
            throw (_error 1, rules, i)
          else
            buffer += char
            continue
          break

        # ":"
        when _CHAR_colon
          if state is stateKey
            key   += buffer
            throw (_error 5, rules, i) if key is _STRING_empty
            buffer = ""
            state  = stateValue
            continue
          else if important
            throw (_error 1, rules, i)
          else
            buffer += char
            continue
          break

        # "!"
        when _CHAR_exclamation
          if state is stateValue and rules.indexOf(_STRING_nonimportant, i) is i
            throw (_error 6, rules, i) if important
            important = true
            i += 9 # = "important".length
            continue
          else if important
            throw (_error 1, rules, i)
          else
            buffer += char;
            continue
          break

        # ";"
        when _CHAR_semicolon
          if state is stateKey
            continue
          if state is stateValue
            value    += buffer

            _map.add(key, value, important)

            important = false
            key       = ""
            value     = ""
            buffer    = ""
            state     = stateKey
            continue
          else if important
            throw (_error 1, rules, i)
          else
            buffer += char
            continue
          break

        else
          throw (_error 1, rules, i) if important
          buffer += char
          continue
          break

      `}`

      _map.add(key, value + buffer, important) if state is stateValue

      return _map
