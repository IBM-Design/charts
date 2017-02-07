/* global d3 ChartComponent Scatterplot */

(function () {
  /* CHART 1 */
  var elContainer = d3.select('.svg-container')
  var component = new ChartComponent()
  var chart = new Scatterplot(elContainer, component, 'svg1')
  var scatterplotDataset

  d3.select('.search').on("input", function () {
    chart.updateData(scatterplotDataset, false, false, true, false, this.value)
  })

  d3.select('.erase').on("click", function () {
    chart.updateData(scatterplotDataset, false, false, false, false, null)
    document.getElementById('searchField').value = ''
  })

  d3.selectAll('.menuEl').on("click", function (d, i) {
    d3.selectAll('.menuEl').classed('active', false)
    d3.select(this).classed('active', true)

    if (i === 2) {
      d3.select('.search-container').style('opacity', 1)
      chart.updateData(scatterplotDataset, true, false, true, false, null)
    } else {
      d3.select('.search-container').style('opacity', 0)
      i === 0 ? chart.updateData(scatterplotDataset, true, false, false, false) : chart.updateData(scatterplotDataset, false, true, false, false)
    }
    d3.selectAll('.labelEl').classed('visible', false)
    d3.select('.label-' + (i + 1)).classed('visible', true)

    d3.selectAll('.gif-container > div').style('display', 'none')
    if (i === 0) {
      d3.select('.move-gif').style('display', 'block')
      d3.select('.move-gif').style('visibility', 'initial')
    } else if (i === 1) {
      d3.select('.frame-gif').style('display', 'block')
      d3.select('.frame-gif').style('visibility', 'initial')
    } else if (i === 2) {
      d3.select('.find-gif').style('display', 'block')
      d3.select('.find-gif').style('visibility', 'initial')
    }
  })

  /* CHART 2 */
  var elContainer2 = d3.select('.svg-container2')
  var component2 = new ChartComponent()
  var chart2 = new Scatterplot(elContainer2, component2, 'svg2')

  var filter1 = 0
  var filter2 = 500

  if (window.innerWidth <= 800) {
    d3.select('.move-gif').style('display', 'block')
    d3.select('.move2-gif').style('display', 'block')
  }

  d3.selectAll('.menuEl2').on("click", function (d, i) {
    d3.selectAll('.menuEl2').classed('active', false)
    d3.select(this).classed('active', true)
    d3.selectAll('.labelEl2').style('opacity', 0)
    d3.select('.labelEl2.label-' + (i + 1)).style('opacity', 1)

    if (i === 1) {
      d3.select('.slider').style('opacity', 1)
    } else {
      d3.select('.slider').style('opacity', 0)
    }
    /* dataset, move, zoom, search, hover, company */
    if (i === 2) {
      chart2.updateData(scatterplotDataset, false, false, false, true)
    } else if (i === 1) {
      chart2.updateData(scatterplotDataset, false, false, false, false)
    } else {
      chart2.updateData(scatterplotDataset, true, false, false, false)
    }

    if (i === 0 || i === 2) {
      newMinCoex = 0
      newMaxCoex = 500
      group.selectAll('#sliderXEnd')
                .attr('cx', immutableScaleX(newMaxCoex))
      group.selectAll('#sliderXStart')
                .attr('cx', immutableScaleX(newMinCoex))

      group.selectAll('#sliderXLine')
        .attr('x1', immutableScaleX(0))
        .attr('x2', immutableScaleX(500))

      group.selectAll('text.sliderValue')
        .text(function (d, i) {
          return i === 0 ? 0 : 500
        })
    }

    d3.selectAll('.gif-container2 > div').style('display', 'none')
    if (i === 0) {
      d3.select('.move2-gif').style('display', 'block')
      d3.select('.move2-gif').style('visibility', 'initial')
    } else if (i === 1) {
      d3.select('.filter-gif').style('display', 'block')
      d3.select('.filter-gif').style('visibility', 'initial')
    } else if (i === 2) {
      d3.select('.details-gif').style('display', 'block')
      d3.select('.details-gif').style('visibility', 'initial')
    }
  })

  var newMinCoex = 0
  var newMaxCoex = 500

  var immutableScaleX = d3.scaleLinear()
      .domain([0, 500])
      .range([20, 200])

  var scaleX = d3.scaleLinear()
      .domain([0, 500])
      .range([20, 200])

  var svg = d3.select('.slider').append('svg')
      .attr('width', 265)
      .attr('height', 42)

  var group = svg.append('g')
      .attr('class', 'group')
      .attr('transform', 'translate(21,21)')

  group
      .append('line')
      .attr('x1', scaleX(0))
      .attr('x2', scaleX(500))
      .attr('y1', 0)
      .attr('y2', 0)
      .attr('stroke', '#706F6F')

  var text = group.selectAll('text.sliderValue')
      .data([newMinCoex, newMaxCoex])
      .attr('dx', function (d, i) {
        return (i === 0) ? 12 : 210
      })
      .style('text-anchor', function (d, i) {
        return (i === 0) ? 'end' : 'start'
      })

  text
      .enter()
      .append('text')
      .classed('sliderValue', true)
      .attr('dx', function (d, i) {
        return (i === 0) ? 12 : 210
      })
      .attr('dy', 5)
      .text(function (d, i) {
        return Math.abs(parseInt(d))
      })
      .attr('font-size', '14px')
      .attr('fill', '#e0e0e0')
      .style('text-anchor', function (d, i) {
        return (i === 0) ? 'end' : 'start'
      })

  text.exit().remove()

  var sliderXLine = group.selectAll('#sliderXLine')
      .data([0])
      .attr('x1', immutableScaleX(0))
      .attr('x2', immutableScaleX(500))

  sliderXLine
      .enter()
      .append('line')
      .attr('id', 'sliderXLine')
      .attr('x1', immutableScaleX(0) + 5)
      .attr('y1', 0)
      .attr('x2', immutableScaleX(500) - 5)
      .attr('y2', 0)
      .attr('stroke-width', 10)
      .style('opacity', 0.6)
      .attr('stroke-linecap', 'round')
      .attr('stroke', '#ff5050')

  sliderXLine.exit().remove()

  var sliderXEnd = group.selectAll('#sliderXEnd')
      .data([0])
      .attr('cx', immutableScaleX(500))

  sliderXEnd
      .enter()
      .append('circle')
      .attr('id', 'sliderXEnd')
      .attr('cx', immutableScaleX(500))
      .attr('cy', 0)
      .attr('r', 5)
      .style('opacity', 1)
      .attr('fill', '#ff5050')
      .style('cursor', 'ew-resize')
      .call(d3.drag()
          .on("drag", function () {
            draggedX('end')
          })
      )

  sliderXEnd.exit().remove()

  var sliderXStart = group.selectAll('#sliderXStart')
      .data([0])
      .attr('cx', immutableScaleX(0))

  sliderXStart
      .enter()
      .append('circle')
      .attr('id', 'sliderXStart')
      .attr('cx', immutableScaleX(0))
      .attr('cy', 0)
      .attr('r', 5)
      .style('opacity', 1)
      .attr('fill', '#ff5050')
      .style('cursor', 'ew-resize')
      .call(d3.drag()
          .on("drag", function () {
            draggedX('start')
          })
      )

  sliderXStart.exit().remove()

  function draggedX(type) {
    var initialvalue = scaleX(newMinCoex)
    if (type === 'start') {
      newMinCoex += immutableScaleX.invert(initialvalue - (d3.event.dx * -1))
      if (newMinCoex > 500) {
        newMinCoex = 500
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
      if (newMaxCoex > 500) {
        newMaxCoex = 500
      }
      if ((newMaxCoex - newMinCoex) < 1) {
        newMaxCoex = newMinCoex + 1
      }
    }
    scaleX.domain([newMinCoex, newMaxCoex])
    if (type === 'end') {
      group.selectAll('#sliderXEnd')
              .attr('cx', immutableScaleX(newMaxCoex))
    } else {
      group.selectAll('#sliderXStart')
              .attr('cx', immutableScaleX(newMinCoex))
    }

    group.selectAll('#sliderXLine')
          .attr('x1', immutableScaleX(newMinCoex))
          .attr('x2', immutableScaleX(newMaxCoex))

    filter1 = newMinCoex
    filter2 = newMaxCoex

    var filteredDataset = scatterplotDataset.filter(function (data) {
      return data.radius > filter1 && data.radius < filter2
    })

    group.selectAll('text.sliderValue')
          .data([newMinCoex, newMaxCoex])
          .attr('dx', function (d, i) {
            return (i === 0) ? 12 : 210
          })
          .text(function (d, i) {
            return Math.abs(parseInt(d))
          })

    chart2.updateData(filteredDataset, false, false)
  }

  /* DATA LOAD */

  d3.json('../json/scatterplot-dataset.json', function (dataset) {
    scatterplotDataset = dataset
    chart.updateData(scatterplotDataset, true, false, false, false) // (dataset, move, zoom, search, hover, company)
    chart2.updateData(scatterplotDataset, true, false, false, false)
  })
})()
