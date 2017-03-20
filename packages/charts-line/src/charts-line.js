const ibmChart = function(options = {}) {
  const id = options.id;

  // Animated grid
  const newWidth = function() {
    const width = document.querySelector('#' + id).offsetWidth;
    const lines = document.querySelectorAll('#' + id + ' .c3-axis path, #' + id + ' .c3-grid line');

    for (var line of lines) {
      line.style['stroke-dasharray'] = width;
      line.style['stroke-dashoffset'] = width;
    }
  };

  const formatAxis = function() {
    const axisY = document.querySelector('#' + id + ' .c3-axis-y .domain');
    const pathY = axisY.getAttribute('d')
      .replace('-6', '0')
      .replace('H-6', '');
    axisY.setAttribute('d', pathY);

    // Remove end ticks on x axis
    const axisX = document.querySelector('#' + id + ' .c3-axis-x .domain');
    const pathX = axisX.getAttribute('d')
      .replace('6V', '')
      .replace('V6', '');
    axisX.setAttribute('d', pathX);
  };

  const chart = c3.generate({
    axis: {
      x: {
        height: 55,
        label: {
          position: 'outer-center',
          text: 'Customers Served',
        },
        padding: {
          left: 0,
          right: 0,
        },
        tick: {
          count: 6,
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
        label: {
          position: 'outer-middle',
          text: 'Reports Filed',
        },
        max: 600,
        min: 0,
        padding: {
          bottom: 0,
          top: 0,
        },
        tick: {
          count: 7,
        },
      },
    },
    bindto: document.getElementById(id),
    color: {
      pattern: ['#5392FF', '#FF509E', '#FED500'],
    },
    grid: {
      x: {
        show: true,
      },
      y: {
        show: true,
      },
    },
    legend: {
      show: false,
    },
    onrendered: function() {
      formatAxis();
      newWidth();
    },
    onresized: function() {
      newWidth();
    },
    padding: {
      right: 10,
    },
    point: {
      show: false,
    },
    tooltip: {
      show: false,
    },
    ...options,
  });
};

document.addEventListener('DOMContentLoaded', function() {
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
}, false);
