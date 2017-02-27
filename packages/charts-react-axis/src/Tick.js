import React, { PropTypes } from 'react';

const Tick = (props) => {
  const { dy, label, offset, path, x, y, animation, length } = props;

  return (
    <g className="tick" transform={offset}>
      <path
        d={path}
        fill="none"
        stroke="#CDDBF1"
        strokeWidth="1"
        style={{
          strokeDasharray: length,
          strokeDashoffset: length,
          animation,
        }}
      />
      <text fill="#000" x={x} y={y} dy={`${dy}em`}>
        {label}
      </text>
    </g>
  );
};

Tick.propTypes = {
  dy: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  offset: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  animation: PropTypes.string,
  length: PropTypes.number,
};

export default Tick;
