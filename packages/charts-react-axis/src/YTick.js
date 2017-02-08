import React, { PropTypes } from 'react';

const YTick = (props) => {
  const { label, offset, width } = props;
  const transform = `translate(0,${offset})`;

  return (
    <g className="tick" transform={transform}>
      <path
        d={`M0,0 L${width},0`}
        fill="none"
        stroke="#CDDBF1"
        strokeWidth="1"
      />
      <text fill="#000" x="-9" y="0.5" dy="0.32em">
        {label}
      </text>
    </g>
  );
};

YTick.propTypes = {
  label: PropTypes.string.isRequired,
  offset: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
};

export default YTick;
