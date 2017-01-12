import React, { PropTypes } from 'react';

const path = {
  fill: 'none',
  stroke: '#5392ff',
  strokeWidth: 1.5,
};

export default class Line extends React.PureComponent {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    data: PropTypes.array.isRequired,
    line: PropTypes.func.isRequired,
  }

  render() {
    const { data, line } = this.props;

    return (
      <path style={path} d={line(data)} />
    );
  }
}
