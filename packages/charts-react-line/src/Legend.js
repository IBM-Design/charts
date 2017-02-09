import React, { PropTypes } from 'react';

export default class Legend extends React.PureComponent {

  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    labels: PropTypes.array,
    width: PropTypes.number,
    // eslint-disable-next-line react/forbid-prop-types
    style: PropTypes.object,
  }
  static defaultProps = {}


  render() {
    const { labels } = this.props;

    return (
      <div className="legend" style={this.getStyles(this.props)}>
        <h4 style={{ margin: '0 0 10px' }}>Legend</h4>
        <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
          {labels.map(this.renderLabel)}
        </ul>
      </div>
    );
  }

  renderLabel(item, i) {
    return (
      <li
        style={{marginBottom: 10}}
        key={i}>
        <span
          style={{
            width: 12,
            height: 12,
            marginRight: 10,
            background: '#AAA',
            display: 'inline-block',
            borderRadius: '50%',
          }}
        />
        {item}
      </li>
    );
  }

  getStyles(props) {
    return {
      width: props.width,
      float: 'right',
      padding: 20,
      ...props.style,
    };
  }
}
