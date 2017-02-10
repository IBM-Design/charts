'use strict'
class Radar {

  constructor(graphNode, data, opts){
    this.data = this.formatData(data)
    this.target = d3.select(graphNode)

    this.scale;
    this.line;
    this.color = d3.scaleOrdinal()
        .range(opts.colors)
    this.axis = {}

    this.cfg = (()=>{
      let w = opts.size || 500,
          h = w,
          numAxis = data[0].length,
          margin = opts.margins,
          r = w / 2 - d3.max([margin.top + margin.bottom, margin.right + margin.left]);

      return {
        w: w,
        h: h,
        r: r,
        margin: margin,
        units: opts.units,
        levels: opts.levels,
        max: null, // will be determined by data
        labelFactor: opts.labelFactor,  // how much further outside the radius does the label appears
        wrapWidth: opts.wrapWidth || 60, // word wrap after this number of pixels
        opacityArea: opts.opacityArea,
        strokeWidth: 2,
        numAxis: numAxis,
        angleSlice: Math.PI * 2 / numAxis, // angle of slice in radians
        shape: opts.shape || 'circle', //circle, polygon, square,
        dotSize: 4, //if not set, dots will not be drawn.
        axisStyle: {
          'stroke': 'black',
          'stroke-width': 1,
        }
      }
    })()
  } // constructor


  draw(){
    //setup
    this.scalesAndLinesFunctions()
    this.wrapper = this.setupRadar()

    //draw blobs & dots
    var blobs = this.wrapper.append('g').attr('class','blobs')
    for(let i = 0; i < data.length; i++){
      //blob
       let g = blobs.append('g').attr('class','blob-'+i)
       g.append('path').datum(data[i]).attrs({
          'stroke-width': 1.5,
          'd' : a.line,
          'fill': () => { return this.color(i)}
        })
       //dots
       g.selectAll('.dot').data(data[i]).enter().append('circle').attrs({
          'stroke-width': 1.5,
          'cx': (d,i) => {  return this.scale( d.value) * Math.sin(this.cfg.angleSlice * i + Math.PI/2)},
          'cy': (d,i) => { return this.scale( d.value) * Math.cos(this.cfg.angleSlice * i +  Math.PI/2)},
          'r': this.cfg.dotSize,
          'fill': () => { return this.color(i)},
          'opacity': 0.4,
          'class': 'dot',
       })
    }


  }//draw

  scalesAndLinesFunctions(){
    let that = this
    this.cfg.max = d3.max(d3.merge(this.data), d => d.value)
    this.scale = d3.scaleLinear()
                      .domain([0, this.cfg.max])
                      .range([0, this.cfg.r])

    this.line =  d3.radialLine()
                      .angle((d, i)=>{ return -(i * that.cfg.angleSlice) + Math.PI / 2;})
                      .radius((d)=>{ return that.scale(d.value)})

  }//scalesAndLinesFunctions

  setupRadar(){
    this.target.styles({
      width: this.cfg.w,
      height: this.cfg.h,
    })
    let globalGroup = this.target.append('g').attrs({
      'class': 'chart',
      'transform': `translate(${this.cfg.w/2} ${this.cfg.h/2})`
    })

    this.axis.names = data[0].map( el => el.axis)
    this.axis.length = this.axis.names.length


    //puts 0,0 in the center of the svg


    // draws the axis
    if(this.cfg.axisStyle){
      this.axisGroup = globalGroup.append('g').attr('class','axis-lines')
      this.axisGroup.selectAll('.axis-line').data(this.axis.names).enter().append('line')
             .attrs({
               'x1': 0,
               'y1': 0,
               // `+ Math.PI/2 to make the Axis line up with the correct Data`
               'x2': (d,i)=>{ return this.scale(this.cfg.max * 1.05) * Math.sin( this.cfg.angleSlice*i + Math.PI/2)},
               'y2': (d,i)=>{ return this.scale(this.cfg.max * 1.05) * Math.cos( this.cfg.angleSlice*i + Math.PI/2)},
               'opacity': 0.3,
               'class': 'axis-line',
             }).styles(this.cfg.axisStyle)
    }

    if(this.cfg.shape == 'circle'){
      //draw rings
      let ringInterval = this.cfg.max / this.cfg.levels
      var ringRadiusValues = d3.range(ringInterval, this.cfg.max+1, ringInterval).reverse() //add 1 so you include the MAX

      let g = globalGroup.append('g').attr('class', 'grid-circle')
      g.append('g').attr('class', 'rings')
            .selectAll('.ring').data(ringRadiusValues)
            .enter().append('circle').attrs({
              'fill': 'none',
              'cx': 0,
              'cy': 0,
              'class': 'label',
              'r': (d) => {return this.scale(d)},
              'stroke': 'black',
              'stroke-width': 1,
              'stroke-dasharray': '1 3',
              'opacity': 0.5,
              'class': 'ring'
            })

      //add the unit labels on the rings
      g.append('g').attr('class', 'rings-labels')
            .selectAll('.ring-label').data(ringRadiusValues)
            .enter().append('text').attrs({
              'class': 'ring-label',
              'x': '0',
              'y': (d) =>  {return  -this.scale(d)},
              'dy': '-0.3em',
              'dx': '0.5em',
              'font-size': '0.8em',
              'fill': 'grey',
              'opacity': 0.4
            })
            .text((d) => {return d + this.cfg.units})
      g.append('g').attr('class', 'legend')
            .selectAll('.axis-label').data(data[0]).enter().append('text').attrs({
              'class': 'axis-label',
              'x': (d,i) => { return (this.scale(this.cfg.max) * 1.05 + this.cfg.labelFactor ) * Math.sin(this.cfg.angleSlice * i + Math.PI/2)},
              'y': (d,i) => { return (this.scale(this.cfg.max) * 1.05 + this.cfg.labelFactor ) * Math.cos(this.cfg.angleSlice * i + Math.PI/2)},
              'font-size': '0.8em',
              'fill': 'grey',
              'opacity': 0.4,
              'text-anchor': 'middle',
            })
            .text((d)=>{return d.axis})
            .call(this.wrap, this.cfg.wrapWidth)




    } else if(this.cfg.shape == 'polygon'){
      //TODO
    } else if(this.cfg.shape =='square'){
      //TODO
    }
    return globalGroup
  }//setupRadar

  //customize this function to fit data model you want
  formatData(data){
    data.map((d)=>{
      d.map((v)=>{
        v.value  = Math.round(v.value*100)
      })
    })
    return data
  } // formatData


  //Taken from http://bl.ocks.org/mbostock/7555321
  //Wraps SVG text
  wrap(text, width) {
    text.each(function() {
        var text = d3.select(this),
          words = text.text().split(/\s+/).reverse(),
          word,
          line = [],
          lineNumber = 0,
          lineHeight = 1.4, // ems
          y = text.attr("y"),
          x = text.attr("x"),
          dy = parseFloat(text.attr("dy")) || 0,
          tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");

        while (word = words.pop()) {
          line.push(word);
          tspan.text(line.join(" "));
          if (tspan.node().getComputedTextLength() > width) {
          line.pop();
          tspan.text(line.join(" "));
          line = [word];
          tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
          }
        }
        });
  }//wrap
}


let a;
function test(data){
  a = new Radar('svg', data, {
    size: 800,
    margins: {top: 70, right: 70, bottom: 70, left: 70},
    colors: ["#EDC951","#CC333F","#00A0B0"],
    units: '%',
    levels: 5,
    opacityArea: 0.4,
    labelFactor: 50,
    shape: 'circle',
    wrapWidth: 60
  })
  a.draw()
}


test(data)