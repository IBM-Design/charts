import React, { PropTypes } from 'react';
import XTick from './XTick';

/* eslint-disable react/display-name */
const calcLabels = (max, min, tickCount) => {
  let labels = [];
  for (let i = 0; i < tickCount + 1; i++) {
    labels.push(i * (max - min) / tickCount + min);
  }
  return labels;
};

const renderTickWith = (interval, labels, height) => (_, i) => {
  const offset = interval * i;

  return (
    <XTick
      height={height}
      key={i}
      label={labels[i].toString()}
      offset={offset}
    />
  );
};
/* eslint-enable react/display-name */

const BottomAxis = (props, context) => {
  const {
    max,
    min,
    text,
    tickCount,
  } = props;
  const { chart } = context;
  const totalTicks = text
    ? text.length - 1
    : tickCount;
  const interval = chart.width / totalTicks;
  const labels = text
    ? text
    : calcLabels(max, min, tickCount);
  const transform = `translate(0,${chart.height})`;
  const renderTick = renderTickWith(interval, labels, chart.height);

  return (
    <g
      className="axis axis--x"
      fill="none"
      fontSize="10"
      fontFamily="sans-serif"
      textAnchor="middle"
      transform={transform}>
      {Array.from(Array(totalTicks + 1)).map(renderTick)}
    </g>
  );
};

BottomAxis.propTypes = {
  max: PropTypes.number,
  min: PropTypes.number,
  text: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  tickCount: PropTypes.number,
};

BottomAxis.contextTypes = {
  chart: PropTypes.object,
};

BottomAxis.defaultProps = {
  min: 0,
};

export default BottomAxis;
