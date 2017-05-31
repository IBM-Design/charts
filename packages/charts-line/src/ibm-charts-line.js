/* global c3, _ */
const ibmChart = function(options = {}) {
  const showLegend = options.legend === undefined
    || options.legend.show;
  const showGridAnimation = options.transition === undefined
    || options.transition.animateGrid;
  const showLineEntranceAnimation = options.transition === undefined
    || options.transition.animateLineEntrance;
  const animationDuration = options.transition
    && options.transition.duration !== undefined
    ? options.transition.duration : 250;
  const id = options.id;
  let columns = showLineEntranceAnimation ? options.data.columns.map((column) => {
    return column.map((point) => {
      return typeof point === 'number'
        ? 0
        : point;
    });
  }) : options.data.columns;
  const minWidth = (columns[columns.reduce((p, c, i, a) => a[p].length > c.length ? i : p, 0)].length - 1) * 40;

  document.querySelector(`#${id}`).classList.add('chart');

  const animateGrid = () => {
    const width = document.querySelector(`#${id}`).offsetWidth;
    const lines = document.querySelectorAll(`#${id} .c3-axis path, #${id} .c3-grid line`);
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
    const axisY = document.querySelector(`#${id} .c3-axis-y .domain`);
    const pathY = axisY.getAttribute('d')
      .replace('-6', '0')
      .replace('H-6', '');
    axisY.setAttribute('d', pathY);

    // Remove end ticks on x axis
    const axisX = document.querySelector(`#${id} .c3-axis-x .domain`);
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
      .append('div')
      .attr('class', 'legend__list')
      .selectAll('span')
      .data(columns.map(col => col[0]))
      .enter()
      .append('button')
      .attr('data-id', id => id)
      .attr('class', 'legend__list-item')
      .html(id => `
        <span class="legend__list-dot" style="background-color: ${chart.color(id)}">
        </span>
        ${id}
      `)
      .on('mouseover', id => chart.focus(id))
      .on('focus', id => chart.focus(id))
      .on('mouseout', id => chart.revert())
      .on('blur', id => chart.revert(id))
      .on('click', function(id) {
        const el = d3.select(this);  // eslint-disable-line no-undef
        el.classed('inactive', !el.classed('inactive'));
        chart.toggle(id);
      });
  };

  const layoutLegend = function(width, api) {
    const legend = document.querySelector(`#${id} .legend`);
    if (width <= minWidth) {
      legend.style.left = 0;
      legend.style.position = 'relative';
      api.resize({ width });
    } else {
      legend.style.left = '80%';
      legend.style.position = 'absolute';
      api.resize({ width: width * 0.8 });
    }
  };


  const width = document.querySelector(`#${id}`).offsetWidth;
  const defaults = {  // eslint-disable-line no-undef
    axis: {
      x: {
        height: 55,
        padding: {
          left: 0,
          right: 0,
        },
      },
      y: {
        padding: {
          bottom: 0,
          top: 0,
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
      if (showGridAnimation) {
        formatAxis();
        animateGrid();
      }
      if (options.onrendered) {
        options.onrendered.apply(this, arguments);
      }
    },
    onresized: function() {
      if (showLegend) {
        const width = document.querySelector(`#${id}`).offsetWidth;
        layoutLegend(width, this.api);
      }
      if (showGridAnimation) {
        animateGrid();
      }
      if (options.onresized) {
        options.onresized.apply(this, arguments);
      }
    },
    padding: {
      right: 30,
    },
    point: {
      show: false,
    },
    tooltip: {
      show: false,
    },
    ...(showLegend ? { size: { width: width * 0.8 } } : {}),
  };

  const postDefaults = {
    data: {
      columns,
    },
  };

  ibmChart[id] = c3.generate(_.merge(defaults, options, postDefaults));

  if (showLegend) {
    addLegend(id, ibmChart[id], columns);
    layoutLegend(width, ibmChart[id]);
  }

  // Line entrance animation
  if (showLineEntranceAnimation) {
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
    }, showGridAnimation ? (maxAxisLines - 3) * animationDuration : 0);
  }
};
