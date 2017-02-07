'use strict'
class Radar {

  constructor(graphNode, data){
    this.data = this.formatData(data)
    this.target = d3.select(graphNode)

    this.scale;
    this.line;

    this.cfg = (()=>{
      let w = 600,
          h = 600,
          numAxis = data[0].length;

      return {
        w: w,
        h: h,
        r: w / 2,
        margin: {top: 20, right: 20, bottom: 20, left: 20},
        levels: 5,
        max: null, // will be determined by data
        labelFactor: 60,  // how much further outside the radius does the label appears
        wrapWidth: null, // word wrap after this number of pixels
        opacityArea: 0.4,
        strokeWidth: 2,
        color: 'blue',
        numAxis: numAxis,
        angleSlice: Math.PI * 2 / numAxis, // angle of slice in radians
        shape: 'circle', //circle, polygon, square
      }
    })()
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

  // setupRadar(){
  //   this.target.style({
  //     width: cfg.w + cfg.margin.left + cfg.margin.right,
  //     height: cfg.h + cfg.margin.top + cfg.margin.bottom,
  //   })

  //   if(cfg.shape == 'circle'){
  //     //draw rings
  //     for(var i = 0; i < cfg.levels; i++){

  //     }

  //   } else if(cfg.shape == 'polygon'){
  //     //TODO
  //   } else if(cfg.shape =='square'){
  //     //TODO
  //   }
  // }

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
  console.log(a.cfg.max)
  console.log(a.scale(34))
  a.target.attrs({
    width: a.cfg.w,
    height: a.cfg.h
  })
  a.target.append('g').attr('transform', `translate(${a.cfg.w/2} ${a.cfg.h/2})`)
                      .append('path')
                      .datum(data[0])
                      .attrs({
                        'stroke-width': 1.5,
                        'fill': 'red',
                        'opacity': 0.4,
                        'd' : a.line
                      })
  a.target.append('g').attr('transform', `translate(${a.cfg.w/2} ${a.cfg.h/2})`)
                      .append('path')
                      .datum(data[2])
                      .attrs({
                        'stroke-width': 1.5,
                        'fill': 'blue',
                        'opacity': 0.4,
                        'd' : a.line
                      })
  a.target.append('g').attr('transform', `translate(${a.cfg.w/2} ${a.cfg.h/2})`)
                      .append('path')
                      .datum(data[1])
                      .attrs({
                        'stroke-width': 1.5,
                        'fill': 'green',
                        'opacity': 0.4,
                        'd' : a.line
                      })

}


test(data)