import React, { PropTypes } from 'react';
import YTick from './YTick';

const pathStyle = {
  fill: 'none',
  strokeWidth: 1,
  shapeRendering: 'crispEdges',
};

/* eslint-disable react/display-name */
const renderTickWith = (interval) => (_, i) => {
  const offset = interval * (i + 1);

  return (
    <YTick
      key={i}
      label="Label"
      offset={offset}
    />
  );
};
/* eslint-enable react/display-name */

const LeftAxis = (props, context) => {
  const { tickCount } = props;
  const { chart } = context;

  const path = `M-6,${chart.height}H0V0.5H-6`;
  const interval = chart.height / tickCount;
  const renderTick = renderTickWith(interval);

  return (
    <g
      className="axis axis--y"
      fill="none"
      fontSize="10"
      fontFamily="sans-serif"
      textAnchor="end">
      <path className="domain" d={path} stroke="#000" style={pathStyle} />
      {Array.from(Array(tickCount - 1)).map(renderTick)}
    </g>
  );
};

LeftAxis.propTypes = {
  tickCount: PropTypes.number,
};

LeftAxis.contextTypes = {
  chart: PropTypes.object,
};

export default LeftAxis;
