import React, { PropTypes } from 'react';

export default class Legend extends React.PureComponent {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    categories: PropTypes.array.isRequired,
    offset: PropTypes.number,
  }
  static defaultProps = {
    offset: 0,
  }

  render() {
    const { categories, offset } = this.props;
    const transform = `translate(${offset}, 0)`;

    return (
      <g className="legend" transform={transform}>
        <text fill="#000" x="0.5" y="0" dy="0.71em">
          Legend
        </text>
        {categories.map(this.renderCategories)}
      </g>
    );
  }

  renderCategories(item, i) {
    return (
      <text
        key={i}
        fill="#000"
        x="20"
        y={20 * (i + 1)}
        dy="0.71em"
        children={item}
      />
    );
  }
}
