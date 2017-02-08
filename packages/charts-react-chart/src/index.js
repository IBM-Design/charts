import React, { PropTypes } from 'react';
import { BottomAxis, LeftAxis } from '@ibm-design/charts-react-axis';

export default class Chart extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    width: PropTypes.number,
    height: PropTypes.number,
    margin: PropTypes.shape({
      top: PropTypes.number,
      right: PropTypes.number,
      bottom: PropTypes.number,
      left: PropTypes.number,
    }),
    x: PropTypes.shape({
      max: PropTypes.number,
      min: PropTypes.number,
      text: PropTypes.array, // eslint-disable-line react/forbid-prop-types
      tickCount: PropTypes.number,
    }),
    y: PropTypes.shape({
      max: PropTypes.number,
      min: PropTypes.number,
      text: PropTypes.array, // eslint-disable-line react/forbid-prop-types
      tickCount: PropTypes.number,
    }),
  }

  // Let's place the container styling in context for layout
  static childContextTypes = {
    chart: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number,
      margin: PropTypes.shape({
        top: PropTypes.number,
        right: PropTypes.number,
        bottom: PropTypes.number,
        left: PropTypes.number,
      }),
    }),
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

  getChildContext() {
    const { width, height, margin } = this.props;

    return {
      chart: {
        // Calculate available width/height for child layout
        width: width - margin.left - margin.right,
        height: height - margin.top - margin.bottom,
        margin,
      },
    };
  }

  render() {
    const { children, className, width, height, margin, x, y } = this.props;
    const transform = `translate(${margin.left},${margin.top})`;

    return (
      <svg
        width={width}
        height={height}
        className={className}>
        <g transform={transform}>
          <LeftAxis
            {...y}
          />
          <BottomAxis
            {...x}
          />
          {children}
        </g>
      </svg>
    );
  }
}
