import React, { PropTypes } from 'react';
import * as shape from 'd3-shape';
import Chart from '@ibm-design/charts-react-chart';
import Colors from 'ibm-design-colors/ibm-colors';
import Line from './Line';
import Legend from './Legend';

export default class LineChart extends React.PureComponent {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    lines: PropTypes.array.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    legend: PropTypes.shape({
      title: PropTypes.string,
      labels: PropTypes.array,
      width: PropTypes.number,
    }),
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
    legend: {
      labels: [],
      width: 200,
    },
    margin: {
      top: 20,
      right: 20,
      bottom: 30,
      left: 50,
    },
    strokes: [
      Colors.blue['40'],
      Colors.aqua['20'],
      Colors.green['30'],
      Colors.lime['20'],
      Colors.gold['20'],
      Colors.peach['30'],
      Colors.magenta['40'],
      Colors.indigo['40'],
    ],
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
    const { grid, height, legend, margin, strokes, width } = props;
    const isLegendVisible = !!legend.labels.length;
    const legendWidth = isLegendVisible ? (legend.width || 200) : 0;
    const lines = this.props.lines.map((data, index) =>
      <Line
        line = {line}
        data = {data}
        key={index}
        stroke={strokes[index % strokes.length]}
      />
    );

    return (
      <div style={{width}}>
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes dash {
            to { stroke-dashoffset: 0; }
          }
        `}}
        />
        {isLegendVisible &&
          <Legend
            labels={legend.labels}
            width={legendWidth}
            title={legend.title}
          />
        }
        <Chart
          height={height}
          margin={margin}
          width={width - legendWidth}
          x={grid[0]}
          y={grid[1]}>
          {lines}
        </Chart>
      </div>
    );
  }
}
