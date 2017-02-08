import React from 'react';
import renderer from 'react-test-renderer';
import XTick from '../XTick';

describe('XTick Component', () => {
  it('should render', () => {
    const tree = renderer.create(
      <XTick
        height={500}
        label="Label"
        offset={250}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
