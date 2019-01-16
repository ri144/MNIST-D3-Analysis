

var dataset = [];

for (var i = 0; i<30; i++) {
    var x = Math.random()* 20;
    var y = Math.random()* 20;
    dataset.push([x,y]); 
}


//Create SVG element
var svg = d3.select("body")
    .append("svg")
    .attr("width", 3000)
    .attr("height", 3000);

//now draw circles

var scale = d3.scale.linear();

var min = d3.min(dataset, function(d) {
    return d[0]})

var max = d3.max(dataset, function(d) {
    return d[0]})

scale.domain([min,max]);
scale.range([0,800]);


var scaleY = d3.scale.linear();

var min = d3.min(dataset, function(d) {
    return d[1]})

var max = d3.max(dataset, function(d) {
    return d[1]})

scaleY.domain([min,max]);
scaleY.range([0,500]);



var circles = svg.selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle");

circles.attr("cx", function(d, i) {
    //    return d[0] * 20 + 10;
    return scale(d[0]); 
})
    .attr("cy", function(d,i) {
	//	return d[1]*20+10;
	    return scaleY(d[1]); 
    })
    .attr("r", 5)
    .attr("fill", "yellow")
    .attr("stroke", "black"); 


