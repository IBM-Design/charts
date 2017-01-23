import React, { PropTypes } from 'react';

const path = {
  fill: 'none',
  strokeWidth: 1.5,
};

export default class Line extends React.PureComponent {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    data: PropTypes.array.isRequired,
    line: PropTypes.func.isRequired,
    stroke: PropTypes.string,
  }

  static defaultProps = {
    stroke: '#000',
  }

  render() {
    const { data, line, stroke } = this.props;

    return (
      <path
        style={{
          ...path,
          stroke: stroke,
        }}
        d={line(data)}
      />
    );
  }
}
