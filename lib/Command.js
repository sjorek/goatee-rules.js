/*
© Copyright 2013-2016 Stephan Jorek <stephan.jorek@gmail.com>
© Copyright 2009-2013 Jeremy Ashkenas <https://github.com/jashkenas>

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
 */

(function() {
    var Command, ScriptCommand,
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

    ScriptCommand = require('goatee-script.js/lib/Command');


    /*
     * # Commandline …
     * ---------------
     *
     * … of the `goatee-rules` utility. Handles evaluation of
     * statements or launches an interactive REPL.
     */


    /**
     * -------------
     * @class Command
     * @namespace GoateeRules
     */

    Command = (function(superClass) {
        extend(Command, superClass);


        /**
         * -------------
         * @constructor
         * @param {Function} [command=GoateeRules.GoateeRules] class function
         */

        function Command(command) {
            if (command == null) {
                command = require('./GoateeRules');
            }
            Command.__super__.constructor.call(this, command);
        }

        return Command;

    })(ScriptCommand);

    module.exports = Command;

}).call(this);
//# sourceMappingURL=Command.js.map
