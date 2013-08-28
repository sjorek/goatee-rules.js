
[goatee-rules](http://sjorek.github.io/goatee-rules/)
=====================================================

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

Also see “[goatee-js](http://sjorek.github.io/goatee-js)” and
“[goatee-script](http://sjorek.github.io/goatee-script)”.


## Installation

    $ npm install -g goatee-rules


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

Read the [annotated sources](http://sjorek.github.io/goatee-rules/).


## Development

Install dependencies:

- [git-scm](http://git-scm.com)
- [node.js *(≥ 0.10)*](http://nodejs.org)
- [pygments](http://pygments.org)

Install project:

    $ git clone https://github.com/sjorek/goatee-rules
    $ cd goatee-rules
    $ npm install

Run build in *nix-like environments:

    $ PATH=$PATH:./node_modules/.bin cake all

Run build in Windows environments (**not tested**):

    $ set path=%PATH%;.\node_modules\.bin
    $ setx path "%PATH%"
    $ cake all


## Credits go to …

- … Zachary Carter and all contributors of
  [jison parser generator](http://zaach.github.io/jison/)

- … Jeremy Ashkenas and all contributors of
  [Coffee-Script](http://coffeescript.org/)
  as a source of inspiration

- … Kris Nye for his [Glass-Script](https://github.com/krisnye/glass-script/)
  as a source of inspiration
