import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { extent } from 'd3-array';
import { timeParse } from 'd3-time-format';
import { scaleLinear, scaleTime } from 'd3-scale';
import LineChart from './LineChart';
import rawData from '../data/stock.csv';

const parseTime = timeParse('%d-%b-%y');
const data = rawData.map((d) => ({
  date: parseTime(d.date),
  close: +d.close,
}));

// TODO: coerce scales from values?
// TODO: specify property name for x/y props versus function allocation
storiesOf('LineChart', module)
  .add('default', () => (
    <LineChart
      lines={[data]}
      legend={{
        title: 'Legend',
        width: 200,
        labels: [
          { text: 'Category 1', color: '#648fff' },
          { text: 'Category 2' },
        ],
      }}
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
          animation: (i) => `dashoffset 0.4s linear ${0.3 + i / 20}s forwards`,
        },
        {
          min: 0,
          max: 500,
          tickCount: 5,
          animation: (i) => `dashoffset 0.4s linear ${i / 10}s forwards`,
        },
      ]}
    />
  ));
