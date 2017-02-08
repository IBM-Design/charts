import React, { PropTypes } from 'react';

const XTick = (props) => {
  const { label, offset, height } = props;
  const transform = `translate(${offset},0)`;

  return (
    <g className="tick" transform={transform}>
      <path
        d={`M0,0 L0,-${height}`}
        fill="none"
        stroke="#CDDBF1"
        strokeWidth="1"
      />
      <text fill="#000" x="0.5" y="9" dy="0.71em">
        {label}
      </text>
    </g>
  );
};

XTick.propTypes = {
  label: PropTypes.string.isRequired,
  offset: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default XTick;
