'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var ibmChart = function ibmChart() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var id = options.id;

  document.querySelector('#' + id).classList.add('chart');

  // Animated grid
  var newWidth = function newWidth() {
    var width = document.querySelector('#' + id).offsetWidth;
    var lines = document.querySelectorAll('#' + id + ' .c3-axis path, #' + id + ' .c3-grid line');

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = lines[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var line = _step.value;

        line.style['stroke-dasharray'] = width;
        line.style['stroke-dashoffset'] = width;
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  };

  var formatAxis = function formatAxis() {
    var axisY = document.querySelector('#' + id + ' .c3-axis-y .domain');
    var pathY = axisY.getAttribute('d').replace('-6', '0').replace('H-6', '');
    axisY.setAttribute('d', pathY);

    // Remove end ticks on x axis
    var axisX = document.querySelector('#' + id + ' .c3-axis-x .domain');
    var pathX = axisX.getAttribute('d').replace('6V', '').replace('V6', '');
    axisX.setAttribute('d', pathX);
  };

  var chart = c3.generate(_extends({
    axis: {
      x: {
        height: 55,
        label: {
          position: 'outer-center',
          text: 'Customers Served'
        },
        padding: {
          left: 0,
          right: 0
        },
        tick: {
          count: 6,
          format: function format(d) {
            var tick = d;
            if (d > 0) {
              tick = d * 10 + 'k';
            }
            return tick;
          }
        }
      },
      y: {
        label: {
          position: 'outer-middle',
          text: 'Reports Filed'
        },
        max: 600,
        min: 0,
        padding: {
          bottom: 0,
          top: 0
        },
        tick: {
          count: 7
        }
      }
    },
    bindto: document.getElementById(id),
    color: {
      pattern: ['#5392FF', '#FF509E', '#FED500']
    },
    grid: {
      x: {
        show: true
      },
      y: {
        show: true
      }
    },
    legend: {
      show: false
    },
    onrendered: function onrendered() {
      formatAxis();
      newWidth();
    },
    onresized: function onresized() {
      newWidth();
    },
    padding: {
      right: 10
    },
    point: {
      show: false
    },
    tooltip: {
      show: false
    }
  }, options));
};