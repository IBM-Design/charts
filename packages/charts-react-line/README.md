# `@ibm-design/charts-react-line`

### Usage

```bash
yarn add @ibm-design/charts-react-line
```

### Example
```jsx
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
```
