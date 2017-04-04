const ibmChart = function(options = {}) {
  const id = options.id;
  document.querySelector('#' + id).classList.add('chart');

  const animateGrid = function() {
    const width = document.querySelector('#' + id).offsetWidth;
    const lines = document.querySelectorAll(
                        '#' + id + ' .c3-axis path, #' + id + ' .c3-grid line');
    const linesX = [];
    const linesY = [];

    for (let i = 0; i < lines.length; i++) {
      switch (lines[i].classList[0]) {
        case 'c3-xgrid':
          linesX.push(lines[i]);
          break;
        case 'c3-ygrid':
          linesY.push(lines[i]);
          break;
      }
    }

    const addAnimation = (lines, grid) => {
      for (let i = 0; i < lines.length; i++) {
        lines[i].style['stroke-dasharray'] = width;
        lines[i].style['stroke-dashoffset'] = grid === 'y' ? width : -width;
        lines[i].style['animation-delay'] = `${i * 200 + 100}ms`;
      }
      return;
    };

    addAnimation(linesX, 'x');
    addAnimation(linesY, 'y');
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

  ibmChart[id] = c3.generate({   // eslint-disable-line no-undef
    axis: {
      x: {
        type: 'category',
        categories: ['Coffee', 'Tea', 'Hot Chocolate', 'Biscuits', 'Fun'],
        height: 55,
        label: {
          position: 'outer-center',
          text: 'Food Types',
        },
        padding: {
          left: 0,
          right: 0,
        },
        tick: {
          count: 5,
        },
      },
      y: {
        label: {
          position: 'outer-middle',
          text: 'Budget Allocation (£)',
        },
        max: 200,
        min: 0,
        padding: {
          bottom: 0,
          top: 0,
        },
        tick: {
          count: 5,
        },
      },
    },
    bar: {
      width: {
        ratio: 0.2667,
      },
    },
    bindto: document.getElementById(id),
    color: {
      pattern: ['#5392FF'],
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
      animateGrid();
    },
    onresized: function() {
      animateGrid();
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
