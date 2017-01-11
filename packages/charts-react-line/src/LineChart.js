import React, { PropTypes } from 'react';
import * as shape from 'd3-shape';

const path = {
  fill: 'none',
  stroke: '#5392ff',
  strokeWidth: 1.5,
};

export default class LineChart extends React.PureComponent {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    data: PropTypes.array.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
    margin: PropTypes.shape({
      top: PropTypes.number,
      right: PropTypes.number,
      bottom: PropTypes.number,
      left: PropTypes.number,
    }),
    x: PropTypes.func,
    y: PropTypes.func,
    scaleX: PropTypes.func,
    scaleY: PropTypes.func,
    // eslint-disable-next-line react/forbid-prop-types
    domainX: PropTypes.array,
    // eslint-disable-next-line react/forbid-prop-types
    domainY: PropTypes.array,
  }

  static defaultProps = {
    width: 960,
    height: 500,
    margin: {
      top: 20,
      right: 20,
      bottom: 30,
      left: 50,
    },
  }

  componentWillMount() {
    const {
      width,
      height,
      margin,
      x,
      y,
      scaleX,
      scaleY,
      domainX,
      domainY,
    } = this.props;

    this.width = width - margin.left - margin.right;
    this.height = height - margin.top - margin.bottom;

    this.x = scaleX()
      .rangeRound([0, this.width])
      .domain(domainX);

    this.y = scaleY()
      .rangeRound([this.height, 0])
      .domain(domainY);

    this.line = shape.line()
      .x((d) => this.x(x(d)))
      .y((d) => this.y(y(d)));
  }

  render() {
    const { line, props } = this;
    const { data, margin, width, height } = props;
    const containerOffset = {
      transform: `translate(${margin.left}px, ${margin.top}px)`,
    };

    return (
      <svg width={width} height={height}>
        <g style={containerOffset}>
          <path style={path} d={line(data)} />
        </g>
      </svg>
    );
  }
}
