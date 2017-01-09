/* global d3 */
function RadarChart(id, data, options) {
  var cfg = {
    w: 600,
    h: 600,
    margin: {
      top: 20,
      right: 20,
      bottom: 20,
      left: 20,
    },
    levels: 3,
    maxValue: 0,
    labelFactor: 1.15,
    wrapWidth: 60,
    opacityArea: 0.7,
    dotRadius: 6,
    opacityCircles: 0.1,
    strokeWidth: 0,
    roundStrokes: false,
    color: ['#8ED3C8', '#9772B1', '#FDE390'],
  }

  var categoryColor = {
    'EMEA': '#8ED3C8',
    'Americas': '#9772B1',
    'APAC': '#FDE390',
  }

  if (typeof options !== 'undefined') {
    for (var i in options) {
      if (typeof options[i] !== 'undefined') {
        cfg[i] = options[i]
      }
    }
  }

  var maxValue = Math.max(cfg.maxValue, d3.max(data, function (i) {
    return d3.max(i.map(function (o) {
      return o.value
    }))
  }))

  var allAxis = (data[0].map(function (i, j) {
    return i.axis
  }))
  var total = allAxis.length
  var radius = Math.min(cfg.w / 2, cfg.h / 2)
  var Format = d3.format(',d')
  var angleSlice = Math.PI * 2 / total
  var rScale = d3.scaleLinear()
    .range([0, radius])
    .domain([0, maxValue])

  var svg = d3.select(id).append("svg")
    .attr("width", cfg.w + cfg.margin.left + cfg.margin.right)
    .attr("height", cfg.h + cfg.margin.top + cfg.margin.bottom)
    .attr("class", "radar" + id)

  var g = svg.append("g")
      .attr("transform", "translate(" + (cfg.w / 2 + cfg.margin.left) + "," + (cfg.h / 2 + cfg.margin.top) + ")")

  drawAxis()

  this.updateData = function (dataset) {
    var radarLine = d3.radialLine()
      .radius(function (d) {
        return rScale(d.value)
      })
      .angle(function (d, i) {
        return i * angleSlice
      })

    maxValue = Math.max(cfg.maxValue, d3.max(dataset, function (i) {
      return d3.max(i.map(function (o) {
        return o.value
      }))
    }))

    rScale.domain([0, maxValue])

    var blobWrapper = g.selectAll(".radarWrapper")
      .data(dataset)

    var blobWrapperEnter = blobWrapper
      .enter()
      .append("g")
      .attr("class", "radarWrapper")

    blobWrapper.exit().remove()

    /* RADAR AREAS */

    var radarAreas = blobWrapper.selectAll("path.radarArea")
    .data(function (d, i) {
      return [d]
    })

    radarAreas
       .enter().append("path")
       .attr("class", function (d, i) {
         return "radarArea " + d[0].area
       })
       .style("fill", function (d, i) {
         return categoryColor[d[0].area]
       })
       .style("fill-opacity", cfg.opacityArea)
       .attr("d", function (d, i) {
         return radarLine(d)
       })
       .on('mouseover', function (d, i) {
         d3.selectAll(".radarArea")
           .transition().duration(200)
           .style("fill-opacity", 0.1)

         d3.selectAll(".radarCircle")
           .transition().duration(200)
           .style("opacity", 0)

         d3.selectAll(".radarCircle." + d[0].area)
           .transition().duration(200)
           .style("opacity", 0.8)

         d3.select(this)
           .transition().duration(200)
           .style("fill-opacity", 0.7)
       })
       .on('mouseout', function (d) {
         d3.selectAll(".radarArea")
           .transition().duration(200)
           .style("fill-opacity", cfg.opacityArea)

         d3.selectAll(".radarCircle")
               .transition().duration(200)
               .style("opacity", 0)
       })

    radarAreas
       .transition()
       .duration(500)
       .attr("d", function (d, i) {
         return radarLine(d)
       })

    radarAreas.exit().remove()

    var radarAreasEnter = blobWrapperEnter.selectAll("path.radarArea")
    .data(function (d, i) {
      return [d]
    })

    radarAreasEnter
      .enter().append("path")
       .attr("class", function (d, i) {
         return "radarArea " + d[0].area
       })
       .style("fill", function (d, i) {
         return categoryColor[d[0].area]
       })
       .style("fill-opacity", cfg.opacityArea)
       .attr("d", function (d, i) {
         return radarLine(d)
       })
       .on('mouseover', function (d, i) {
         d3.selectAll(".radarArea")
           .transition().duration(200)
           .style("fill-opacity", 0.1)

         d3.selectAll(".radarCircle")
           .transition().duration(200)
           .style("opacity", 0)

         d3.selectAll(".radarCircle." + d[0].area)
           .transition().duration(200)
           .style("opacity", 0.8)

         d3.select(this)
           .transition().duration(200)
           .style("fill-opacity", 0.7)
       })
       .on('mouseout', function (d) {
         d3.selectAll(".radarArea")
           .transition().duration(200)
           .style("fill-opacity", cfg.opacityArea)

         d3.selectAll(".radarCircle")
               .transition().duration(200)
               .style("opacity", 0)
       })

    radarAreasEnter
       .transition()
       .duration(500)
       .attr("d", function (d, i) {
         return radarLine(d)
       })

    radarAreasEnter.exit().remove()

    /* RADAR CIRCLES */

    var blobWrapperCircle = blobWrapper
      .selectAll(".radarCircle")
      .data(function (d, i) {
        return d
      })
      .attr("cx", function (d, i) {
        return rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2)
      })
      .attr("cy", function (d, i) {
        return rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2)
      })

    blobWrapperCircle
      .enter()
      .append("circle")
      .attr("class", function (d, i) {
        return "radarCircle " + d.area
      })
      .attr("r", cfg.dotRadius)
      .attr("cx", function (d, i) {
        return rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2)
      })
      .attr("cy", function (d, i) {
        return rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2)
      })
      .attr("stroke-width", 2)
      .attr("stroke", "#fff")
      .style("fill", function (d) {
        return categoryColor[d.area]
      })
      .style("opacity", 0)
      .on("mouseover", function (d, i) {
        d3.selectAll(".radarArea")
          .transition().duration(200)
          .style("fill-opacity", 0.1)

        d3.select(".radarArea." + d.area)
          .transition().duration(200)
          .style("fill-opacity", 0.7)

        d3.select(this)
            .transition().duration(200)
            .style("opacity", 1)

        var newX = parseFloat(d3.select(this).attr('cx')) - 10
        var newY = parseFloat(d3.select(this).attr('cy')) - 10

        tooltip
              .attr('x', newX + 10)
              .attr('y', newY - 15)
              .text((Format(d.value)) + '$')
              .transition().duration(200)
              .style('opacity', 1)

        tooltipRect
              .attr('x', newX - 30)
              .attr('y', newY - 35)
              .transition().duration(200)
              .style('opacity', 1)
      })
      .on("mouseout", function () {
        d3.selectAll(".radarArea")
          .transition().duration(200)
          .style("fill-opacity", 0.7)

        tooltip.transition().duration(200)
              .style("opacity", 0)

        tooltipRect.transition().duration(200)
              .style("opacity", 0)

        d3.selectAll('.radarCircle').style('opacity', 0)
      })

    blobWrapperCircle.exit().remove()

    var blobWrapperCircleEnter = blobWrapperEnter
      .selectAll(".radarCircle")
      .data(function (d, i) {
        return d
      })
      .attr("cx", function (d, i) {
        return rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2)
      })
      .attr("cy", function (d, i) {
        return rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2)
      })

    blobWrapperCircleEnter
      .enter()
      .append("circle")
      .attr("class", function (d, i) {
        return "radarCircle " + d.area
      })
      .attr("r", cfg.dotRadius)
      .attr("cx", function (d, i) {
        return rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2)
      })
      .attr("cy", function (d, i) {
        return rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2)
      })
      .attr("stroke-width", 2)
      .attr("stroke", "#fff")
      .style("fill", function (d) {
        return categoryColor[d.area]
      })
      .style("opacity", 0)
      .on("mouseover", function (d, i) {
        d3.selectAll(".radarArea")
          .transition().duration(200)
          .style("fill-opacity", 0.1)

        d3.select(".radarArea." + d.area)
          .transition().duration(200)
          .style("fill-opacity", 0.7)

        var newX = parseFloat(d3.select(this).attr('cx')) - 10
        var newY = parseFloat(d3.select(this).attr('cy')) - 10

        d3.select(this)
          .transition().duration(200)
          .style("opacity", 1)

        d3.select('.radarTooltip')
          .attr('x', newX + 10)
          .attr('y', newY - 15)
          .text((Format(d.value)) + '$')
          .transition().duration(200)
          .style('opacity', 1)

        d3.select('.radarTooltipBackground')
          .attr('x', newX - 30)
          .attr('y', newY - 35)
          .transition().duration(200)
          .style('opacity', 1)
      })
      .on("mouseout", function () {
        console.log('mouseout circle')
        d3.selectAll(".radarArea")
          .transition().duration(200)
          .style("fill-opacity", 0.7)

        d3.select('.radarTooltip').transition().duration(200)
          .style("opacity", 0)

        d3.select('.radarTooltipBackground').transition().duration(200)
          .style("opacity", 0)

        d3.selectAll('.radarCircle').style('opacity', 0)
      })

    blobWrapperCircleEnter.exit().remove()

    var tooltipRect = g.selectAll('.radarTooltipBackground')
      .data([0])

    tooltipRect
      .enter()
      .append("rect")
      .attr("class", "radarTooltipBackground")
      .attr('width', 80)
      .attr('height', 30)
      .style('fill', '#464646')
      .style('pointer-events', 'none')
      .style("opacity", 0)

    var tooltip = g.selectAll('.radarTooltip')
      .data([0])

    tooltip
      .enter()
      .append("text")
      .style("opacity", 0)
      .style("fill", '#ffffff')
      .style("font-size", '14px')
      .style("text-anchor", 'middle')
      .attr("class", "radarTooltip")
      .style("opacity", 0)
  }

  function drawAxis() {
    var axisGrid = g.append("g").attr("class", "axisWrapper")

    axisGrid.selectAll(".levels")
      .data(d3.range(1, (cfg.levels + 1)).reverse())
      .enter()
      .append("circle")
      .attr("class", "gridCircle")
      .attr("r", function (d, i) {
        return radius / cfg.levels * d
      })
      .style("fill", "#5F92CD")
      .style("stroke", "#5F92CD")
      .style("fill-opacity", 0)

    var axis = axisGrid.selectAll(".axis")
        .data(allAxis)
        .enter()
        .append("g")
        .attr("class", "axis")

    axis.append("line")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", function (d, i) {
        return rScale(maxValue * 1) * Math.cos(angleSlice * i - Math.PI / 2)
      })
      .attr("y2", function (d, i) {
        return rScale(maxValue * 1) * Math.sin(angleSlice * i - Math.PI / 2)
      })
      .attr("class", "line")
      .style("stroke", "#5F92CD")
      .style("stroke-width", "1px")

    axis.append("text")
      .attr("class", "gridLegend")
      .style("font-size", "14px")
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .attr("fill", "#5F92CD")
      .attr("x", function (d, i) {
        return rScale(maxValue * cfg.labelFactor) * Math.cos(angleSlice * i - Math.PI / 2)
      })
      .attr("y", function (d, i) {
        return rScale(maxValue * cfg.labelFactor) * Math.sin(angleSlice * i - Math.PI / 2) - ((i === 2) ? 13 : 0)
      })
      .text(function (d) {
        return d
      })
      .call(wrap, cfg.wrapWidth)
  }

  function wrap(text, width) {
    text.each(function () {
      var text = d3.select(this)
      var words = text.text().split(/\s+/).reverse()
      var word
      var line = []
      var lineNumber = 0
      var lineHeight = 1
      var y = text.attr("y")
      var x = text.attr("x")
      var dy = parseFloat(text.attr("dy"))
      var tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em")

      while (word = words.pop()) {
        line.push(word)
        tspan.text(line.join(" "))
        if (tspan.node().getComputedTextLength() > width) {
          line.pop()
          tspan.text(line.join(" "))
          line = [word]
          tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word)
        }
      }
    })
  }

  this.updateData(data)
}
