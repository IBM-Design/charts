import React, { PropTypes } from 'react';

const XTick = (props) => {
  const { label, offset } = props;
  const transform = `translate(${offset},0)`;

  return (
    <g className="tick" transform={transform}>
      <line stroke="#000" x1="0.5" x2="0.5" y2="6" />
      <text fill="#000" x="0.5" y="9" dy="0.71em">
        {label}
      </text>
    </g>
  );
};

XTick.propTypes = {
  label: PropTypes.string.isRequired,
  offset: PropTypes.number.isRequired,
};

export default XTick;
