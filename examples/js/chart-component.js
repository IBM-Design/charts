/* global d3 */
function ChartComponent() {
  var width = 500
  var height = 500
  var maxTurnover = 1217306928.42753
  var defaultRadius = 3
  var maxTurnoverRadius = width / 30
  var turnoverSlice = [50000000, 250000000, 500000000, 750000000, 1000000000]
  var dashAmountValue = 50000000
  var selectedCompanyName = ''

  function chart(selection) {
    var defaultCircleArea = defaultRadius * defaultRadius * Math.PI
    var scaleTurnover = d3.scaleLinear()
      .domain([0, (defaultCircleArea + maxTurnover)])
      .range([0, (defaultCircleArea + (maxTurnoverRadius * maxTurnoverRadius * Math.PI))])

    var turnoverBackground = selection.selectAll('circle.turnover-background')
      .data(function (d) {
        return [d]
      })
      .style('fill', function (d) {
        return stringNoSpaces(d.class) === stringNoSpaces(selectedCompanyName) ? '#FD7171' : '#64DCCD'
      })

    turnoverBackground
      .enter()
      .append('circle')
      .attr('class', 'turnover-background')
      .style('fill', function (d) {
        return stringNoSpaces(d.class) === stringNoSpaces(selectedCompanyName) ? '#FD7171' : '#64DCCD'
      })
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('r', 0)
      .attr('r', function (d) {
        return [Math.sqrt((scaleTurnover(parseFloat(d.radius)) / Math.PI) + (Math.PI * defaultRadius * defaultRadius))]
      })

    turnoverBackground.exit().remove()

    var turnoverCircles = selection.selectAll('circle.turnover')
      .data(function (d) {
        var turnoverData = []
        for (var i = 0; i < turnoverSlice.length; i++) {
          if (d.radius > turnoverSlice[i]) {
            turnoverData.push((Math.sqrt(scaleTurnover(turnoverSlice[i]) / Math.PI)))
          }
        }
        return turnoverData
      })
      .style('pointer-events', 'none')

    turnoverCircles.enter()
      .append('circle')
      .classed('turnover', true)
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('r', function (d) {
        return d
      })
      .style('pointer-events', 'none')

    turnoverCircles
      .attr('r', function (d) {
        return d
      })

    turnoverCircles.exit().remove()

    var classesNames = ['data_01', 'data_02', 'data_03', 'data_04', 'data_05', 'data_06', 'data_07', 'data_08', 'data_09', 'data_10',
      'data_11', 'data_12', 'data_13', 'data_14', 'data_15', 'data_16', 'data_17', 'data_18']
    var classesAngle = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]

    var scaleClass = d3.scaleLinear()
      .domain([0, maxTurnover])
      .range([0, 150])

    var classesLine = selection.selectAll('line.class-line')
      .data(function (d) {
        var classesLineData = []

        for (var i = 0; i < classesNames.length; i++) {
          var className = classesNames[i]
          var classValue = parseFloat(d[className])
          var dashes = Math.floor(classValue / dashAmountValue) * 5
          var xClass = Math.cos(-(180 / 9 * (classesAngle[i])) * Math.PI / 180) * (scaleClass(classValue) + dashes)
          var yClass = Math.sin(-(180 / 9 * (classesAngle[i])) * Math.PI / 180) * (scaleClass(classValue) + dashes)
          var xStart = (Math.cos(-(180 / 9 * (classesAngle[i])) * Math.PI / 180) * defaultRadius)
          var yStart = (Math.sin(-(180 / 9 * (classesAngle[i])) * Math.PI / 180) * defaultRadius)
          var hasMarker = ((i >= 0 && i <= 3) || (i >= 13))
          classesLineData.push({
            className: classesNames[i],
            classValue: classValue,
            x1: xStart,
            y1: yStart,
            x2: xStart + xClass,
            y2: yStart + yClass,
            hasMarker: hasMarker,
          })
        }
        return classesLineData
      })

    classesLine.enter()
      .append('line')
      .attr('class', function (d) {
        return 'class-line ' + d.className
      })
      .attr('opacity', 0)
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', 0)
      .attr('y2', 0)
      .style('stroke-linecap', function (d) {
        if (d.className.indexOf('canale') === 0) {
          return null
        } else {
          return 'round'
        }
      })
      .attr('marker-end', function (d) {
        if (d.hasMarker) {
          return 'url(#marker-circle)'
        }
      })
      .style('pointer-events', 'none')

    selection.selectAll('circle.top')
      .data([0])
      .enter()
      .append('circle')
      .classed('top', true)
      .attr('cx', 0)
      .attr('cy', 0)
      .style('opacity', 1)
      .attr('r', 10)
      .style('opacity', 0.0)
      .style('pointer-events', 'none')

    selection.selectAll('circle.patent')
      .data([0])
      .enter()
      .append('circle')
      .classed('patent', true)
      .attr('cx', 0)
      .attr('cy', 0)
      .style('opacity', 0)
      .attr('r', 6)
      .style('pointer-events', 'none')
  }

  function stringNoSpaces(str) {
    return str.replace(' ', '').toLowerCase()
  }

  chart.dashAmountValue = function (value) {
    if (!arguments.length) return dashAmountValue
    dashAmountValue = value
    return chart
  }
  chart.turnoverSlice = function (value) {
    if (!arguments.length) return turnoverSlice
    turnoverSlice = value
    return chart
  }
  chart.defaultRadius = function (value) {
    if (!arguments.length) return defaultRadius
    defaultRadius = value
    return chart
  }
  chart.maxTurnoverRadius = function (value) {
    if (!arguments.length) return maxTurnoverRadius
    maxTurnoverRadius = value
    return chart
  }
  chart.maxTurnover = function (value) {
    if (!arguments.length) return maxTurnover
    maxTurnover = value
    return chart
  }
  chart.width = function (value) {
    if (!arguments.length) return width
    width = value
    return chart
  }
  chart.height = function (value) {
    if (!arguments.length) return height
    height = value
    return chart
  }
  chart.company = function (value) {
    if (!arguments.length) return selectedCompanyName
    selectedCompanyName = value
    return chart
  }

  return chart
}
