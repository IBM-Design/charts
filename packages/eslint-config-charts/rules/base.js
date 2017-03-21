'use strict';

const OFF = 0;
const ERROR = 2;

module.exports = {
  rules: {
    'comma-dangle': [ERROR, 'always-multiline'],

    // equivalent to jshint boss
    'no-cond-assign': OFF,
    'no-console': ERROR,
    // prohibits things like `while (true)`
    'no-constant-condition': OFF,
    // we need to be able to match these
    'no-control-regex': OFF,
    // equivalent to jshint debug
    'no-debugger': ERROR,
    // equivalent to jshint W004
    'no-dupe-args': ERROR,
    // syntax error in strict mode, almost certainly unintended in any case
    'no-dupe-keys': ERROR,
    // almost certainly a bug
    'no-duplicate-case': ERROR,
    // almost certainly a bug
    'no-empty-character-class': ERROR,
    // would warn on uncommented empty `catch (ex) {}` blocks
    'no-empty': OFF,
    // can cause subtle bugs in IE 8, and we shouldn't do this anyways
    'no-ex-assign': ERROR,
    // we shouldn't do this anyways
    'no-extra-boolean-cast': ERROR,
    // parens may be used to improve clarity, equivalent to jshint W068
    'no-extra-parens': [ERROR, 'functions'],
    // equivalent to jshint W032
    'no-extra-semi': ERROR,
    // a function delaration shouldn't be rewritable
    'no-func-assign': ERROR,
    // babel and es6 allow block-scoped functions
    'no-inner-declarations': OFF,
    // will cause a runtime error
    'no-invalid-regexp': ERROR,
    // disallow non-space or tab whitespace characters
    'no-irregular-whitespace': ERROR,
    // write `if (!(a in b))`, not `if (!a in b)`, equivalent to jshint W007
    'no-negated-in-lhs': ERROR,
    // will cause a runtime error
    'no-obj-calls': ERROR,
    // improves legibility
    'no-regex-spaces': ERROR,
    // equivalent to jshint elision
    'no-sparse-arrays': ERROR,
    // equivalent to jshint W027
    'no-unreachable': ERROR,
    // equivalent to jshint use-isnan
    'use-isnan': ERROR,
    // probably too noisy ATM
    'valid-jsdoc': OFF,
    // equivalent to jshint notypeof
    'valid-typeof': ERROR,
    // we already require semicolons
    'no-unexpected-multiline': OFF,
  },
};
