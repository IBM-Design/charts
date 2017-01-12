import React, { PropTypes } from 'react';
import XTick from './XTick';

const pathStyle = {
  fill: 'none',
  strokeWidth: 1,
  shapeRendering: 'crispEdges',
};

const renderTickWith = (interval) => (_, i) => {
  const offset = interval * (i + 1);
  // TODO: Label
  // const label = x(offset);

  return (
    <XTick
      key={i}
      label="Label"
      offset={offset}
    />
  );
};

const BottomAxis = (props, context) => {
  const { tickCount } = props;
  const { chart } = context;

  const path = `M0,6V0H${chart.width}V6`;
  const interval = chart.width / tickCount;
  const transform = `translate(0,${chart.height})`;

  const renderTick = renderTickWith(interval);

  return (
    <g
      className="axis axis--x"
      fill="none"
      fontSize="10"
      fontFamily="sans-serif"
      textAnchor="middle"
      transform={transform}>
      <path className="domain" d={path} stroke="#000" style={pathStyle} />
      {Array.from(Array(tickCount - 1)).map(renderTick)}
    </g>
  );
};

BottomAxis.propTypes = {
  tickCount: PropTypes.number,
};

BottomAxis.contextTypes = {
  chart: PropTypes.object,
};

export default BottomAxis;
