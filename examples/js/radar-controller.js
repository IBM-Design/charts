/* global d3 _ */
(function () {
  var radarMargin = {
    top: 100,
    right: 100,
    bottom: 100,
    left: 100,
  }
  var radarWidth = Math.min(550, window.innerWidth - 10) - radarMargin.left - radarMargin.right
  var radarHeight = Math.min(radarWidth, window.innerHeight - radarMargin.top - radarMargin.bottom - 20)
  var radarColorscale = ['#8ED3C8', '#9772B1', '#FDE390']
  var radarColorscaleObject = {'EMEA': '#8ED3C8', 'Americas': '#9772B1', 'APAC': '#FDE390'}
  var LegendOptions = {
    'EMEA': {
      name: 'EMEA',
      active: true,
    },
    'Americas': {
      name: 'Americas',
      active: true,
    },
    'APAC': {
      name: 'APAC',
      active: true,
    },
  }

  var radarChart
  var summedByDateArray
  var summedArray
  var newMinCoex = 0
  var newMaxCoex = 30

  var barchartG
  var barchartDataset
  var barchartWidth
  var barchartHeight
  var heightScale
  var dataset

  var group
  var immutableScaleX
  var scaleX

  var Format = d3.format(',d')

  d3.json('../json/radar-dataset.json', function (radarDataset) {
    dataset = radarDataset
    initData(radarDataset, true)
    drawLegend()
    drawBarchart()
    drawSlider()
  })

  function initData(dataset, init) {
    summedByDateArray = []
    summedArray = []
    var groupedByArea = _.groupBy(dataset, 'area')
    var groupedByDate = _.toArray(_.groupBy(dataset, 'date'))

    _.forEach(groupedByDate, function (d) {
      var summed = _.reduce(d, function (result, value, key) {
        result.value = (result.value || 0) + value.value
        result.area = value.area
        result.axis = value.axis
        result.date = value.date
        return result
      }, {})
      summedByDateArray.push(summed)
    }, {})

    _.forEach(groupedByArea, function (value) {
      var groupedByCategory = _.toArray(_.groupBy(value, 'axis'))
      groupedByCategory.map(function (d, i) {
        var summed = _.reduce(d, function (result, value, key) {
          result.value = (result.value || 0) + value.value
          result.area = value.area
          result.axis = value.axis
          result.date = value.date
          return result
        }, {})
        summed.value = summed.value / (newMaxCoex - newMinCoex + 1)
        summedArray.push(summed)
      })
    }, {})

    var groupedSummedByArea = _.toArray(_.groupBy(summedArray, 'area'))
    var radarChartOptions = {
      w: radarWidth,
      h: radarHeight,
      margin: radarMargin,
      maxValue: 0.5,
      levels: 5,
      roundStrokes: true,
      color: radarColorscale,
    }

    if (init) {
      radarChart = new RadarChart(".radarChart", groupedSummedByArea, radarChartOptions)
    } else {
      radarChart.updateData(groupedSummedByArea)
    }
  }

  function drawLegend() {
    var svgLegend = d3.select('.legend')
    .append('svg')
    .classed('svgLegend', true)
    .attr("width", 100)
    .attr("height", 100)

    var legendG = svgLegend
    .selectAll('g.legend')
    .data(_.values(LegendOptions))
    .enter()
    .append("g")
    .attr("class", "legend")
    .attr('transform', function (d, i) {
      return 'translate(0, ' + (20 * i) + ')'
    })

    var legendRect = legendG.selectAll('rect.legendRect')
    .data(function (d, i) { return [d] })

    legendRect
    .enter()
    .append("rect")
    .attr("class", "legendRect")
    .attr("x", 20)
    .attr("y", function (d, i) {
      return i * 25 + 1
    })
    .attr("width", 16)
    .attr("height", 16)
    .style("fill", function (d, i) {
      return radarColorscaleObject[d.name]
    })

    var legendText = legendG.selectAll('text.legendText')
    .data(function (d, i) { return [d] })

    legendText
    .enter()
    .append("text")
    .attr("class", function (d, i) {
      return "legendText " + d.name
    })
    .attr("x", 40)
    .attr("y", function (d, i) {
      return i * 28 + 14
    })
    .attr("font-size", "14px")
    .attr("fill", function (d, i) {
      return d.active ? '#5F92CD' : '#cccccc'
    })
    .style('cursor', 'pointer')
    .text(function (d) {
      return d.name
    })
    .on('click', function (d, i) {
      LegendOptions[d.name].active = !LegendOptions[d.name].active
      if (LegendOptions[d.name].active) {
        d3.selectAll('.radarArea.' + d.name)
            .style('display', 'block')

        d3.selectAll('.legendText.' + d.name)
            .style('opacity', 1)

        d3.selectAll('.radarCircle.' + d.name)
            .style('display', 'block')

        d3.selectAll('.checkboxPath.' + d.name)
            .style('display', 'block')
      } else {
        d3.selectAll('.radarArea.' + d.name)
            .style('display', 'none')

        d3.selectAll('.legendText.' + d.name)
            .style('opacity', 0.2)

        d3.selectAll('.radarCircle.' + d.name)
            .style('display', 'none')

        d3.selectAll('.checkboxPath.' + d.name)
            .style('display', 'none')
      }
    })

    var checkboxRect = legendG.selectAll('rect.checkboxRect')
    .data(function (d, i) { return [d] })

    checkboxRect
      .enter()
      .append("rect")
      .attr("class", "checkboxRect")
      .attr("x", 20)
      .attr("y", function (d, i) {
        return i * 25 + 1
      })
      .attr("width", 16)
      .attr("height", 16)
      .attr("stroke-width", 0)
      .attr("stroke", "#5F92CD")
      .attr("cursor", "pointer")
      .attr("fill-opacity", 0)
      .on('click', function (d, i) {
        LegendOptions[d.name].active = !LegendOptions[d.name].active
        if (LegendOptions[d.name].active) {
          d3.selectAll('.radarArea.' + d.name)
              .style('display', 'block')

          d3.selectAll('.legendText.' + d.name)
              .style('opacity', 1)

          d3.selectAll('.radarCircle.' + d.name)
              .style('display', 'block')

          d3.selectAll('.checkboxPath.' + d.name)
              .style('display', 'block')
        } else {
          d3.selectAll('.radarArea.' + d.name)
              .style('display', 'none')

          d3.selectAll('.legendText.' + d.name)
              .style('opacity', 0.2)

          d3.selectAll('.radarCircle.' + d.name)
              .style('display', 'none')

          d3.selectAll('.checkboxPath.' + d.name)
              .style('display', 'none')
        }
      })

    var checkboxPath = legendG.selectAll('path.checkboxPath')
      .data(function (d, i) { return [d] })

    checkboxPath
      .enter()
      .append("path")
      .attr("class", function (d) {
        return "checkboxPath " + d.name
      })
      .attr("d", function () {
        return "M15.886,3.735L6.765,15.373l-3.439-3.849"
      })
      .attr("fill", "none")
      .attr("transform", "translate(20, 1), scale(0.8)")
      .attr("stroke-width", 2)
      .attr("stroke", "#FFFFFF")
      .attr("pointer-events", "none")
  }

  function drawBarchart() {
    barchartHeight = 100
    barchartWidth = 10.35

    barchartDataset = summedByDateArray

    heightScale = d3.scaleLinear()
      .domain([0, 30000])
      .range([0, barchartHeight])

    heightScale.domain[1] = d3.max(summedByDateArray, function (d) {
      return d.value
    })

    var svgBarchart = d3.selectAll('.barChart')
      .append('svg')
      .attr("width", 380)
      .attr("height", barchartHeight)

    barchartG = svgBarchart
      .append("g")
      .attr("class", "barchartG")

    var barcharts = barchartG
      .selectAll('.barchart')
      .data(summedByDateArray)
      .attr("x", function (d, i) {
        return (barchartWidth + 2) * i
      })
      .attr('y', function (d, i) {
        return barchartHeight - heightScale(d.value)
      })
      .attr("height", function (d, i) {
        return heightScale(d.value)
      })

    barcharts
      .enter()
      .append("rect")
      .classed('barchart', true)
      .attr("x", function (d, i) {
        return (barchartWidth + 2) * i
      })
      .attr('y', function (d, i) {
        return barchartHeight - heightScale(d.value)
      })
      .attr('width', barchartWidth)
      .attr("height", function (d, i) {
        return heightScale(d.value)
      })
      .attr('fill', '#5F92CD')

    barcharts.exit().remove()
  }

  function drawSlider() {
    immutableScaleX = d3.scaleLinear()
      .domain([0, 30])
      .range([55, 427])

    scaleX = d3.scaleLinear()
      .domain([0, 30])
      .range([55, 427])

    var svgSlider = d3.select('.barChart').append('svg')
      .attr('width', 500)
      .attr('height', 150)

    group = svgSlider.append('g')
      .attr('class', 'group')
      .attr('transform', 'translate(7,20)')

    group
      .append('line')
      .attr('x1', scaleX(0))
      .attr('x2', scaleX(30))
      .attr('y1', 0)
      .attr('y2', 0)
      .attr('stroke', '#706F6F')

    var text = group.selectAll('text.sliderValue')
      .data([newMinCoex, newMaxCoex])

    text
      .enter()
      .append('text')
      .classed('sliderValue', true)
      .attr('dx', function (d, i) {
        return (i === 0) ? 35 : 450
      })
      .attr('dy', 5)
      .style('text-anchor', function (d, i) {
        return i === 0 ? 'end' : 'start'
      })
      .style('text-transform', 'uppercase')
      .text(function (d, i) {
        return (Math.abs(parseInt(d)) + 1) + ' Jan'
      })
      .attr('fill', '#000')
      .style('font-size', '12px')

    text.exit().remove()

    var sliderXLine = group.selectAll('#sliderXLine')
      .data([0])
      .attr('x1', immutableScaleX(0))
      .attr('x2', immutableScaleX(30))

    sliderXLine
      .enter()
      .append('line')
      .attr('id', 'sliderXLine')
      .attr('x1', immutableScaleX(0) + 3)
      .attr('y1', 0)
      .attr('x2', immutableScaleX(30))
      .attr('y2', 0)
      .attr('stroke-width', 14)
      .style('opacity', 0.6)
      .attr('stroke-linecap', 'round')
      .attr('stroke', '#F05F5B')

    sliderXLine.exit().remove()

    var sliderXEnd = group.selectAll('#sliderXEnd')
      .data([0])
      .attr('cx', immutableScaleX(30) + 3)

    sliderXEnd
      .enter()
      .append('circle')
      .attr('id', 'sliderXEnd')
      .attr('cx', immutableScaleX(30) + 3)
      .attr('cy', 0)
      .attr('r', 7)
      .style('opacity', 1)
      .attr('fill', '#F05F5B')
      .style('cursor', 'ew-resize')
      .call(d3.drag()
          .on("drag", function () {
            draggedX('end', barchartDataset)
          })
      )

    sliderXEnd.exit().remove()

    var sliderXStart = group.selectAll('#sliderXStart')
      .data([0])
      .attr('cx', immutableScaleX(0) + 3)

    sliderXStart
      .enter()
      .append('circle')
      .attr('id', 'sliderXStart')
      .attr('cx', immutableScaleX(0) + 3)
      .attr('cy', 0)
      .attr('r', 7)
      .style('opacity', 1)
      .attr('fill', '#F05F5B')
      .style('cursor', 'ew-resize')
      .call(d3.drag()
          .on("drag", function () {
            draggedX('start', barchartDataset)
          })
      )

    sliderXStart.exit().remove()

    var sumText = group.selectAll('text.sumText')
      .data([0])
      .text(function (d, i) {
        var totalSum = 0
        summedByDateArray.forEach(function (d) {
          totalSum += d.value
        })
        return 'SUM OF PROFITS ' + Format(totalSum) + ' $'
      })

    sumText
      .enter()
      .append('text')
      .classed('sumText', true)
      .attr('dx', 240)
      .attr('dy', 40)
      .style('text-transform', 'uppercase')
      .style('text-anchor', 'middle')
      .style('font-size', 14)
      .attr('fill', '#808080')
      .text(function (d, i) {
        var totalSum = 0
        summedByDateArray.forEach(function (d) {
          totalSum += d.value
        })
        return 'SUM OF PROFITS ' + Format(totalSum) + ' $'
      })

    sumText.exit().remove()
  }

  function draggedX(type, barchartDataset) {
    var initialvalue = scaleX(newMinCoex)
    if (type === 'start') {
      newMinCoex += immutableScaleX.invert(initialvalue - (d3.event.dx * -1))
      if (newMinCoex > 30) {
        newMinCoex = 30
      }
      if (newMinCoex < 0) {
        newMinCoex = 0
      }
      if ((newMaxCoex - newMinCoex) <= 0) {
        newMinCoex = newMaxCoex
      }
    } else {
      newMaxCoex -= immutableScaleX.invert(initialvalue - (d3.event.dx))

      if (newMaxCoex < 0) {
        newMaxCoex = 0
      }
      if (newMaxCoex > 30) {
        newMaxCoex = 30
      }
      if ((newMaxCoex - newMinCoex) <= 0) {
        newMaxCoex = newMinCoex
      }
    }
    scaleX.domain([newMinCoex, newMaxCoex])
    if (type === 'end') {
      group.selectAll('#sliderXEnd')
            .attr('cx', immutableScaleX(newMaxCoex) + 5)
    } else {
      group.selectAll('#sliderXStart')
            .attr('cx', immutableScaleX(newMinCoex) + 3)
    }

    group.selectAll('#sliderXLine')
        .attr('x1', immutableScaleX(newMinCoex) + 3)
        .attr('x2', immutableScaleX(newMaxCoex))

    var filter1 = newMinCoex
    var filter2 = newMaxCoex

    var dateFilter1, dateFilter2

    var datasetCopy = JSON.parse(JSON.stringify(dataset))

    var filteredDataset = datasetCopy.map(function (data) {
      var ceiledFilter1 = Math.ceil(filter1) + 1
      var ceiledFilter2 = Math.ceil(filter2) + 1
      dateFilter1 = new Date('01/' + ceiledFilter1 + '/2016')
      dateFilter2 = new Date('01/' + ceiledFilter2 + '/2016')
      dateFilter2 = dateFilter2.setDate(dateFilter2.getDate() + 1)
      if (new Date(data.date) > dateFilter1 && new Date(data.date) <= dateFilter2) {
        return data
      } else {
        data.value = 0
        return data
      }
    })

    group.selectAll('text.sliderValue')
        .data([Math.ceil(filter1), Math.ceil(filter2)])
        .attr('dx', function (d, i) {
          return (i === 0) ? 35 : 450
        })
        .text(function (d, i) {
          return (Math.abs(parseInt(d)) + 1) + ' Jan'
        })

    initData(filteredDataset, false)

    var barcharts = barchartG
        .selectAll('.barchart')
        .data(barchartDataset)
        .attr("x", function (d, i) {
          return (barchartWidth + 2) * i
        })
        .attr('y', function (d, i) {
          return barchartHeight - heightScale(d.value)
        })
        .attr("height", function (d, i) {
          return heightScale(d.value)
        })
        .attr('fill', function (d, i) {
          var ceiledFilter1 = Math.ceil(filter1) + 1
          var ceiledFilter2 = Math.ceil(filter2) + 1
          dateFilter1 = new Date('01/' + ceiledFilter1 + '/2016')
          dateFilter2 = new Date('01/' + ceiledFilter2 + '/2016')
          dateFilter2 = dateFilter2.setDate(dateFilter2.getDate() + 1)
          if (new Date(d.date) > dateFilter1 && new Date(d.date) <= dateFilter2) {
            return '#5F92CD'
          } else {
            return '#CDDBF1'
          }
        })

    barcharts.exit().remove()

    group.selectAll('text.sumText')
        .data([0])
        .text(function (d, i) {
          var totalSum = 0
          var ceiledFilter1 = Math.ceil(filter1) + 1
          var ceiledFilter2 = Math.ceil(filter2) + 1
          dateFilter1 = new Date('01/' + ceiledFilter1 + '/2016')
          dateFilter2 = new Date('01/' + ceiledFilter2 + '/2016')
          dateFilter2 = dateFilter2.setDate(dateFilter2.getDate() + 1)
          summedByDateArray.forEach(function (d) {
            if (new Date(d.date) > dateFilter1 && new Date(d.date) <= dateFilter2) {
              totalSum += d.value
            }
          })
          return 'SUM OF PROFITS ' + Format(totalSum) + ' $'
        })
  }
})()
