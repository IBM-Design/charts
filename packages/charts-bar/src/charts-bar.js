/* eslint-disable */

(function(){
  var chart = c3.generate({
      bindto: '.ibm-chart__chart',
      data: {
        columns: [
          ['Abby', 127, 80, 29, 127, 175],
          ['James', 120, 50, 59, 100, 203],
          ['Stephane', 120, 50, 59, 100, 203],
          ['Sean', 80, 29, 127, 175, 127],
        ],
        type: 'bar',
      },
      legend: {
        show: true,
        position: 'right'
      },
      bar: {
        width: {
          ratio: 0.2667
        }
      },
      axis: {
        x: {
          label: {
            text: 'Food Types',
            position: 'outer-center'
          },

          tick: {
            outer: false
          },
          type: 'category',
          categories: ['Coffee', 'Tea', 'Hot Chocolate', 'Biscuits', 'Fun']
        },
        y: {
           label: {
            text: 'Budget Allocation (£)',
            position: 'outer-middle'
           },
           tick: {
             values: [0, 50, 100, 150, 200],
             outer: false
           }
        }
      },
      grid: {
        x: {
          show: true
        },
        y: {
          show: true,
        }
      },
      color: {
        pattern: ['#5392ff', '#ffb000', '#71cddd', '#fe8500', '#34bc6e']
      }
  });

})();
