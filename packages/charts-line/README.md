# IBM Charts - Line
## @ibm-design/charts-line
An implementation of the IBM Design Language's [line chart](https://www.ibm.com/design/language/experience/data-visualization/chart-models/linechart/) using [C3.js](http://c3js.org/).

## Usage
This add-on to C3.js uses the exact same [arguements](http://c3js.org/reference.html). Be sure to add the `ibm-charts-line.css` and `ibm-charts-line.js` files after the D3 and C3 files are referenced:

```
<!DOCTYPE html>
<html>
    <body>
        <div id="myChart"></div>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/c3/0.4.11/c3.min.css" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.0/d3.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/c3/0.4.11/c3.min.js"></script>
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
            });
        </script>
    </body>
</html>
```

To use the [C3.js API](http://c3js.org/reference.html#api-focus), prefix the function with `ibmChart` and then your chart's unique identifier:

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