import React from 'react';
import renderer from 'react-test-renderer';
import { ChartProvider } from '@ibm-design/charts-react-test-helpers';
import LeftAxis from '../LeftAxis';

describe('LeftAxis Component', () => {
  it('should render', () => {
    const tree = renderer.create(
      <ChartProvider>
        <LeftAxis tickCount={5} />
      </ChartProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
