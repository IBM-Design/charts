'use strict';

const OFF = 0;
const ERROR = 2;

module.exports = {
  env: {
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
  rules: {
    'arrow-body-style': OFF,
    'arrow-parens': OFF,
    // tbgs finds *very few* places where we don't put spaces around =>
    'arrow-spacing': [ERROR, {before: true, after: true}],
    // violation of the ES6 spec, won't transform
    'constructor-super': ERROR,
    // https://github.com/babel/babel-eslint#known-issues
    'generator-star-spacing': OFF,
    'no-class-assign': ERROR,
    'no-confusing-arrow': OFF,
    // this is a runtime error
    'no-const-assign': ERROR,
    'no-dupe-class-members': ERROR,
    // violation of the ES6 spec, won't transform, `this` is part of the TDZ
    'no-this-before-super': ERROR,
    // we have way too much ES3 & ES5 code
    'no-var': OFF,
    'object-shorthand': OFF,
    'prefer-const': OFF,
    'prefer-spread': OFF,
    // we don't support/polyfill this yet
    'prefer-reflect': OFF,
    'prefer-template': OFF,
    // there are legitimate use-cases for an empty generator
    'require-yield': OFF,
  },
};
