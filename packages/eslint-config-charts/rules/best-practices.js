'use strict';

const OFF = 0;
const ERROR = 2;

module.exports = {
  rules: {
    // probably a bug, we shouldn't actually even use this yet, because of IE8
    'accessor-pairs': [ERROR, {setWithoutGet: true}],
    // probably too noisy ATM
    'block-scoped-var': OFF,
    // cyclomatic complexity, we're too far gone
    'complexity': OFF,
    // require return statements to either always or never specify values
    'consistent-return': ERROR,
    // style guide: Always use brackets, even when optional.
    'curly': [ERROR, 'all'],
    // we don't do this/care about this
    'default-case': OFF,
    // disabled in favor of our temporary fork
    'dot-notation': OFF,
    // we don't do this/care about this, but probably should eventually
    'dot-location': OFF,
    // disabled as it's too noisy ATM
    'eqeqeq': [OFF, 'allow-null'],
    // we don't do this/care about this, equivalent to jshint forin
    'guard-for-in': OFF,
    // we have too many internal examples/tools using this
    'no-alert': OFF,
    // incompatible with 'use strict' equivalent to jshint noarg
    'no-caller': ERROR,
    // we don't care about this right now, but might later
    'no-case-declarations': OFF,
    // we don't do this/care about this
    'no-div-regex': OFF,
    // we don't do this/care about this
    'no-else-return': OFF,
    // avoid mistaken variables when destructuring
    'no-empty-pattern': ERROR,
    // see eqeqeq: we explicitly allow this, equivalent to jshint eqnull
    'no-eq-null': OFF,
    // equivalent to jshint evil
    'no-eval': ERROR,
    // should only be triggered on polyfills, which we can fix case-by-case
    'no-extend-native': ERROR,
    // might be a sign of a bug
    'no-extra-bind': ERROR,
    // equivalent to jshint W089
    'no-fallthrough': ERROR,
    // equivalent to jshint W008
    'no-floating-decimal': ERROR,
    // implicit coercion is often idiomatic
    'no-implicit-coercion': OFF,
    // equivalent to jshint evil/W066
    'no-implied-eval': ERROR,
    // will likely create more signal than noise
    'no-invalid-this': OFF,
    // babel should handle this fine
    'no-iterator': OFF,
    // Should be effectively equivalent to jshint W028 - allowing the use
    // of labels in very specific situations. ESLint no-empty-labels was
    // deprecated.
    'no-labels': [ERROR, {allowLoop: true, allowSwitch: true}],
    // lone blocks create no scope, will ignore blocks with let/const
    'no-lone-blocks': ERROR,
    // equivalent to jshint loopfunc
    'no-loop-func': OFF,
    // we surely have these, don't bother with it
    'no-magic-numbers': OFF,
    // we may use this for alignment in some places
    'no-multi-spaces': OFF,
    // equivalent to jshint multistr, consider using es6 template strings
    'no-multi-str': ERROR,
    // equivalent to jshint W02OFF, similar to no-extend-native
    'no-native-reassign': [ERROR, {exceptions: ['Map', 'Set']}],
    // equivalent to jshint evil/W054
    'no-new-func': ERROR,
    // don't use constructors for side-effects, equivalent to jshint nonew
    'no-new': ERROR,
    // very limited uses, mostly in third_party
    'no-new-wrappers': ERROR,
    // deprecated in ES5, but we still use it in some places
    'no-octal-escape': ERROR,
    // deprecated in ES5, may cause unexpected behavior
    'no-octal': ERROR,
    // treats function parameters as constants, probably too noisy ATM
    'no-param-reassign': OFF,
    // only relevant to node code
    'no-process-env': OFF,
    // deprecated in ES3.ERROR, equivalent to jshint proto
    'no-proto': ERROR,
    // jshint doesn't catch this, but this is inexcusable
    'no-redeclare': ERROR,
    // equivalent to jshint boss
    'no-return-assign': OFF,
    // equivalent to jshint scripturl
    'no-script-url': ERROR,
    // not in jshint, but is in jslint, and is almost certainly a mistake
    'no-self-compare': ERROR,
    // there are very limited valid use-cases for this
    'no-sequences': ERROR,
    // we're already pretty good about this, and it hides stack traces
    'no-throw-literal': ERROR,
    // breaks on `foo && foo.bar()` expression statements, which are common
    'no-unused-expressions': OFF,
    // disallow unnecessary .call() and .apply()
    'no-useless-call': ERROR,
    // disallow concatenating string literals
    'no-useless-concat': ERROR,
    // this has valid use-cases, eg. to circumvent no-unused-expressions
    'no-void': OFF,
    // this journey is 1% finished (allow TODO comments)
    'no-warning-comments': OFF,
    // equivalent to jshint withstmt
    'no-with': OFF,
    // require radix argument in parseInt, we do this in most places already
    'radix': ERROR,
    // we don't do this/care about this
    'vars-on-top': OFF,
    // equivalent to jshint immed
    'wrap-iife': OFF,
    // probably too noisy ATM
    'yoda': OFF,
  },
};
