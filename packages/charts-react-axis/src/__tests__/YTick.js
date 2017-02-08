import React from 'react';
import renderer from 'react-test-renderer';
import YTick from '../YTick';

describe('YTick Component', () => {
  it('should render', () => {
    const tree = renderer.create(
      <YTick
        label="Label"
        offset={250}
        width={960}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
