import React from 'react';
import renderer from 'react-test-renderer';
import Tick from '../Tick';

describe('Tick Component', () => {
  it('should render', () => {
    const tree = renderer.create(
      <Tick
        dy={0.71}
        height={500}
        label="Label"
        offset="translate(0, 0)"
        path="M0,0 L0,-500"
        x={0.5}
        y={9}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
