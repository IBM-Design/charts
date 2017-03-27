const ibmChart = function(options = {}) {
  const animationDuration = 250;
  const id = options.id;
  let columns = options.data.columns.map((column) => {
    return column.map((point) => {
      return typeof point === 'number'
        ? 0
        : point;
    });
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

  const addLegend = function(id, chart, columns) {
    d3.select(`#${id}`) // eslint-disable-line no-undef
      .insert('div', '.chart')
      .attr('class', 'legend')
      .append('h3')
      .attr('class', 'legend__title')
      .text('Legend');
    d3.select('.legend') // eslint-disable-line no-undef
      .append('ul')
      .attr('class', 'legend__list')
      .selectAll('span')
      .data(columns.map(col => col[0]))
      .enter()
      .append('li')
      .attr('data-id', id => id)
      .attr('class', 'legend__list-item')
      .html(id => `
        <span class="legend__list-dot" style="background-color: ${chart.color(id)}">
        </span>
        ${id}
      `)
      .on('mouseover', id => chart.focus(id))
      .on('mouseout', id => chart.revert())
      .on('click', function(id) {
        const el = d3.select(this);  // eslint-disable-line no-undef
        el.classed('inactive', !el.classed('inactive'));
        chart.toggle(id);
      });
  };

  const showLegend = function(options) {
    return !(options.legend !== undefined && !options.legend.show);
  };

  const width = document.querySelector('#' + id).offsetWidth;
  ibmChart[id] = c3.generate({  // eslint-disable-line no-undef
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
    size: {
      width: showLegend(options) ? width * 0.75 : width,
    },
    ...options,
    data: {
      columns,
    },
  });

  if (showLegend(options)) {
    addLegend(id, ibmChart[id], columns);
  }

  // Line entrance animation
  const axisLineCounts = options.data.columns.map((a) => a.length);
  const maxAxisLines = Math.max.apply(Math, axisLineCounts);
  setTimeout(() => {
    let timeIndex = 0;
    const timer = setInterval(() => {
      columns = options.data.columns.map((column, columnIndex) => {
        return column.map((point, pointIndex) => {
          let newPoint = typeof point === 'number'
            ? 0
            : point;

          newPoint = pointIndex <= timeIndex
            ? options.data.columns[columnIndex][pointIndex]
            : newPoint;

          return newPoint;
        });
      });

      ibmChart[id].load({
        columns,
      });

      timeIndex += 1;
      if (timeIndex >= maxAxisLines) {
        clearInterval(timer);
      }
    }, animationDuration);
  }, (maxAxisLines - 3) * animationDuration);
};
