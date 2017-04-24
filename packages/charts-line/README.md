# IBM Charts - Line
## @ibm-design/charts-line
An implementation of the IBM Design Language's [line chart](https://www.ibm.com/design/language/experience/data-visualization/chart-models/linechart/) using [C3.js](http://c3js.org/).

![Line chart transitioning in](/packages/charts-line/charts-line.gif?raw=true "IBM Line Chart")


## Install
This project is currently in beta. Revisions to the visual style need to be made. If you find other problems, please make a pull request to help us out.

`npm install @ibm-design/charts-line`

or

`yarn add @ibm-design/charts-line`

## Usage
This add-on to C3.js uses the exact same [arguments](http://c3js.org/reference.html). Be sure to add the `ibm-charts-line.css` and `ibm-charts-line.js` files after the D3 and C3 files are referenced:

```
<!DOCTYPE html>
<html>
    <body>
        <div id="myChart"></div>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/c3/0.4.11/c3.min.css" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.0/d3.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/c3/0.4.11/c3.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.4/lodash.min.js"></script>
        <link rel="stylesheet" href="PATH-TO-YOUR/lib/ibm-charts-line.css" />
        <script src="PATH-TO-YOUR/lib/ibm-charts-line.js"></script>
        <script>
            ibmChart({
              data: {
                columns: [
                  ['data1', 200, 300, 150, 400, 275, 360],
                  ['data2', 210, 170, 240, 120, 160, 130],
                  ['data3', 370, 350, 375, 340, 350, 340],
                ],
              },
              id: 'myChart',
              axis: {
                x: {
                  tick: {
                    format: (d) => {
                      let tick = d;
                      if (d > 0) {
                        tick = (d * 10) + 'k';
                      }
                      return tick;
                    },
                  },
                },
                y: {
                  min: 0,
                  max: 600,
                  tick: {
                    count: 7,
                  },
                }
              },
            });
        </script>
    </body>
</html>
```

To use the [C3.js API](http://c3js.org/reference.html#api-focus), call it through `ibmChart` and your chart's unique identifier:

```
var newData = [
    ['data1', 200, 300, 150, 400, 275, 360],
    ['data2', 210, 170, 240, 120, 160, 130],
    ['data3', 370, 350, 375, 340, 350, 340],
];

ibmChart.myChart.load({
    columns: newData,
});
```
