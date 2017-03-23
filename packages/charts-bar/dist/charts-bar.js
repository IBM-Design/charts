/* eslint-disable */

(function(){
var chart = c3.generate({
    interaction: {
      enabled: false
    },
    bindto: '.ibm-chart__chart',
    data: {
      columns: [
        ['data1', 127, 80, 29, 127, 175]
      ],
      type: 'bar'
    },
    legend: {
      show: false
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
      pattern: ['#00BAA1']
    }
});


})();
