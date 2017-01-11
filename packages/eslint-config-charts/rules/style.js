'use strict';

const OFF = 0;
const ERROR = 2;

// This pattern will match these texts:
//   var Foo = require('Foo');
//   var Bar = require('Foo').Bar;
//   var BarFoo = require(Bar + 'Foo');
//   var {Bar, Foo} = require('Foo');
//   import type {Bar, Foo} from 'Foo';
// Also supports 'let' and 'const'.
const variableNamePattern = String.raw`\s*[a-zA-Z_$][a-zA-Z_$\d]*\s*`;
const maxLenIgnorePattern = String.raw`^(?:var|let|const|import type)\s+` +
  '{?' + variableNamePattern + '(?:,' + variableNamePattern + ')*}?' +
  String.raw`\s*(?:=\s*require\(|from)[a-zA-Z_+./"'\s\d\-]+\)?[^;\n]*[;\n]`;

module.exports = {
  rules: {
    'array-bracket-spacing': ERROR,
    // TODO: enable this with consensus on single line blocks
    'block-spacing': OFF,
    'brace-style': [ERROR, '1tbs', {allowSingleLine: true}],
    // too noisy at the moment, and jshint didn't check it
    'camelcase': [OFF, {properties: 'always'}],
    'comma-spacing': [ERROR, {before: false, after: true}],
    // jshint had laxcomma, but that was against our style guide
    'comma-style': [ERROR, 'last'],
    'computed-property-spacing': [ERROR, 'never'],
    // we may use more contextually relevant names for this than self
    'consistent-this': [OFF, 'self'],
    // should be handled by a generic TXT linter instead
    'eol-last': OFF,
    'func-names': OFF,
    // too noisy ATM
    'func-style': [OFF, 'declaration'],
    // no way we could enforce min/max lengths or patterns for vars
    'id-length': OFF,
    'id-match': OFF,
    // we weren't enforcing this with jshint, so erroring would be too noisy
    'indent': [ERROR, 2, {SwitchCase: 1}],
    // we use single quotes for JS literals, double quotes for JSX literals
    'jsx-quotes': [ERROR, 'prefer-double'],
    // we may use extra spaces for alignment
    'key-spacing': [OFF, {beforeColon: false, afterColon: true}],
    'keyword-spacing': [ERROR],
    'lines-around-comment': OFF,
    // should be handled by a generic TXT linter instead
    'linebreak-style': [OFF, 'unix'],
    'max-depth': OFF,
    'max-len': [ERROR, 120, 2,
      {'ignorePattern': maxLenIgnorePattern},
    ],
    'max-nested-callbacks': OFF,
    'max-params': OFF,
    'max-statements': OFF,
    // https://facebook.com/groups/995898333776940/1027358627297577
    'new-cap': OFF,
    // equivalent to jshint W058
    'new-parens': ERROR,
    'newline-after-var': OFF,
    'no-array-constructor': ERROR,
    'no-bitwise': ERROR,
    'no-continue': OFF,
    'no-inline-comments': OFF,
    // doesn't play well with `if (__DEV__) {}`
    'no-lonely-if': OFF,
    // stopgap, irrelevant if we can eventually turn `indent` on to error
    'no-mixed-spaces-and-tabs': ERROR,
    // don't care
    'no-multiple-empty-lines': OFF,
    'no-negated-condition': OFF,
    // we do this a bunch of places, and it's less bad with proper indentation
    'no-nested-ternary': OFF,
    // similar to FacebookWebJSLintLinter's checkPhpStyleArray
    'no-new-object': ERROR,
    'no-plusplus': OFF,
    'no-restricted-syntax': OFF,
    'no-spaced-func': ERROR,
    'no-ternary': OFF,
    // should be handled by a generic TXT linter instead
    'no-trailing-spaces': OFF,
    // we use this for private/protected identifiers
    'no-underscore-dangle': OFF,
    // disallow `let isYes = answer === 1 ? true : false;`
    'no-unneeded-ternary': ERROR,
    // too noisy ATM
    'object-curly-spacing': OFF,
    // makes indentation warnings clearer
    'one-var': [ERROR, {initialized: 'never'}],
    // prefer `x += 4` over `x = x + 4`
    'operator-assignment': [ERROR, 'always'],
    // equivalent to jshint laxbreak
    'operator-linebreak': OFF,
    'padded-blocks': OFF,
    // probably too noisy on pre-ES5 code
    'quote-props': [OFF, 'as-needed'],
    'quotes': [ERROR, 'single', 'avoid-escape'],
    'require-jsdoc': OFF,
    'semi-spacing': [ERROR, {before: false, after: true}],
    // equivalent to jshint asi/W032
    'semi': [ERROR, 'always'],
    'sort-vars': OFF,
    // require `if () {` instead of `if (){`
    'space-before-blocks': [ERROR, 'always'],
    // require `function foo()` instead of `function foo ()`
    'space-before-function-paren': [
      ERROR,
      {anonymous: 'never', named: 'never'},
    ],
    // incompatible with our legacy inline type annotations
    'space-in-parens': [OFF, 'never'],
    'space-infix-ops': [ERROR, {int32Hint: true}],
    'space-unary-ops': [ERROR, {words: true, nonwords: false}],
    // TODO: Figure out a way to do this that doesn't break typechecks
    // or wait for https://github.com/eslint/eslint/issues/2897
    'spaced-comment':
      [OFF, 'always', {exceptions: ['jshint', 'jslint', 'eslint', 'global']}],
    'wrap-regex': OFF,
  },
};
