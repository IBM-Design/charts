'use strict'
class Radar {

  constructor(graphNode, data){
    this.data = this.formatData(data)
    this.target = d3.select(graphNode)

    this.scale;
    this.line;
    this.axis = {}

    this.cfg = (()=>{
      let w = 500,
          h = w,
          numAxis = data[0].length,
          margin = {top: 20, right: 20, bottom: 20, left: 20},
          r = w / 2 - margin.top - margin.bottom;

      return {
        w: w,
        h: h,
        r: r,
        margin: margin,
        levels: 5,
        max: null, // will be determined by data
        labelFactor: 60,  // how much further outside the radius does the label appears
        wrapWidth: null, // word wrap after this number of pixels
        opacityArea: 0.4,
        strokeWidth: 2,
        color: 'blue',
        numAxis: numAxis,
        angleSlice: Math.PI * 2 / numAxis, // angle of slice in radians
        shape: 'circle', //circle, polygon, square,
        dotSize: 4, //if not set, dots will not be drawn.
        axisStyle: {
          'stroke': 'black',
          'stroke-width': 1,
        }
      }
    })()
  }


  draw(){

  }

  scalesAndLinesFunctions(){
    let that = this
    this.cfg.max = d3.max(d3.merge(this.data), d => d.value)
    this.scale = d3.scaleLinear()
                      .domain([0, this.cfg.max])
                      .range([0, this.cfg.r])

    this.line =  d3.radialLine()
                      .angle((d, i)=>{ return -(i * that.cfg.angleSlice) + Math.PI / 2;})
                      .radius((d)=>{ return that.scale(d.value)})

  }

  setupRadar(){
    this.target.style({
      width: this.cfg.w,
      height: this.cfg.h,
    })

    this.axis.names = data[0].map( el => el.axis)
    this.axis.length = this.axis.names.length


    //puts 0,0 in the center of the svg
    this.globalGroup = this.target.append('g').attrs({
      'class': 'chart',
      'transform': `translate(${this.cfg.w/2} ${this.cfg.h/2})`
    })

    // draws the axis
    if(this.cfg.axisStyle){
      this.axisGroup = this.globalGroup.append('g').attr('class','axis-lines')
      this.axisGroup.selectAll('.axis-line').data(this.axis.names).enter().append('line')
             .attrs({
               'x1': 0,
               'y1': 0,
               // `+ Math.PI/2 to make the Axis line up with the correct Data`
               'x2': (d,i)=>{ return this.scale(this.cfg.max * 1.1) * Math.cos( this.cfg.angleSlice*i + Math.PI/2)},
               'y2': (d,i)=>{ return this.scale(this.cfg.max * 1.1) * Math.sin( this.cfg.angleSlice*i + Math.PI/2)},
               'class': 'axis-line',
             }).styles(this.cfg.axisStyle)
    }

    if(this.cfg.shape == 'circle'){
      //draw rings
      let ringInterval = this.cfg.max / this.cfg.levels
      var ringRadiusValues = d3.range(ringInterval, this.cfg.max+1, ringInterval).reverse() //add 1 so you include the MAX
      console.log(ringRadiusValues)
      let g = this.globalGroup.append('g').attr('class', 'grid-circle')
      g.selectAll('.level').data(ringRadiusValues).enter().append('circle').attrs({
        'fill': 'none',
        'cx': 0,
        'cy': 0,
        'class': 'label',
        'r': (d) => {return this.scale(d)},
        'stroke': 'black',
        'stroke-width': 1,
        'stroke-dasharray': '1 3',
        'opacity': 0.5
      })

      g.selectAll('.axis-label').data(ringRadiusValues).enter().append('text').attrs({
        'class': 'axis-label',
        'x': '0',
        'y': (d) =>  {return  -this.scale(d)},
        'dy': '-0.3em',
        'dx': '0.5em',
        'font-size': '0.8em',
        'fill': 'grey',
      }).text((d) => {return d+'%'})

      //text indicating % for each level
    } else if(this.cfg.shape == 'polygon'){
      //TODO
    } else if(this.cfg.shape =='square'){
      //TODO
    }
  }

  //customize this function to fit data model you want
  formatData(data){
    data.map((d)=>{
      d.map((v)=>{
        v.value  = Math.round(v.value*100)
      })
    })
    return data
  }
}


let a;
function test(data){
  a = new Radar('svg', data)
  a.scalesAndLinesFunctions()
  a.target.attrs({
    width: a.cfg.w,
    height: a.cfg.h
  })
  a.setupRadar()

  let g = a.globalGroup.append('g').attr('class', 'lines')
        g.append('path')
                  .datum(data[1])
                  .attrs({
                    'stroke-width': 1.5,
                    'fill': 'red',
                    'opacity': 1,
                    'd' : a.line,
                    'class': 'iphone'
                  })
        g.append('path')
                  .datum(data[2])
                  .attrs({
                    'stroke-width': 1.5,
                    'fill': 'blue',
                    'opacity': 1,
                    'd' : a.line
                  })
        g.append('path')
                  .datum(data[0])
                  .attrs({
                    'stroke-width': 1.5,
                    'fill': 'green',
                    'opacity': 1,
                    'd' : a.line,
                    'class': 'iphone'
                  })
}


test(data)