
goatee-rules
============

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

> :-{>~ A goatee is the perfect complement for handlebar mustaches. ~<}-:

GoateeRules are the combination of goatee-script and the syntax of inline
css-rules.

## Objective

See “[goatee-js](https://github.com/sjorek/goatee-js)” and
“[goatee-script](https://github.com/sjorek/goatee-script)”.

## Installation

    $ npm install -g goatee-rules

## Usage

    $ goatee-rules -h

    Usage: goatee-rules [statements]... [options]

    statements     string passed from the command line to evaluate

    Options:
       -r STATEMENT, --run STATEMENT   string passed from the command line to evaluate
       -h, --help                      display this help message
       -i, --interactive               run an interactive `goatee-rules` REPL
       -m MODE, --mode MODE            set execution-mode to [c]ompile, [e]valuate, [p]rint, [r]ender or [s]tringify given statements, default:  [eval]
       -c, --compress                  compress the abstract syntax tree (ast)  [false]
       --nodejs OPTION                 pass one option directly to the "node" binary, repeat for muliple options
       -v, --version                   display the version number and exit

    If called without options, `goatee-rules` will run interactive.

## Development

    $ git clone https://github.com/sjorek/goatee-rules
    $ cd goatee-rules
    $ PATH=$PATH:./node_modules/.bin cake all

## Credits go to …

- … Zachary Carter and all contributors for their
  [jison parser generator](http://zaach.github.io/jison/)

- … Jeremy Ashkenas and all contributors for their
  [Coffee-Script](http://coffeescript.org/)
  as a source of inspiration

- … Kris Nye for his [Glass-Script](https://github.com/krisnye/glass-script/)
  as a source of inspiration

- … [Nodeclipse v0.4](https://github.com/Nodeclipse/nodeclipse-1)
 ([Eclipse Marketplace](http://marketplace.eclipse.org/content/nodeclipse), [site](http://www.nodeclipse.org))

