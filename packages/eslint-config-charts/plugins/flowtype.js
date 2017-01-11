'use strict';

const ERROR = 2;

// eslint-plugin-flowtype
module.exports = {
  plugins: ['flowtype'],
  rules: {
    // These don't actually result in warnings. Enabling them ensures they run
    // and mark variables as used, avoiding false positives with Flow
    // annotations.
    'flowtype/define-flow-type': ERROR,
    'flowtype/use-flow-type': ERROR,
    'flowtype/object-type-delimiter': [ERROR, 'comma'],
  },
  globals: {
    // Workarounds for https://github.com/babel/babel-eslint/issues/130
    // no-undef errors incorrectly on these global flow types
    ReactComponent: false,
    ReactClass: false,
    ReactElement: false,
    ReactPropsCheckType: false,
    ReactPropsChainableTypeChecker: false,
    ReactPropTypes: false,
    SyntheticEvent: false,
    SyntheticClipboardEvent: false,
    SyntheticCompositionEvent: false,
    SyntheticInputEvent: false,
    SyntheticUIEvent: false,
    SyntheticFocusEvent: false,
    SyntheticKeyboardEvent: false,
    SyntheticMouseEvent: false,
    SyntheticDragEvent: false,
    SyntheticWheelEvent: false,
    SyntheticTouchEvent: false,
  },
};
