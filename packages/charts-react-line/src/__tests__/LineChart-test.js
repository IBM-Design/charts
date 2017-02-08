import React from 'react';
import { extent } from 'd3-array';
import { timeParse } from 'd3-time-format';
import { scaleLinear, scaleTime } from 'd3-scale';
import renderer from 'react-test-renderer';
import LineChart from '../LineChart';

const parseTime = timeParse('%d-%b-%y');
const data = [
  {
    close: 422.40,
    date: parseTime('6-Jan-12'),
  },
];

describe('LineChart Component', () => {
  it('should render', () => {
    const tree = renderer.create(
      <LineChart
        lines={[data]}
        width={960}
        height={500}
        margin={{
          top: 20,
          right: 20,
          bottom: 30,
          left: 50,
        }}
        scaleX={scaleTime}
        scaleY={scaleLinear}
        domainX={extent(data, (d) => d.date)}
        domainY={extent(data, (d) => d.close)}
        x={(d) => d.date}
        y={(d) => d.close}
        grid={[
          {
            text: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          },
          {
            min: 0,
            max: 500,
            tickCount: 5,
          },
        ]}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
