'use strict';

const OFF = 0;
const ERROR = 2;

// eslint-plugin-react <https://github.com/yannickcr/eslint-plugin-react>
module.exports = {
  plugins: ['react'],
  ecmaFeatures: {
    jsx: true,
  },
  rules: {
    // Prevent missing displayName in a React component definition
    'react/display-name': [ERROR, {ignoreTranspilerName : false}],

    // Forbid certain propTypes
    'react/forbid-prop-types': ERROR,

    // Enforce boolean attributes notation in JSX
    'react/jsx-boolean-value': OFF,

    // Validate closing bracket location in JSX
    'react/jsx-closing-bracket-location': [ERROR, {nonEmpty: 'after-props'}],

    // Enforce or disallow spaces inside of curly braces in JSX attributes
    'react/jsx-curly-spacing': [ERROR, 'never'],

    // Validate props indentation in JSX
    'react/jsx-indent-props': [ERROR, 2],

    // Validate indentation style for JSX
    'react/jsx-indent': [ERROR, 2],

    // Enforce event handler naming conventions in JSX
    'react/jsx-handler-names': OFF,

    // Validate JSX has key prop when in array or iterator
    'react/jsx-key': ERROR,

    // Limit maximum of props on a single line in JSX
    'react/jsx-max-props-per-line': [ERROR, {maximum: 4}],

    // Prevent usage of .bind() and arrow functions in JSX props
    'react/jsx-no-bind': OFF,

    'react/jsx-no-duplicate-props': [ERROR, {'ignoreCase': true}],

    // Prevent usage of unwrapped JSX strings
    'react/jsx-no-literals': OFF,

    // Disallow undeclared variables in JSX
    'react/jsx-no-undef': ERROR,

    // Enforce PascalCase for user-defined JSX components
    'react/jsx-pascal-case': ERROR,

    // Enforce quote style for JSX attributes
    'jsx-quotes': [ERROR, 'prefer-double'],

    // Enforce propTypes declarations alphabetical sorting
    'react/jsx-sort-prop-types': OFF,

    // Enforce props alphabetical sorting
    'react/jsx-sort-props': OFF,

    // Prevent React to be incorrectly marked as unused
    'react/jsx-uses-react': ERROR,

    // Prevent variables used in JSX to be incorrectly marked as unused
    'react/jsx-uses-vars': ERROR,

    // Prevent usage of dangerous JSX properties
    'react/no-danger': OFF,

    // Prevent usage of setState in componentDidMount
    'react/no-did-mount-set-state': ERROR,

    // Prevent usage of setState in componentDidUpdate
    'react/no-did-update-set-state': ERROR,

    // Prevent direct mutation of this.state
    'react/no-direct-mutation-state': ERROR,

    // Prevent multiple component definition per file
    'react/no-multi-comp': [ERROR, {ignoreStateless: true}],

    // Prevent usage of setState
    'react/no-set-state': OFF,

    // Make sure we're using valid DOM elements
    'react/no-unknown-property': ERROR,

    // Prefer ES2015 Classes for creating React Components
    'react/prefer-es6-class': ERROR,

    // Ensure that we have no missing prop validations in a React Component
    'react/prop-types': ERROR,

    // Make sure that React is in the scope when JSX is used
    'react/react-in-jsx-scope': ERROR,

    // Restrict the file extension
    'react/require-extension': OFF,

    // Enforce additional closing tags when not needed
    'react/self-closing-comp': ERROR,

    // Instance-specific methods go after render, truly
    // private (ie' internal) are last
    'react/sort-comp': [ERROR, {
      order: [
        'lifecycle',
        'render',
        '/^_\w+$/',
        '/^__\w+$/',
      ],
    }],

    // Prevent missing parentheses around multilines JSX
    'react/jsx-wrap-multilines': ERROR,

    // Prevent usage of deprecated methods
    'react/no-deprecated': ERROR,
  },
};
