import React, { PropTypes } from 'react';

const path = {
  fill: 'none',
  stroke: '#000',
  strokeWidth: 1.5,
};

export default class Line extends React.PureComponent {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    data: PropTypes.array.isRequired,
    line: PropTypes.func.isRequired,
    stroke: PropTypes.string,
  }

  render() {
    const { data, line } = this.props,
      stroke = this.props.stroke ? this.props.stroke : path.stroke;

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
