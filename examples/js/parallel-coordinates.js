/* global d3 _ */
(function () {
  var margin = {
    top: 50,
    right: 100,
    bottom: 50,
    left: 100,
  }
  var width = 800 - margin.left - margin.right
  var height = 400 - margin.top - margin.bottom
  var clickEnable = false

  var x = d3.scalePoint().rangeRound([0, width], 1)
  var y = {}
  var dragging = {}
  var dimensions
  var line = d3.line()
  var axis = d3.axisLeft()
  var foreground
  var keys = ["Price", "Production Cost", "Unit Sold", "Weight"]

  var dataset = [{
    "Price": 9,
    "Production Cost": 4,
    "Unit Sold": 600,
    "Weight": 500,
  }, {
    "Price": 8,
    "Production Cost": 1,
    "Unit Sold": 400,
    "Weight": 500,
  }, {
    "Price": 1,
    "Production Cost": 6,
    "Unit Sold": 100,
    "Weight": 200,
  }, {
    "Price": 5,
    "Production Cost": 3,
    "Unit Sold": 1000,
    "Weight": 200,
  }, {
    "Price": 2,
    "Production Cost": 5,
    "Unit Sold": 200,
    "Weight": 500,
  }, {
    "Price": 7,
    "Production Cost": 2,
    "Unit Sold": 100,
    "Weight": 600,
  }, {
    "Price": 10,
    "Production Cost": 6,
    "Unit Sold": 300,
    "Weight": 1000,
  }, {
    "Price": 2,
    "Production Cost": 6,
    "Unit Sold": 900,
    "Weight": 100,
  }, {
    "Price": 4,
    "Production Cost": 4,
    "Unit Sold": 700,
    "Weight": 400,
  }, {
    "Price": 9,
    "Production Cost": 4,
    "Unit Sold": 600,
    "Weight": 800,
  }, {
    "Price": 6,
    "Production Cost": 3,
    "Unit Sold": 500,
    "Weight": 800,
  }, {
    "Price": 6,
    "Production Cost": 3,
    "Unit Sold": 700,
    "Weight": 1000,
  }, {
    "Price": 5,
    "Production Cost": 6,
    "Unit Sold": 900,
    "Weight": 600,
  }, {
    "Price": 1,
    "Production Cost": 2,
    "Unit Sold": 200,
    "Weight": 500,
  }, {
    "Price": 4,
    "Production Cost": 4,
    "Unit Sold": 100,
    "Weight": 300,
  }, {
    "Price": 8,
    "Production Cost": 3,
    "Unit Sold": 200,
    "Weight": 1000,
  }]

  var svg = d3.select(".parallel-coordinates-container").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

  // Extract the list of dimensions and create a scale for each.
  x.domain(dimensions = d3.keys(dataset[0]).filter(function (d) {
    return y[d] = d3.scaleLinear()
          .domain(d3.extent(dataset, function (p) {
            return +p[d]
          }))
          .range([height, 0])
  }))

  var foregroundRect = svg.append("rect")
    .attr('width', 600)
    .attr('height', 300)
    .attr('fill', 'transparent')

  // Add blue foreground lines for focus.
  foreground = svg.append("g")
    .attr("class", "foreground")
    .selectAll("path")
    .data(dataset)
    .enter()
    .append("path")
    .attr('class', function (d, i) {
      return 'Price-' + d['Price'] + ' ProductionCost-' + d['Production Cost'] + ' UnitSold-' + d['Unit Sold'] + ' Weight-' + d['Weight'] + ' foreground'
    })
    .attr("d", path)

  foregroundRect.on('click', function (d, i) {
    clickEnable = false
    svg.selectAll('circle.circle')
      .transition()
      .attr('opacity', 0)

    svg.selectAll('path.foreground')
      .transition()
      .attr('opacity', 1)
  })

  // Add a group element for each dimension.
  var g = svg.selectAll(".dimension")
    .data(dimensions)
    .enter()
    .append("g")
    .attr("class", "dimension")
    .attr("transform", function (d) {
      return "translate(" + x(d) + ")"
    })
    .call(
      d3.drag()
      .on("start", function (d) {
        dragging[d] = x(d)
      })
      .on("drag", function (d) {
        dragging[d] = Math.min(width, Math.max(0, d3.event.x))
        foreground.attr("d", path)
        dimensions.sort(function (a, b) {
          return position(a) - position(b)
        })
        x.domain(dimensions)
        g.attr("transform", function (d) {
          return "translate(" + position(d) + ")"
        })
      })
      .on("end", function (d) {
        delete dragging[d]
        transition(d3.select(this)).attr("transform", "translate(" + x(d) + ")")
        transition(foreground).attr("d", path)
        keys = dimensions
      }))

  g.append("g")
    .attr("class", "axis")
    .each(function (d) {
      d3.select(this).call(axis.scale(y[d]))
    })
    .append("rect")
    .attr("class", "axis-title-background")
    .attr("y", -50)
    .attr("x", -55)
    .attr("width", 110)
    .attr("height", 30)
    .attr("cursor", "move")

  g.append("g")
    .attr("class", "axis")
    .each(function (d) {
      d3.select(this).call(axis.scale(y[d]))
    })
    .append("text")
    .attr("class", "axis-title")
    .style("text-anchor", "middle")
    .attr("y", -30)
    .attr("x", -10)
    .text(function (d) {
      if (d === 'Production Cost') return 'Prod. Cost'
      return d
    })

  var iconPath = g.selectAll("path.icon")
      .attr("class", "icon")
      .data(function (d) { return [d] })

  iconPath
      .enter()
      .append("path")
      .attr("d", "M11.5 9H.5C.2 9 0 8.8 0 8.5S.2 8 .5 8h11c.3 0 .5.2.5.5s-.2.5-.5.5zM11.5 5H.5C.2 5 0 4.8 0 4.5S.2 4 .5 4h11c.3 0 .5.2.5.5s-.2.5-.5.5zM11.5 1H.5C.2 1 0 .8 0 .5S.2 0 .5 0h11c.3 0 .5.2.5.5s-.2.5-.5.5z")
      .attr("stroke", "#efc100")
      .attr("stroke-width", "1")
      .attr("transform", "translate(42, -41) rotate(90)")

  drawCircles(dataset)

  function drawCircles(dataset) {
    var circles = g.selectAll("g.circles")
      .data(function (d) {
        var global = []
        dataset.forEach(function (datum) {
          var obj = {}
          obj[d] = datum[d]
          global.push(obj)
        })
        return global
      })

    var circlesEnter = circles
      .enter()
      .append('g')
      .attr("class", "circles")
      .attr("parent-index", function (d, i) {
        return i
      })

    circles.exit().remove()

    var circle = circlesEnter
      .selectAll('.circle')
      .data(function (d, i) {
        return [d]
      })
      .attr('cy', function (d, i) {
        var index = keys.indexOf(_.keys(d)[0])
        return y[keys[index]](d[keys[index]])
      })
      .attr('cx', function (d, i) {
        return position([keys[i]])
      })

    circle
      .enter()
      .append("circle")
      .attr("class", 'circle')
      .attr("r", 6)
      .attr('cy', function (d, i) {
        var index = keys.indexOf(_.keys(d)[0])
        return y[keys[index]](d[keys[index]])
      })
      .attr('cx', function (d, i) {
        return position([keys[i]])
      })
      .attr('index', function (d, i) {
        var index = keys.indexOf(_.keys(d)[0])
        var parentIndex = d3.select(this.parentNode).attr("parent-index")
        var thisClass = dimensions[index].replace(' ', '-').replace(' ', '-')
        return thisClass + '-' + parentIndex
      })
      .attr('fill', '#BF6292')
      .attr('stroke', '#fff')
      .attr('stroke-width', 1)
      .attr('opacity', 0)
      .on('mouseover', function (d, i) {
        if (!clickEnable) {
          var index = keys.indexOf(_.keys(d)[0])
          var className = keys[index]
          var classValue = d[className]

          svg.selectAll('circle.circle')
            .transition()
            .attr('opacity', 0)

          d3.select(this)
            .transition()
            .attr('opacity', 1)

          svg.selectAll('path.foreground')
            .transition()
            .attr('opacity', 0.1)

          svg.selectAll('path.' + className.replace(' ', '') + '-' + classValue)
            .transition()
            .attr('opacity', 1)
        }
      })
      .on('mouseout', function () {
        if (!clickEnable) {
          d3.select(this)
            .transition()
            .attr('opacity', 0)

          svg.selectAll('path.foreground')
            .transition()
            .attr('opacity', 1)
        }
      })
      .on('click', function (d, i) {
        clickEnable = !clickEnable
        if (clickEnable) {
          var index = keys.indexOf(_.keys(d)[0])
          var className = keys[index]
          var classValue = d[className]
          d3.select(this)
            .transition()
            .attr('opacity', 1)

          svg.selectAll('path.foreground')
            .transition()
            .attr('opacity', 0.1)

          svg.selectAll('path.' + className.replace(' ', '') + '-' + classValue)
            .transition()
            .attr('opacity', 1)
        } else {
          d3.select(this)
            .transition()
            .attr('opacity', 0)

          svg.selectAll('path.foreground')
            .transition()
            .attr('opacity', 1)
        }
      })

    var circleUpdate = circles
        .selectAll('.circle')
        .data(function (d) {
          return d
        })
        .attr('cy', function (d, i) {
          var index = keys.indexOf(_.keys(d)[0])
          return y[keys[index]](d[keys[index]])
        })
        .attr('cx', function (d, i) {
          return position([keys[i]])
        })

    circleUpdate
      .enter()
      .append("circle")
      .attr("class", 'circle')
      .attr("r", 5)
      .attr('cy', function (d, i) {
        var index = keys.indexOf(_.keys(d)[0])
        return y[keys[index]](d[keys[index]])
      })
      .attr('cx', function (d, i) {
        return position([keys[i]])
      })
      .attr('index', function (d, i) {
        var index = keys.indexOf(_.keys(d)[0])
        var parentIndex = d3.select(this.parentNode).attr("parent-index")
        var thisClass = dimensions[index].replace(' ', '-').replace(' ', '-')
        return thisClass + '-' + parentIndex
      })
      .attr('fill', '#BF6292')
      .attr('stroke', '#fff')
      .attr('stroke-width', 1)
      .attr('opacity', 0)
      .on('mouseover', function (d, i) {
        if (!clickEnable) {
          var index = keys.indexOf(_.keys(d)[0])
          var className = keys[index]
          var classValue = d[className]

          svg.selectAll('circle.circle')
            .transition()
            .attr('opacity', 0)

          d3.select(this)
            .transition()
            .attr('opacity', 1)

          svg.selectAll('path.foreground')
            .transition()
            .attr('opacity', 0.1)

          svg.selectAll('path.' + className.replace(' ', '') + '-' + classValue)
            .transition()
            .attr('opacity', 1)
        }
      })
      .on('mouseout', function () {
        if (!clickEnable) {
          d3.select(this)
            .transition()
            .attr('opacity', 0)

          svg.selectAll('path.foreground')
            .transition()
            .attr('opacity', 1)
        }
      })
      .on('click', function (d, i) {
        clickEnable = !clickEnable
        if (clickEnable) {
          var index = keys.indexOf(_.keys(d)[0])
          var className = keys[index]
          var classValue = d[className]
          d3.select(this)
            .transition()
            .attr('opacity', 1)

          svg.selectAll('path.foreground')
            .transition()
            .attr('opacity', 0.1)

          svg.selectAll('path.' + className.replace(' ', '') + '-' + classValue)
            .transition()
            .attr('opacity', 1)
        } else {
          d3.select(this)
            .transition()
            .attr('opacity', 0)

          svg.selectAll('path.foreground')
            .transition()
            .attr('opacity', 1)
        }
      })
  }

  function position(d) {
    var v = dragging[d]
    return v == null ? x(d) : v
  }

  function transition(g) {
    return g.transition().duration(500)
  }

  // Returns the path for a given data point.
  function path(d) {
    return line(dimensions.map(function (p) {
      return [position(p), y[p](d[p])]
    }))
  }
})()
