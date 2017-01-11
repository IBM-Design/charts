
'use strict';

module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
  },

  env: {
    // Enable these blindly because we can't make a per-file decision about this.
    browser: true,
    es6: true,
    node: true,
    jest: true,
    jasmine: true,
  },

  globals: {
    __DEV__: true,
  },

  extends: [
    './rules/base',
    './rules/best-practices',
    './rules/es6',
    './rules/node',
    './rules/strict',
    './rules/style',
    './rules/variables',

    './plugins/babel',
    './plugins/flowtype',
    './plugins/import',
    './plugins/react-a11y',
    './plugins/react',
  ].map(require.resolve),

  rules: {},
};
