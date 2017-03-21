'use strict';

const OFF = 0;
const ERROR = 2;

module.exports = {
  rules: {
    // we don't do this/care about this
    'init-declarations': OFF,
    // equivalent to jshint W002, catches an IE8 bug
    'no-catch-shadow': ERROR,
    // equivalent to jshint W051, is a strict mode violation
    'no-delete-var': ERROR,
    // we should avoid labels anyways
    'no-label-var': ERROR,
    // redefining undefined, NaN, Infinity, arguments, and eval is bad, mkay?
    'no-shadow-restricted-names': ERROR,
    // a definite code-smell, but probably too noisy
    'no-shadow': OFF,
    // it's nice to be explicit sometimes: `let foo = undefined;`
    'no-undef-init': ERROR,
    // equivalent to jshint undef, turned into an error in getConfig
    'no-undef': ERROR,
    // using undefined is safe because we enforce no-shadow-restricted-names
    'no-undefined': OFF,
    // equivalent to jshint unused
    'no-unused-vars': [ERROR, {args: 'none'}],
    // too noisy
    'no-use-before-define': OFF,
  },
};
