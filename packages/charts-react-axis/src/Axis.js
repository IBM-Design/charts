import React, { PropTypes } from 'react';
import Tick from './Tick';

/* eslint-disable react/display-name */
const calcLabels = (max, min, tickCount) => {
  return Array.from(Array(tickCount + 1)).map((_, i) => {
    return i * (max - min) / tickCount + min;
  });
};

const renderTickWith = (height, interval, labels, length, type) => (_, i) => {
  const props = type === 'bottom'
    ? {
      dy: 0.71,
      offset: `translate(${interval * i}, 0)`,
      path: `M0,0 L0,-${length}`,
      x: 0.5,
      y: 9,
    }
    : {
      dy: 0.32,
      offset: `translate(0, ${height - (interval * i)})`,
      path: `M0,0 L${length},0`,
      x: -9,
      y: 0.5,
    };

  return (
    <Tick
      key={i}
      label={labels[i].toString()}
      {...props}
    />
  );
};
/* eslint-enable react/display-name */

const Axis = (props, context) => {
  const {
    max,
    min,
    text,
    tickCount,
    type,
  } = props;
  const { chart } = context;
  const length = type === 'bottom'
    ? chart.height
    : chart.width;
  const totalTicks = text
    ? text.length - 1
    : tickCount;
  const interval =  type === 'bottom'
    ? chart.width / totalTicks
    : chart.height / totalTicks;
  const labels = text
    ? text
    : calcLabels(max, min, tickCount);
  const transform = type === 'bottom'
    ? `translate(0,${chart.height})`
    : '';

  const renderTick = renderTickWith(chart.height, interval, labels, length, type);

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

Axis.propTypes = {
  max: PropTypes.number,
  min: PropTypes.number,
  text: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  tickCount: PropTypes.number,
  type: PropTypes.string.isRequired,
};

Axis.contextTypes = {
  chart: PropTypes.object,
};

Axis.defaultProps = {
  min: 0,
  type: 'bottom',
};

export default Axis;
