'use strict';

const OFF = 0;

// eslint-plugin-babel <https://github.com/babel/eslint-plugin-babel>
module.exports = {
  plugins: ['babel'],
  rules: {
    'babel/generator-star-spacing': OFF,
    'babel/new-cap': OFF,
    'babel/array-bracket-spacing': OFF,
    'babel/object-curly-spacing': OFF,
    'babel/object-shorthand': OFF,
    'babel/arrow-parens': OFF,
    'babel/no-await-in-loop': OFF,
  },
};
