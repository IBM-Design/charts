import React from 'react';
import PropTypes from 'prop-types';

const YTick = (props) => {
  const { label, offset } = props;
  const transform = `translate(0,${offset})`;

  return (
    <g className="tick" transform={transform}>
      <line stroke="#000" x2="-6" y1="0.5" y2="0.5" />
      <text fill="#000" x="-9" y="0.5" dy="0.32em">
        {label}
      </text>
    </g>
  );
};

YTick.propTypes = {
  label: PropTypes.string.isRequired,
  offset: PropTypes.number.isRequired,
};

export default YTick;
