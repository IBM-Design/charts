import React from 'react';
import renderer from 'react-test-renderer';
import YTick from '../YTick';

describe('YTick Component', () => {
  it('should render', () => {
    const tree = renderer.create(
      <YTick offset={250} label="Label" />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
