import React, { PropTypes } from 'react';

export default class Chart extends React.PureComponent {
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

  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    margin: PropTypes.shape({
      top: PropTypes.number,
      right: PropTypes.number,
      bottom: PropTypes.number,
      left: PropTypes.number,
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
    const { children, className, width, height, margin } = this.props;
    const transform = `translate(${margin.left},${margin.top})`;

    return (
      <svg
        width={width}
        height={height}
        className={className}>
        <g transform={transform}>
          {children}
        </g>
      </svg>
    );
  }
}
