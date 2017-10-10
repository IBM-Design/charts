import React from 'react';
import PropTypes from 'prop-types';

/**
 * It's helpful to leverage component in test scenarios where you're relying on
 * Jest's `snapshot` feature. Since our components rely on the chart dimensions
 * being passed in through context, use this component to provide that context
 * without adding extra nodes to the snapshot output.
 */
export default class ChartProvider extends React.PureComponent {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    children: PropTypes.any,
  }

  static childContextTypes = {
    chart: PropTypes.object,
  }

  getChildContext() {
    return {
      chart: {
        width: 500,
        height: 500,
        margin: {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        },
      },
    };
  }

  render() {
    return this.props.children;
  }
}
