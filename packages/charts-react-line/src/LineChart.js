import React, { PropTypes } from 'react';
import * as shape from 'd3-shape';
import { palettes } from '@ibm-design/charts-colors';
import Chart from '@ibm-design/charts-react-chart';
import { LeftAxis, BottomAxis } from '@ibm-design/charts-react-axis';
import Line from './Line';

export default class LineChart extends React.PureComponent {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    lines: PropTypes.array.isRequired,
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
    // eslint-disable-next-line react/forbid-prop-types
    strokes: PropTypes.array,
  }

  static contextTypes = {
    chart: PropTypes.any,
  }

  static defaultProps = {
    lines: [],
    width: 960,
    height: 500,
    margin: {
      top: 20,
      right: 20,
      bottom: 30,
      left: 50,
    },
    strokes: palettes.qualitative,
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
    const { margin, strokes, width, height } = props;
    const lines = this.props.lines.map((data, index) =>
      <Line
        line = {line}
        data = {data}
        key={index}
        stroke={strokes[index % strokes.length]}
      />
    );

    return (
      <Chart width={width} height={height} margin={margin}>
        <LeftAxis tickCount={5} />
        <BottomAxis tickCount={5} />
        {lines}
      </Chart>
    );
  }
}
