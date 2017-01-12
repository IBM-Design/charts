import React from 'react';
import renderer from 'react-test-renderer';
import { ChartProvider } from '@ibm-design/charts-react-test-helpers';
import BottomAxis from '../BottomAxis';

describe('BottomAxis Component', () => {
  it('should render', () => {
    const tree = renderer.create(
      <ChartProvider>
        <BottomAxis tickCount={5} />
      </ChartProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
