import React from 'react';
import renderer from 'react-test-renderer';
import { ChartProvider } from '@ibm-design/charts-react-test-helpers';
import Axis from '../Axis';

describe('Axis Component', () => {
  it('should render', () => {
    const tree = renderer.create(
      <ChartProvider>
        <Axis tickCount={5} />
      </ChartProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
