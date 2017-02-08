import React from 'react';
import renderer from 'react-test-renderer';
import Chart from '../';

describe('Chart Component', () => {
  it('should render', () => {
    const tree = renderer.create(
      <Chart
        height={500}
        margin={{
          top: 20,
          right: 20,
          bottom: 30,
          left: 50,
        }}
        width={960}
        x={{
          text: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        }}
        y={{
          min: 0,
          max: 500,
          tickCount: 5,
        }} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
