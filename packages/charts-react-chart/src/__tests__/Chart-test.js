import React from 'react';
import renderer from 'react-test-renderer';
import Chart from '../';

describe('Chart Component', () => {
  it('should render', () => {
    const tree = renderer.create(
      <Chart />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
