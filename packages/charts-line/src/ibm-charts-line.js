const ibmChart = function(options = {}) {
  const animationDuration = 250;
  const id = options.id;
  let columns = options.data.columns.map((column) => {
    return column.map((point) => {
      return typeof point === 'number'
        ? 0
        : point
    })
  });

  document.querySelector('#' + id).classList.add('chart');

  const animateGrid = () => {
    const width = document.querySelector('#' + id).offsetWidth;
    const lines = document.querySelectorAll('#' + id + ' .c3-axis path, #' + id + ' .c3-grid line');
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
        lines[i].style['animation-delay'] = `${i * animationDuration}ms`;
        lines[i].style['animation-duration'] = `${animationDuration}ms`;
        lines[i].style['stroke-dasharray'] = width;
        lines[i].style['stroke-dashoffset'] = grid === 'y'
          ? width
          : -width;
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

  ibmChart[id] = c3.generate({
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
    data: {
      columns
    }
  });


  // Line entrance animation
  const axisLineCounts = options.data.columns.map(function(a){return a.length;});
  const maxAxisLines = Math.max.apply(Math, axisLineCounts) - 3;
  setTimeout(() => {
    let timeIndex = 0;
    const timer = setInterval(() => {
      let lengths = options.data.columns.map(function(a){return a.length;});
      lengths.indexOf(Math.max.apply(Math, lengths));

      columns = options.data.columns.map((column, columnIndex) => {
        return column.map((point, pointIndex) => {
          let newPoint = typeof point === 'number'
            ? 0
            : point;

          newPoint = pointIndex <= timeIndex
            ? options.data.columns[columnIndex][pointIndex]
            : newPoint;

          return newPoint;
        })
      });

      ibmChart[id].load({
        columns,
      });

      timeIndex = timeIndex + 1;
      if (timeIndex >= Math.max.apply(null, lengths)) {
        clearInterval(timer);
      }
    }, animationDuration);
  }, maxAxisLines * animationDuration);
};
