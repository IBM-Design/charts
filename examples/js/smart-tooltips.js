/* global d3 */
(function () {
  var element = d3.select('.smart-tooltips-container')
  var colors = ['#9772B1', '#F9D35B', '#8ED3C8']
  var width = 800
  var height = 450
  var clicked = false
  var classExplanation = {
    'class-de': {
      title: 'Exclude',
      description: 'Exclude item from the visualization.',
    },
    'class-bt': {
      title: 'Keep',
      description: 'Keep item in the visualization.',
    },
    'class-u': {
      title: 'Go up',
      description: 'Aggregate items according to higher level categorization.',
    },
    'class-d': {
      title: 'Go down',
      description: 'Break down item according to lower categorization.',
    },
    'class-b': {
      title: 'Benchmark',
      description: 'Set this item as a benchmark within the visualization.',
    },
    'class-c': {
      title: 'Compare',
      description: 'Compare item with others showing full data set distribution.',
    },
    'class-h': {
      title: 'Highlight',
      description: 'Make this item recognizable within the visualization.',
    },
  }

  var svg = element
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('class', 'smart-tolltips')

  svg
    .selectAll('line')
    .data([100, 200, 300, 399])
    .enter()
    .append('line')
    .attr('x1', 0)
    .attr('y1', function (d, i) { return d})
    .attr('x2', width)
    .attr('y2', function (d, i) { return d})
    .attr('stroke', '#A9C1E5')

  svg
    .selectAll('rect')
    .data([90, 180, 70])
    .enter()
    .append('rect')
    .attr('width', 60)
    .attr('height', function (d, i) { return d})
    .attr('x', function (d, i) {
      return 220 + i * 150
    })
    .attr('y', function (d, i) {
      return height - d - 50
    })
    .attr('fill', function (d, i) {
      return colors[i]
    })
    .attr('opacity', function (d, i) {
      return i === 1 ? 1 : 0.3
    })
    .attr('cursor', function (d, i) {
      return i === 1 ? 'pointer' : 'default'
    })
    .on('click', function (d, i) {
      if (i === 1) {
        if (clicked) {
          d3.select('.hoverable-menu-el-container')
            .style('display', 'none')
          d3.select('.initial')
            .style('display', 'none')
          d3.select('.clicked')
              .style('display', 'block')
        } else {
          d3.select('.hoverable-menu-el-container')
            .style('display', 'flex')

          d3.select('.initial')
            .style('display', 'block')
          d3.select('.clicked')
            .style('display', 'none')
        }
        d3.selectAll('.hoverable-menu-rect-el')
          .style('opacity', 0)
        clicked = !clicked
      }
    })
    .on('mouseover', function (d, i) {
      if (i === 1) {
        d3.select(this).attr('fill', '#eec200')
        if (!clicked) {
          d3.selectAll('.hoverable-menu-rect-el')
            .style('opacity', 1)
        }
      }
    })
    .on('mouseout', function (d, i) {
      d3.select(this).attr('fill', colors[i])
      d3.selectAll('.hoverable-menu-rect-el')
        .style('opacity', 0)
    })

  svg
    .selectAll('text')
    .data(['Clothes', 'Electronic', 'Health'])
    .enter()
    .append('text')
    .attr('dx', function (d, i) {
      return 250 + i * 150
    })
    .attr('dy', function (d, i) {
      return height - 10
    })
    .text(function (d, i) {
      return d
    })
    .attr('font-size', '14px')
    .attr('text-anchor', 'middle')
    .attr('fill', function (d, i) {
      return '#5f92cd'
    })
    .attr('opacity', function (d, i) {
      return i === 1 ? 1 : 0.3
    })

  d3.selectAll('.hoverable-menu-el')
      .on('mouseover', function () {
        var type = d3.select(this).attr('type')
        var x = d3.select(this).node().offsetLeft + 170

        svg
          .append('rect')
          .attr('width', 100)
          .attr('height', 30)
          .attr('class', 'smart-tooltips-rect')
          .attr('fill', '#464646')
          .attr('x', x)
          .attr('y', 80)

        svg
          .append('text')
          .attr('class', 'smart-tooltips-text')
          .attr('dx', x + 50)
          .attr('dy', 100)
          .attr('fill', 'white')
          .style('font-size', '14px')
          .attr('text-anchor', 'middle')
          .text(function (d) {
            return classExplanation[type].title
          })

        d3.select('.smart-tooltips-explanation')
          .html(classExplanation[type].description)

        svg.select('.smart-tooltips-placeholder')
          .style('display', 'none')

        d3.select(this)
          .selectAll('path')
          .style('fill', '#F0605B')
      })
      .on('mouseout', function () {
        svg.selectAll('.smart-tooltips-rect')
          .remove()

        svg.selectAll('.smart-tooltips-text')
          .remove()

        d3.select('.smart-tooltips-explanation')
          .html('')

        d3.select(this)
          .selectAll('path')
          .style('fill', '#706F6F')
      })
})()
