(function () {

const width = 250,
      height = 200,
      grey = '#F6F6F6',
      pink = '#AE8DC2',
      teal = '#41D6C3';

let treeMapContainer = d3.select('.treemap')
                        .append('svg')
                        .attr('width', width)
                        .attr('height', height)
                        .attr("fill", grey)
                        .append('g');

let MapContainer = d3.select('.map')
                     .append('svg')
                     .attr('width', width)
                     .attr('height', height)
                     .attr("fill", grey)
                     .append('g');

const projection = d3.geoAlbersUsa()
                       .translate([width/2, height/2])
                       .scale([350]);

const path = d3.geoPath().projection(projection);

// Load Data    

d3.queue()
  .defer(d3.json, "../json/treemap-data.json")
  .defer(d3.json, "../json/us-states.json")
  .await(render);

function render(err, treeMapData, mapData) {
  
  if(err) throw err;

  // Tree Map

  let treeRoot = d3.hierarchy(treeMapData, (d) => d.children)
      .sum((d) => d.value); 

  let treemap = d3.treemap(treeRoot)
      .size([width, height])
      .round(true); 

  treemap(treeRoot)  

  let nodes = treeRoot.descendants();
    
  treeMapContainer.selectAll('rect')
                    .data(nodes)
                    .enter().append('rect')
                    .attr("x", (d) => d.x0)
                    .attr("y", (d) => d.y0)
                    .attr("width", (d) => d.x1 - d.x0)
                    .attr("height", (d) => d.y1 - d.y0)
                    .attr("class", (d) => d.data.name)
                    .attr("stroke", grey)
                    .attr("stroke-width", 2)
                    .attr("fill", pink)                
                    .on('mouseenter', function (d) {
                      d3.selectAll("path." + d.data.name)
                      .transition()
                      .duration(200)
                      .ease(d3.easeLinear)   
                      .attr('fill', teal);
                    })
                    .on('mouseleave', function (d) {
                      d3.selectAll("path." + d.data.name)
                      .transition()
                      .duration(200)
                      .ease(d3.easeLinear)   
                      .attr('fill', pink);
                    }); 

  // US map

    let states = MapContainer.selectAll("path")
      .data(mapData.features)
      .enter().append("path")
      .attr('class', (d)=> d.properties.name )
      .attr("d", path)
      .attr("stroke", grey)
      .attr("stroke-width", 1)
      .attr('fill', pink)
      .on('mouseenter', function (d) {
        d3.selectAll("rect." + d.properties.name)
        .transition()
        .duration(200)
        .ease(d3.easeLinear)   
        .attr('fill', teal);
      })
      .on('mouseleave', function (d) {
        d3.selectAll("rect." + d.properties.name)
        .transition()
        .duration(200)
        .ease(d3.easeLinear) 
        .attr('fill', pink);
      });

}

})()


