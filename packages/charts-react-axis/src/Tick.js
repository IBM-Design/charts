import React, { PropTypes } from 'react';

const Tick = (props) => {
  const { dy, label, offset, path, x, y } = props;

  return (
    <g className="tick" transform={offset}>
      <path
        d={path}
        fill="none"
        stroke="#CDDBF1"
        strokeWidth="1"
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
};

export default Tick;
