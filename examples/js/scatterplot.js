/* global d3 */
function Scatterplot(el, component, svgClass) {
  var width = el.node().getBoundingClientRect().width
  var height = width / 1.8
  var horizontalMargin = 50
  var verticalMargin = 50
  var data
  var minCoex = 0
  var maxCoex = 100
  var minGrowth = 0
  var maxGrowth = 100
  var zoomEnabled = false
  var moveEnabled = true
  var searchEnabled = false
  var hoverEnabled = false
  var selectedCompany
  var xAxis, yAxis, gX, gY

  var newMinCoex = minCoex
  var newMaxCoex = maxCoex
  var newMinGrowth = minGrowth
  var newMaxGrowth = maxGrowth

  var scaleX = d3.scaleLinear()
    .domain([minCoex, maxCoex])
    .range([10 + horizontalMargin, width])

  var immutableScaleX = d3.scaleLinear()
    .domain([minCoex, maxCoex])
    .range([10 + horizontalMargin, width])

  var scaleY = d3.scaleLinear()
    .domain([minGrowth, maxGrowth])
    .range([height - (verticalMargin), 0])

  var immutableScaleY = d3.scaleLinear()
    .domain([minGrowth, maxGrowth])
    .range([height - (verticalMargin), 0])

  var svg = el.append('svg')
    .attr('width', width)
    .attr('height', height + 5)
    .attr('class', svgClass)

  svg.append('defs')
      .append('marker')
      .attr('id', 'marker-circle')
      .attr('markerWidth', 4)
      .attr('markerHeight', 4)
      .attr('markerUnits', 'strokeWidth')
      .attr('refX', 2)
      .attr('refY', 2)
      .attr('orient', 'auto')
      .append('circle')
      .attr('cx', 2)
      .attr('cy', 2)
      .attr('r', 2)

  var background = svg.append('rect')
    .attr('class', 'background')
    .style('fill', '#F6F6F6')
    .attr('width', width - (horizontalMargin))
    .attr('height', height - (verticalMargin) + 5)
    .attr('transform', 'translate(' + (horizontalMargin + 3) + ',' + 0 + ')')

  var globalG = svg.append('g')
    .attr('class', 'globalG')
    .attr('transform', function () {
      return 'translate(' + 0 + ',' + 0 + ')'
    })

  var maskLeft = svg.append('rect')
    .style('fill', '#ffffff')
    .attr('width', horizontalMargin + 5)
    .attr('height', height)
    .attr('transform', 'translate(' + 0 + ',' + -18 + ')')

  var maskBottom = svg.append('rect')
    .style('fill', '#ffffff')
    .attr('width', width)
    .attr('height', verticalMargin + 10)
    .attr('transform', 'translate(' + 0 + ',' + (height - verticalMargin + 5) + ')')

  createAxis()

  var dataG = globalG.append('g')
    .attr('class', 'dataG')

  var legendG = svg.append('g')
    .attr('class', 'legendG')

  var zoom = d3.zoom()
    .scaleExtent([1, 6])
    .translateExtent([[-100, -100], [width + 90, height + 100]])
    .on("zoom", zoomed)

  svg.call(zoom)

  function removeDragBars() {
    svg.select('#draggableXStart').remove()
    svg.select('#draggableXEnd').remove()
    svg.select('#draggableXLine').remove()
    svg.select('#draggableYStart').remove()
    svg.select('#draggableYEnd').remove()
    svg.select('#draggableYLine').remove()
    svg.selectAll('.axis-line').remove()
  }

  function zoomed() {
    if (moveEnabled) {
      d3.select('.' + svgClass + ' .globalG').attr("transform", d3.event.transform)
      gX.call(xAxis.scale(d3.event.transform.rescaleX(scaleX)))
      gY.call(yAxis.scale(d3.event.transform.rescaleY(scaleY)))

      svg.selectAll('.axis--x text')
        .attr('transform', 'translate(' + 0 + ',' + (height + 30) + ')')
    }
  }

  function resetted() {
    svg
      .transition()
      .duration(750)
      .call(zoom.transform, d3.zoomIdentity)
      .on('end', function () {
        moveEnabled = false
      })
  }

  function resetDragBars() {
    scaleX.domain([minCoex, maxCoex])
    scaleY.domain([minGrowth, maxGrowth])
    newMinCoex = minCoex
    newMaxCoex = maxCoex
    newMinGrowth = minGrowth
    newMaxGrowth = maxGrowth
  }

  function createAxis() {
    xAxis = d3.axisBottom(scaleX)
      .ticks(4)
      .tickSize(height - verticalMargin + 5)
      .tickPadding(8 - height)

    yAxis = d3.axisRight(scaleY)
      .ticks(4)
      .tickSize(width - horizontalMargin)
      .tickPadding(8 - width)

    gX = svg.append("g")
      .attr("class", "axis axis--x")
      .call(xAxis)

    gY = svg.append("g")
      .attr("class", "axis axis--y")
      .attr('transform', 'translate(' + (horizontalMargin + 10) + ',' + 5 + ')')
      .call(yAxis)

    svg.selectAll('.axis--x text')
      .attr('transform', 'translate(' + 0 + ',' + (height + 32) + ')')
  }

  this.updateData = function (dataset, move, zoom, search, hover, company) {
    if (dataset !== undefined) {
      data = dataset
    }

    if (move !== undefined) {
      if (!move) {
        resetted()
      } else {
        moveEnabled = move
        resetDragBars()
        removeDragBars()
      }
    }

    if (zoom !== undefined) {
      zoomEnabled = zoom
    }
    if (hover !== undefined) {
      hoverEnabled = hover
    }

    if (search !== undefined) {
      if (!search) {
        component.company('')
        svg.selectAll('.tooltip').remove()
        svg.selectAll('.tooltip-text').remove()
        svg.selectAll('.' + svgClass + ' g.data')
          .style('opacity', 1)
      } else {
        resetted()
        if (company) {
          selectedCompany = company
          component.company(selectedCompany)

          if (svg.select('g.data[company="' + (stringNoSpaces(selectedCompany)) + '"]').node()) {
            svg.selectAll('g.data')
            .style('opacity', 0.3)
            svg.selectAll('g.data[company="' + (stringNoSpaces(selectedCompany)) + '"]')
            .style('opacity', 1)

            var x = svg.select('g.data[company="' + (stringNoSpaces(selectedCompany)) + '"]').node().__data__.x
            var y = svg.select('g.data[company="' + (stringNoSpaces(selectedCompany)) + '"]').node().__data__.y

            svg
            .append('rect')
            .attr('class', 'tooltip')
            .style('fill', '#464646')
            .style('opacity', 1)
            .style('display', 'block')
            .attr('x', scaleX(x) - 50)
            .attr('y', scaleY(y) - 50)
            .attr('width', 100)
            .attr('height', 30)

            svg
            .append('text')
            .attr('class', 'tooltip-text')
            .style('opacity', 1)
            .style('font-size', '14px')
            .attr('dx', scaleX(x))
            .attr('dy', scaleY(y) - 30)
            .text(function () {
              return selectedCompany
            })
          } else {
            svg.selectAll('.tooltip').remove()
            svg.selectAll('.tooltip-text').remove()
            svg.selectAll('.' + svgClass + ' g.data')
            .style('opacity', 1)
          }
        }
      }
      searchEnabled = search
    }

    var maxTurnover = parseFloat(d3.max(data, function (d) {
      return parseFloat(d.radius)
    }))
    component.maxTurnover(maxTurnover)

    var g = dataG.selectAll('g.data')
    .data(data, function (d) {
      return d.class
    })
    .attr('transform', function (d) {
      var x = scaleX(d.x)
      var y
      if (isNaN(d.y)) {
        y = scaleY(0)
      } else {
        y = scaleY(d.y)
      }
      return 'translate(' + x + ',' + y + ')'
    })
    .call(component)

    g.enter()
      .append('g')
      .classed('data', true)
      .attr('company', function (d) {
        return getSlug(d.class)
      })
      .attr('transform', function (d) {
        var x = scaleX(d.x)
        var y
        if (isNaN(d.y)) {
          y = scaleY(0)
        } else {
          y = scaleY(d.y)
        }
        return 'translate(' + x + ',' + y + ')'
      })
      .style('opacity', 1)
      .call(component)

    g.exit().remove()

    svg.selectAll('.turnover-background')
    .on('mouseenter', function () {
      if (hoverEnabled) {
        over(this)
      }
    })
    .on('mouseleave', function () {
      if (hoverEnabled) {
        out(this)
      }
    })

    if (zoomEnabled) {
      setupDrag(gX, gY)
    }
    if (searchEnabled) {
      removeDragBars()
    }
  }

  function getSlug(txt) {
    return txt.toLowerCase().replace(/ /g, '')
  }

  function setupDrag(gX, gY) {
    var draggableXLine = svg.selectAll('#draggableXLine')
            .data([0])
            .attr('x1', immutableScaleX(newMaxCoex) - 2)
            .attr('x2', immutableScaleX(newMinCoex) + 5)

    svg
      .append('line')
      .classed('axis-line', true)
      .attr('x1', immutableScaleX(newMaxCoex) - 2)
      .attr('x2', immutableScaleX(newMinCoex) + 5)
      .attr('transform', 'translate(' + (-5) + ',' + (height - 30) + ')')
      .attr('y1', 0)
      .attr('y2', 0)
      .attr('stroke', '#c7c7c7')

    draggableXLine
      .enter()
      .append('line')
      .attr('id', 'draggableXLine')
      .attr('x1', immutableScaleX(newMaxCoex) - 2)
      .attr('y1', 0)
      .attr('x2', immutableScaleX(newMinCoex) + 5)
      .attr('y2', 0)
      .attr('stroke-width', 10)
      .style('opacity', 0.6)
      .attr('transform', 'translate(' + (-5) + ',' + (height - 30) + ')')
      .attr('stroke-linecap', 'round')
      .attr('stroke', '#ff5050')
      .style('cursor', 'move')
      .call(
        d3.drag()
          .on("drag", function () {
            draggedXLine()
          })
      )

    draggableXLine.exit().remove()

    var draggableXEnd = svg.selectAll('#draggableXEnd')
      .data([0])
      .attr('cx', immutableScaleX(newMinCoex) + 5)

    draggableXEnd
      .enter()
      .append('circle')
      .attr('id', 'draggableXEnd')
      .attr('cx', immutableScaleX(newMinCoex) + 5)
      .attr('cy', 0)
      .attr('r', 5)
      .style('opacity', 1)
      .attr('transform', 'translate(' + (-5) + ',' + (height - 30) + ')')
      .attr('fill', '#ff5050')
      .style('cursor', 'ew-resize')
      .call(
        d3.drag()
          .on("drag", function () {
            draggedX('end')
          })
      )

    draggableXEnd.exit().remove()

    var draggableXStart = svg.selectAll('#draggableXStart')
      .data([0])
      .attr('cx', immutableScaleX(newMaxCoex) - 2)

    draggableXStart
      .enter()
      .append('circle')
      .attr('id', 'draggableXStart')
      .attr('cx', immutableScaleX(newMaxCoex) - 2)
      .attr('cy', 0)
      .attr('r', 5)
      .style('opacity', 1)
      .attr('transform', 'translate(' + (-5) + ',' + (height - 30) + ')')
      .attr('fill', '#ff5050')
      .style('cursor', 'ew-resize')
      .call(d3.drag()
        .on("drag", function () {
          draggedX('start')
        })
      )

    draggableXStart.exit().remove()

    var draggableYLine = svg.selectAll('#draggableYLine')
      .data([0])
      .attr('y1', immutableScaleY(newMinGrowth) - 8)
      .attr('y2', immutableScaleY(newMaxGrowth) + 1)

    svg
      .append('line')
      .classed('axis-line', true)
      .attr('x1', 0)
      .attr('x2', 0)
      .attr('transform', 'translate(' + 40 + ',' + 5 + ')')
      .attr('y1', immutableScaleY(newMinGrowth) - 8)
      .attr('y2', immutableScaleY(newMaxGrowth) + 1)
      .attr('stroke', '#706F6F')

    draggableYLine
      .enter()
      .append('line')
      .attr('id', 'draggableYLine')
      .attr('x1', 0)
      .attr('y1', immutableScaleY(newMinGrowth) - 8)
      .attr('x2', 0)
      .attr('y2', immutableScaleY(newMaxGrowth) + 1)
      .attr('stroke-width', 10)
      .style('opacity', 0.6)
      .attr('stroke-linecap', 'round')
      .attr('stroke', '#ff5050')
      .attr('transform', 'translate(' + 40 + ',' + 5 + ')')
      .style('cursor', 'move')
      .call(
        d3.drag()
        .on("drag", function () {
          draggedYLine()
        })
      )

    draggableYLine.exit().remove()

    var draggableYEnd = svg.selectAll('#draggableYEnd')
      .data([0])
      .attr('cy', immutableScaleY(newMaxGrowth) + 1)

    draggableYEnd
      .enter()
      .append('circle')
      .attr('id', 'draggableYEnd')
      .attr('cx', 0)
      .attr('cy', immutableScaleY(newMaxGrowth) + 1)
      .attr('r', 5)
      .style('opacity', 1)
      .attr('fill', '#ff5050')
      .style('cursor', 'ns-resize')
      .attr('transform', 'translate(' + 40 + ',' + 5 + ')')
      .call(
        d3.drag()
        .on("drag", function () {
          draggedY('end')
        })
      )

    draggableYEnd.exit().remove()

    var draggableYStart = svg.selectAll('#draggableYStart')
      .data([0])
      .attr('cy', immutableScaleY(newMinGrowth) - 8)

    draggableYStart
      .enter()
      .append('circle')
      .attr('id', 'draggableYStart')
      .attr('cx', 0)
      .attr('cy', immutableScaleY(newMinGrowth) - 8)
      .attr('r', 5)
      .attr('fill', '#ff5050')
      .attr('transform', 'translate(' + 40 + ',' + 5 + ')')
      .style('opacity', 1)
      .style('cursor', 'ns-resize')
      .call(
        d3.drag()
        .on("drag", function () {
          draggedY('start')
        })
      )

    draggableYStart.exit().remove()
  }

  function draggedY(type) {
    var initialvalue = immutableScaleY(0)
    if (type === 'start') {
      newMinGrowth += immutableScaleY.invert(initialvalue + (d3.event.dy))
      if (newMinGrowth < minGrowth) {
        newMinGrowth = minGrowth
      }
      if (newMinGrowth > maxGrowth) {
        newMinGrowth = maxGrowth
      }
      if ((newMaxGrowth - newMinGrowth) < 1) {
        newMinGrowth = newMaxGrowth - 1
      }
    } else {
      newMaxGrowth -= immutableScaleY.invert(initialvalue - (d3.event.dy))

      if (newMaxGrowth < minGrowth) {
        newMaxGrowth = minGrowth
      }
      if (newMaxGrowth > maxGrowth) {
        newMaxGrowth = maxGrowth
      }
      if ((newMaxGrowth - newMinGrowth) < 1) {
        newMaxGrowth = newMinGrowth + 1
      }
    }
    gY.call(yAxis.scale(scaleY))
    scaleY.domain([newMinGrowth, newMaxGrowth])
    svg.selectAll('g.data').attr('transform', function (d) {
      var x = scaleX(d.x)
      var y
      if (isNaN(d.y)) {
        y = scaleY(0)
      } else {
        y = scaleY(d.y)
      }
      return 'translate(' + x + ',' + y + ')'
    })
    svg.selectAll('#draggableYStart')
      .attr('cy', immutableScaleY(newMinGrowth) - 8)
    svg.selectAll('#draggableYEnd')
      .attr('cy', immutableScaleY(newMaxGrowth) + 1)
    svg.selectAll('#draggableYLine')
      .attr('y1', immutableScaleY(newMaxGrowth) + 1)
      .attr('y2', immutableScaleY(newMinGrowth) - 8)

    d3.event.sourceEvent.stopPropagation()
  }

  function draggedX(type) {
    var initialvalue = scaleX(newMinCoex)
    if (type === 'end') {
      newMinCoex += immutableScaleX.invert(initialvalue - (d3.event.dx * -1))
      if (newMinCoex > 100) {
        newMinCoex = 100
      }
      if (newMinCoex < 0) {
        newMinCoex = 0
      }
      if ((newMaxCoex - newMinCoex) < 1) {
        newMinCoex = newMaxCoex - 1
      }
    } else {
      newMaxCoex -= immutableScaleX.invert(initialvalue - (d3.event.dx))

      if (newMaxCoex < 0) {
        newMaxCoex = 0
      }
      if (newMaxCoex > 100) {
        newMaxCoex = 100
      }
      if ((newMaxCoex - newMinCoex) < 1) {
        newMaxCoex = newMinCoex + 1
      }
    }
    gX.call(xAxis.scale(scaleX))
    scaleX.domain([newMinCoex, newMaxCoex])
    svg.selectAll('g.data')
      .attr('transform', function (d) {
        var x = scaleX(d.x)
        var y
        if (isNaN(d.y)) {
          y = scaleY(0)
        } else {
          y = scaleY(d.y)
        }
        return 'translate(' + x + ',' + y + ')'
      })
    svg.selectAll('#draggableXEnd')
      .attr('cx', immutableScaleX(newMinCoex) + 5)
    svg.selectAll('#draggableXStart')
      .attr('cx', immutableScaleX(newMaxCoex) - 2)
    svg.selectAll('#draggableXLine')
      .attr('x1', immutableScaleX(newMaxCoex) - 2)
      .attr('x2', immutableScaleX(newMinCoex) + 5)
    svg.selectAll('.axis--x text')
      .attr('transform', 'translate(' + 0 + ',' + (height + 30) + ')')

    d3.event.sourceEvent.stopPropagation()
  }

  function draggedYLine() {
    var initialvalue = immutableScaleY(0)

    if (newMaxGrowth < maxGrowth) {
      newMinGrowth += immutableScaleY.invert(initialvalue + (d3.event.dy))
      if (newMinGrowth < minGrowth) {
        newMinGrowth = minGrowth
      }
    }

    if (newMinGrowth > minGrowth) {
      newMaxGrowth -= immutableScaleY.invert(initialvalue - (d3.event.dy))
      if (newMaxGrowth > maxGrowth) {
        newMaxGrowth = maxGrowth
      }
    }

    scaleY.domain([newMinGrowth, newMaxGrowth])

    gY.call(yAxis.scale(scaleY))

    svg.selectAll('text.growthAxisText')
      .data([newMaxGrowth, newMinGrowth])
      .text(function (d) {
        return parseInt(d)
      })

    svg.selectAll('g.data').attr('transform', function (d) {
      var x = scaleX(d.x)
      var y
      if (isNaN(d.y)) {
        y = scaleY(0)
      } else {
        y = scaleY(d.y)
      }
      if (d.y > 100) {
        y = scaleY(100) - 20
      }
      return 'translate(' + x + ',' + y + ')'
    })
    svg.selectAll('#draggableYStart')
      .attr('cy', immutableScaleY(newMinGrowth) - 8)
    svg.selectAll('#draggableYEnd')
      .attr('cy', immutableScaleY(newMaxGrowth) + 1)
    svg.selectAll('#draggableYLine')
      .attr('y1', immutableScaleY(newMinGrowth) - 8)
      .attr('y2', immutableScaleY(newMaxGrowth) + 1)
    d3.event.sourceEvent.stopPropagation()
  }

  function draggedXLine() {
    var initialvalue = scaleX(newMinCoex)

    if (newMaxCoex < 100) {
      newMinCoex += immutableScaleX.invert(initialvalue - (d3.event.dx * -1))
      if (newMinCoex < 0) {
        newMinCoex = 0
      }
    }

    if (newMinCoex > 0) {
      newMaxCoex -= immutableScaleX.invert(initialvalue - (d3.event.dx))
      if (newMaxCoex > 100) {
        newMaxCoex = 100
      }
    }

    gX.call(xAxis.scale(scaleX))

    scaleX.domain([newMinCoex, newMaxCoex])

    svg.selectAll('text.coexAxisText')
      .data([newMaxCoex, newMinCoex])
      .text(function (d, i) {
        return Math.abs(parseInt(d - 100))
      })

    svg.selectAll('g.data')
      .attr('transform', function (d) {
        var x = scaleX(d.x)
        var y
        if (isNaN(d.y)) {
          y = scaleY(0)
        } else {
          y = scaleY(d.y)
        }
        if (d.y > 100) {
          y = scaleY(100) - 20
        }
        return 'translate(' + x + ',' + y + ')'
      })
    svg.selectAll('#draggableXStart')
      .attr('cx', immutableScaleX(newMaxCoex) - 2)
    svg.selectAll('#draggableXEnd')
      .attr('cx', immutableScaleX(newMinCoex) + 5)
    svg.selectAll('#draggableXLine')
      .attr('x1', immutableScaleX(newMaxCoex) - 2)
      .attr('x2', immutableScaleX(newMinCoex) + 5)
    d3.event.sourceEvent.stopPropagation()
  }

  function over(el) {
    var parent = d3.select(el).node().parentNode
    var element = d3.select(parent)
    var n = 0
    svg.selectAll('.' + svgClass + ' g.data')
      .style('opacity', 0.3)

    element.selectAll('circle.turnover-background')
      .classed('over', true)

    element.selectAll('circle.patent')
      .style('opacity', 1.0)

    element.selectAll('line')
      .attr('stroke-width', 10)
      .style('opacity', 0.8)
      .transition()
      .duration(100)
      .delay(function (d, i) {
        return i * 40
      })
      .on("start", function () {
        if (n === 0) {
          element.selectAll('circle.patent')
              .style('opacity', 1)
        }
        n++
        d3.active(this)
          .attr('x2', function (d) {
            return d.x2
          })
          .attr('y2', function (d) {
            return d.y2
          })
          .transition()
      })

    element
      .style('opacity', 1.0)
  }

  function out(el) {
    var parent = d3.select(el).node().parentNode
    var element = d3.select(parent)

    var n = 18

    element.selectAll('line')
        .transition()
        .duration(100)
        .attr('x2', 0)
        .attr('y2', 0)
        .on("end", function () {
          n--
          d3.select(this).style('opacity', 0)
          if (n === 0) {
            d3.select(this).style('opacity', 0)
            element.selectAll('circle.patent')
                .style('opacity', 0)
          }
        })

    if (n > 0) {
      element.selectAll('line')
          .attr('x2', 0)
          .attr('y2', 0)
          .style('opacity', 0)
    }

    svg.selectAll('.' + svgClass + ' g.data')
        .style('opacity', 1)
  }

  function stringNoSpaces(str) {
    return str.replace(' ', '').toLowerCase()
  }
}
/* exported Scatterplot */
