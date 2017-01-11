'use strict';

const ERROR = 2;

module.exports = {
  plugins: ['import'],
  rules: {
    'import/no-unresolved': ERROR,
    'import/named': ERROR,
    'import/no-absolute-path': ERROR,

    'import/export': ERROR,
    'import/no-named-as-default': ERROR,
    'import/no-extraneous-dependencies': ERROR,
    'import/no-mutable-exports': ERROR,

    'import/no-duplicates': ERROR,
    'import/extensions': ERROR,
  },
};
