import React, { PropTypes } from 'react';

export default class Legend extends React.PureComponent {

  static propTypes = {
    labels: PropTypes.shape({
      text: PropTypes.string,
      color: PropTypes.string,
    }),
    width: PropTypes.number,
    // eslint-disable-next-line react/forbid-prop-types
    style: PropTypes.object,
  }

  static defaultProps = {
    width: 200,
  }

  render() {
    const { labels, style, width } = this.props;

    return (
      <div className="legend" style={{
        width,
        float: 'right',
        padding: 20,
        ...style,
      }}>
        <h4 style={{ margin: '0 0 10px' }}>Legend</h4>
        <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
          {labels.map(this.renderLabel)}
        </ul>
      </div>
    );
  }

  renderLabel({text, color}, i) {
    return (
      <li
        style={{marginBottom: 10}}
        key={i}>
        <span
          style={{
            width: 12,
            height: 12,
            marginRight: 10,
            background: color || '#AAA',
            display: 'inline-block',
            borderRadius: '50%',
          }}
        />
        {text}
      </li>
    );
  }
}
