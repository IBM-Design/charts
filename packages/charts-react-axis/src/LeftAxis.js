import React, { PropTypes } from 'react';
import YTick from './YTick';

/* eslint-disable react/display-name */
const calcLabels = (max, min, tickCount) => {
  let labels = [];
  for (let i = tickCount; i > -1; i--) {
    labels.push(i * (max - min) / tickCount + min);
  }
  return labels;
};

const renderTickWith = (interval, labels, width) => (_, i) => {
  const offset = interval * i;

  return (
    <YTick
      key={i}
      label={labels[i].toString()}
      offset={offset}
      width={width}
    />
  );
};
/* eslint-enable react/display-name */

const LeftAxis = (props, context) => {
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
  const interval = chart.height / totalTicks;
  const labels = text
    ? text.reverse()
    : calcLabels(max, min, tickCount);
  const renderTick = renderTickWith(interval, labels, chart.width);
  return (
    <g
      className="axis axis--y"
      fill="none"
      fontSize="10"
      fontFamily="sans-serif"
      textAnchor="end">
      {Array.from(Array(totalTicks + 1)).map(renderTick)}
    </g>
  );
};

LeftAxis.propTypes = {
  max: PropTypes.number,
  min: PropTypes.number,
  text: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  tickCount: PropTypes.number,
};

LeftAxis.contextTypes = {
  chart: PropTypes.object,
};

LeftAxis.defaultProps = {
  min: 0,
};

export default LeftAxis;
