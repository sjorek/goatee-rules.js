
[goatee-rules.js](https://sjorek.github.io/goatee-rules.js/)
===========================================================

[![Dependency Status](https://gemnasium.com/badges/github.com/sjorek/goatee-rules.js.svg)](https://gemnasium.com/github.com/sjorek/goatee-rules.js)

         _______  _______  _______  _______  _______  _______
        |    ___||       ||       ||_     _||    ___||    ___|
        |   | __ |   _   ||   _   |  |   |  |   |___ |   |___
        |   ||  ||  |_|  ||  |_|  |  |   |  |    ___||    ___|
        |   |_| ||       ||   _   |  |   |  |   |___ |   |___
        |_______||_______||__| |__|  |___|  |_______||_______|
                                         . ,
                                         (\\
                                      .--, \\__
                                       `-.     *`-.__
                                         |          ')
                                        / \__.-'-, ~;
                                       /     |   { /
                        ._..,-.-"``~"-'      ;    (
                     .;'                    ;'    ´
                ~;,./                      ;'
                   ';                     ;'
                    ';                 /;'|
                     |    .;._.,;';\   |  |
                     \   /  /       \  |\ |
                      \ || |         | )| )
                      | || |         | || |
                ~~~~~ | \| \  ~~~~~~ | \| \  ~~~~~~~
                "''"' `##`##' "'"''" `##`##' '"''"'"
                '"'"''"'"''"''"''"'"'''"'"'''"''"'"'
                ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            ______    __   __  ___      _______  _______
           |    _ |  |  | |  ||   |    |    ___||  _____|
           |   |_||_ |  | |  ||   |    |   |___ | |_____
           |    __  ||  |_|  ||   |___ |    ___||_____  |
           |   |  | ||       ||       ||   |___  _____| |
           |___|  |_||_______||_______||_______||_______|

A goatee is the perfect complement for handlebar mustaches. :-{>~

## Objective

GoateeRules are the combination of goatee-script and the syntax of inline
css-rules.

Example:

    test: 1 + 2 * 3 ; /* line-breaks are optional */
    an-attribute: 'tester'.replace('r','d') ; aProperty: null

Also see “[goatee.js](https://sjorek.github.io/goatee.js)” and
“[goatee-script.js](https://sjorek.github.io/goatee-script.js)”.


## Installation

    $ npm install -g goatee-rules.js


## Usage

    $ goatee-rules -h

    Usage: goatee-rules [statements]... [options]

    statements     string passed from the command line to evaluate

    Options:
       -r STATEMENT, --run STATEMENT   string passed from the command line to
                                       evaluate
       -h, --help                      display this help message
       -i, --interactive               run an interactive `goatee-rules` read-
                                       execute-print-loop (repl)
       -m MODE, --mode MODE            [c]ompile, [e]valuate, [p]rint, [r]ender
                                       or [s]tringify statements, default:  [eval]
       -c, --compress                  compress the abstract syntax tree (ast)
       --nodejs OPTION                 pass one option directly to the 'node'
                                       binary, repeat for muliple options
       -v, --version                   display the version number and exit

    If called without options, `goatee-rules` will run interactive.

## Documentation

Read the [annotated sources](https://sjorek.github.io/goatee-rules.js/doc/).


## Development

### Install dependencies …

- [node.js](http://nodejs.org) _(≥ 6.x)_

  ### … for production version:

       $ npm install goatee-rules.js --save-prod

  ### … for development version:

      $ git clone https://github.com/sjorek/goatee-rules.js
      $ cd goatee-rules.js
      $ npm install

### Run build …

    $ npm run build && npm run test && npm run doc

_(not tested yet)_


## Credits go to …

- … Zachary Carter and all contributors of
  [jison parser generator](http://zaach.github.io/jison/)

- … Jeremy Ashkenas and all contributors of
  [Coffee-Script](http://coffeescript.org/)
  as a source of inspiration

- … Kris Nye for his [Glass-Script](https://github.com/krisnye/glass-script/)
  as a source of inspiration
