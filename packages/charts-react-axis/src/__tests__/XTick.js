import React from 'react';
import renderer from 'react-test-renderer';
import XTick from '../XTick';

describe('XTick Component', () => {
  it('should render', () => {
    const tree = renderer.create(
      <XTick offset={250} label="Label" />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
