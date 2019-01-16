var svg = d3.select("body")
    .append("svg")
    .attr("width", 2000)
    .attr("height", 50);

d3.csv("mnist_2D.csv", function cb(mydata){
    
    //Question 1
    
    var mytext = svg.selectAll("text")
    .data(mydata)
    .enter()
    .append("text");
    var q1 = mytext.text( function (d) {return "Use D3 to visualize the 2D locations of each image as a circle. Use different colors for different digits (something similar to the above figure)."; })
        .attr("x", function(d) { return 20; })
        .attr("y", function(d) { return 25; })
        .attr("font-family", "sans-serif")
        .attr("font-size", "20px")
        .attr("fill", "black");
});

var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 500 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var xValue = function(d) { return d.x;}, // data -> value
    xScale = d3.scale.linear().range([0, width]), // value -> display
    xMap = function(d) { return xScale(xValue(d));}, // data -> display
    xAxis = d3.svg.axis().scale(xScale).orient("bottom");

// setup y
var yValue = function(d) { return d.y;}, // data -> value
    yScale = d3.scale.linear().range([height, 0]), // value -> display
    yMap = function(d) { return yScale(yValue(d));}, // data -> display
    yAxis = d3.svg.axis().scale(yScale).orient("left");

// setup fill color
var cValue = function(d) { return Math.floor(d[""]/100);},
    color = d3.scale.category10();

// add the graph canvas to the body of the webpage
var svg2 = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// add the tooltip area to the webpage
/*var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);*/

var rightmarg = (width + margin.left)/2;

var svg3 = d3.select("body").append("svg")
    .attr("width", 200)
    .attr("height", 200)
    .attr("id", "svg3")
    .attr("transform", "translate(" + 0 + "," + -height/2 + ")");

//var pic = svg3.append('pic').append("image");

var tooltip = d3.select("#svg3").append("div")
    .attr("class", "tooltip")
    .attr("id", "tool")
    .style("opacity", 0);

var mycanvas = 
    // d3.select('#tool')
    d3.select('body')
                      .append('canvas')
                      .attr({ width: 140,height: 300})
                      .attr("id","mycanvas");
                      //.attr("transform", "translate(" + 10 + "," + (height/2+10) + ")");
              //var canvas2 = document.getElementById("mycanvas");
console.log(mycanvas);
var ctx = mycanvas.node().getContext("2d");
ctx.translate(0,160);
ctx.fillStyle = "#FFFFFF";
ctx.font = "30px Arial";
ctx.fillRect(0,0,140,160);
ctx.translate(0,-160);
// load data
d3.csv("mnist_2D.csv", function(data) {
  d3.json("data.json", function(mydata) {

      // don't want dots overlapping axis, so add in buffer to data domain
      xScale.domain([-30, 30]);
      yScale.domain([-30, 30]);

      // x-axis
      svg2.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);

      // y-axis
      svg2.append("g")
          .attr("class", "y axis")
          .call(yAxis);

      // draw dots
      svg2.selectAll(".dot")
          .data(data)
        .enter().append("circle")
          .attr("class", "dot")
          .attr("r", 1.5)
          .attr("cx", xMap)
          .attr("cy", yMap)
          .style("fill", function(d) { return color(cValue(d));}) 
          .on("mouseover", function(d) {
              tooltip.transition()
                   .duration(200)
                   .style("opacity", .9);
              var val = Math.floor(d[""]/100);
              tooltip.html( val + "<br/> (" + xValue(d) 
                    + ", " + yValue(d) + ")")
                   .style("left", (d3.event.pageX + 5) + "px")
                   .style("top", (d3.event.pageY - 28) + "px");



                  var myarray = $.map(mydata[d[""]], function(value, index) {
                    return [value];
                  });
                  console.log(myarray);
                  ctx.clearRect(0, 0, 140, 160);
                  for(var i =0; i < 784; i++){
                      if (myarray[i] <= 128){ //threshold the grayscale at 128
                          ctx.fillStyle = "#000000";
                      }
                      else{
                          ctx.fillStyle = "#FFFFFF";
                      }
                          ctx.fillRect(5*(i%28),5*(Math.floor(i/28)),5*(i%28)+5,5*(Math.floor(i/28))+5);
                  }
                  ctx.translate(0,140);
                  ctx.fillStyle = "#FFFFFF";
                  ctx.fillRect(0,0,140,160);
                  ctx.fillStyle = "#000000";
                  ctx.translate(50,69);
                  ctx.fillText("'" + val + "'",10,10);
                  ctx.translate(-50,-209);
              })
          .on("mouseout", function(d) {
              tooltip.transition()
                   .duration(500)
                   .style("opacity", 0);
              ctx.clearRect(0, 0, 140, 160);
              ctx.translate(0,140);
              ctx.fillStyle = "#FFFFFF";
              ctx.fillRect(0,0,140,160);
              ctx.translate(0,-140);
          });
      
  // draw legend
  var legend = svg2.selectAll(".legend")
      .data(color.domain())
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  // draw legend colored rectangles
  legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);

  // draw legend text
  legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d;})
  });
});

var svg4 = d3.select("body")
    .append("svg")
    .attr("width", 2000)
    .attr("height", 50);

d3.csv("mnist_2D_pca.csv", function cb(mydata){
    
    //Question 4
    
    var mytext2 = svg4.selectAll("text")
    .data(mydata)
    .enter()
    .append("text");
    var q1 = mytext2.text( function (d) {return "Modify tsne_mnist.py to change the dimensionality reduction algorithm from t-SNE to PCA, and repeat task 2 and 3."; })
        .attr("x", function(d) { return 20; })
        .attr("y", function(d) { return 20; })
        .attr("font-family", "sans-serif")
        .attr("font-size", "20px")
        .attr("fill", "black");
});

// add the graph canvas to the body of the webpage
var svg5 = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var svg6 = d3.select("body").append("svg")
    .attr("width", 200)
    .attr("height", 200)
    .attr("id", "svg6")
    .attr("transform", "translate(" + 0 + "," + -height/2 + ")");

var tooltip2 = d3.select("#svg6").append("div")
    .attr("class", "tooltip")
    .attr("id", "tool2")
    .style("opacity", 0);

var mycanvas2 = 
    // d3.select('#tool')
    d3.select('body')
                      .append('canvas')
                      .attr({ width: 140,height: 300})
                      .attr("id","mycanvas2");
                      //.attr("transform", "translate(" + 10 + "," + (height/2+10) + ")");
              //var canvas2 = document.getElementById("mycanvas");

var ctx2 = mycanvas2.node().getContext("2d");
ctx2.translate(0,160);
ctx2.fillStyle = "#FFFFFF";
ctx2.font = "30px Arial";
ctx2.fillRect(0,0,140,160);
ctx2.translate(0,-160);
// load data
d3.csv("mnist_2D_pca.csv", function(data) {
  d3.json("data.json", function(mydata) {

      // don't want dots overlapping axis, so add in buffer to data domain
      xScale.domain([-2000, 2000]);
      yScale.domain([-2000, 2000]);

      // x-axis
      svg5.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);

      // y-axis
      svg5.append("g")
          .attr("class", "y axis")
          .call(yAxis);

      // draw dots
      svg5.selectAll(".dot")
          .data(data)
        .enter().append("circle")
          .attr("class", "dot")
          .attr("r", 1.5)
          .attr("cx", xMap)
          .attr("cy", yMap)
          .style("fill", function(d) { return color(cValue(d));}) 
          .on("mouseover", function(d) {
              tooltip.transition()
                   .duration(200)
                   .style("opacity", .9);
              var val = Math.floor(d[""]/100);
              tooltip.html( val + "<br/> (" + xValue(d) 
                    + ", " + yValue(d) + ")")
                   .style("left", (d3.event.pageX + 5) + "px")
                   .style("top", (d3.event.pageY - 28) + "px");



                  var myarray = $.map(mydata[d[""]], function(value, index) {
                    return [value];
                  });
                  console.log(myarray);
                  ctx2.clearRect(0, 0, 140, 160);
                  for(var i =0; i < 784; i++){
                      if (myarray[i] <= 128){ //threshold the grayscale at 128
                          ctx2.fillStyle = "#000000";
                      }
                      else{
                          ctx2.fillStyle = "#FFFFFF";
                      }
                          ctx2.fillRect(5*(i%28),5*(Math.floor(i/28)),5*(i%28)+5,5*(Math.floor(i/28))+5);
                  }
                  ctx2.translate(0,140);
                  ctx2.fillStyle = "#FFFFFF";
                  ctx2.fillRect(0,0,140,160);
                  ctx2.fillStyle = "#000000";
                  ctx2.translate(50,69);
                  ctx2.fillText("'" + val + "'",10,10);
                  ctx2.translate(-50,-209);
              })
          .on("mouseout", function(d) {
              tooltip.transition()
                   .duration(500)
                   .style("opacity", 0);
              ctx2.clearRect(0, 0, 140, 160);
              ctx2.translate(0,140);
              ctx2.fillStyle = "#FFFFFF";
              ctx2.fillRect(0,0,140,160);
              ctx2.translate(0,-140);
          });
      
  // draw legend
  var legend2 = svg5.selectAll(".legend")
      .data(color.domain())
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  // draw legend colored rectangles
  legend2.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);

  // draw legend text
  legend2.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d;})
  });
});

var svg7 = d3.select("body")
    .append("svg")
    .attr("width", 2000)
    .attr("height", 50);
d3.csv("mnist_2D_pca.csv", function cb(mydata){    
    var mytext = svg7.selectAll("text")
        .data(mydata)
        .enter()
        .append("text");
    var q2 = mytext.text( function (d) {return "Compare your results from task 3 and task 4, and write a brief summary of your findings."; })
        .attr("x", function(d) { return 20; })
        .attr("y", function(d) { return 25; })
        .attr("font-family", "sans-serif")
        .attr("font-size", "20px")
        .attr("fill", "black");
});
var svg8 = d3.select("body")
    .append("svg")
    .attr("width", 2000)
    .attr("height", 120);
d3.csv("mnist_2D_pca.csv", function cb(mydata){       
    var mytext2 = svg8
        .append("text");
    var q3 = mytext2.text( function (d) {return "The results are pretty clear that at 2 dimensions t-SNE outperforms PCA.  With t_SNE, There are definite pockets of values with 2, 5, & 8 being the only digits with more than one pocket, and even then,"; })
        .attr("x", function(d) { return 20; })
        .attr("y", function(d) { return 25; })
        .attr("font-family", "sans-serif")
        .attr("font-size", "16px")
        .attr("fill", "black");
    var mytext3 = svg8
        .append("text")
        .attr('dy', 16);
    var q4 = mytext3.text( function (d) {return "there are only 2 major pockets of them.  Naturally, there are outliers all around the graph, but in general t-SNE does a good job of creating space between different groupings.  PCA, on the otherhand,"; })
        .attr("x", function(d) { return 20; })
        .attr("y", function(d) { return 25; })
        .attr("font-family", "sans-serif")
        .attr("font-size", "16px")
        .attr("fill", "black"); 
    var mytext4 = svg8
        .append("text")
        .attr('dy', 32);
    var q5 = mytext4.text( function (d) {return "does an almost terrible job of separating the classes at 2 dimensions.  For example, telling the difference between a 7 & 9 is basically impossible, and 5 cannot be differentiated from anything.  In fact,"; })
        .attr("x", function(d) { return 20; })
        .attr("y", function(d) { return 25; })
        .attr("font-family", "sans-serif")
        .attr("font-size", "16px")
        .attr("fill", "black");
    var mytext5 = svg8
        .append("text")
        .attr('dy', 48);
    var q6 = mytext5.text( function (d) {return "0 & 1 might be the only classes that have a general signular area to themselves but unlike t-SNE there is no space from the other points to tell when their clusters begin.  One could say that the point"; })
        .attr("x", function(d) { return 20; })
        .attr("y", function(d) { return 25; })
        .attr("font-family", "sans-serif")
        .attr("font-size", "16px")
        .attr("fill", "black"); 
    var mytext6 = svg8
        .append("text")
        .attr('dy', 64);
    var q7 = mytext6.text( function (d) {return "distribution of PCA is much more dense over the middle which makes sense since there is no real space separating clusters of different classes.  As someone who has worked with PCA before, I am"; })
        .attr("x", function(d) { return 20; })
        .attr("y", function(d) { return 25; })
        .attr("font-family", "sans-serif")
        .attr("font-size", "16px")
        .attr("fill", "black"); 
    var mytext7 = svg8
        .append("text")
        .attr('dy', 80);
    var q6 = mytext7.text( function (d) {return "confident that at a higher dimension PCA would do a significantly better job of classifying than it currently does, but as it stands, at 2 dimensions, t-SNE is superior to PCA with this MNIST dataset."; })
        .attr("x", function(d) { return 20; })
        .attr("y", function(d) { return 25; })
        .attr("font-family", "sans-serif")
        .attr("font-size", "16px")
        .attr("fill", "black");
});
  function tabulate(data, columns) {
        var table = d3.select('body').append('table')
        var thead = table.append('thead')
        var	tbody = table.append('tbody');

        // append the header row
        thead.append('tr')
          .selectAll('th')
          .data(columns).enter()
          .append('th')
          .text(function (column) { return column; });

        // create a row for each object in the data
        var rows = tbody.selectAll('tr')
          .data(data)
          .enter()
          .append('tr');

        // create a cell in each row for each column
        var cells = rows.selectAll('td')
          .data(function (row) {
            return columns.map(function (column) {
              return {column: column, value: row[column]};
            });
          })
          .enter()
          .append('td')
            .text(function (d) { 
                if ( isNaN((d.value*100).toFixed(1)) ){
                    return d.value;
                }
                else{
                    return (d.value*100).toFixed(1); 
                }
            });
      return table;
    }