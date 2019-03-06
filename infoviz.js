$( document ).ready(function() {
    console.log( "ready!" );
    bar_chart();
    area_chart("GRAND LARCENY");
    one_line_chart();
    first_line_chart();
    final_line_chart();
});

function final_line_chart(){
      d3.csv('yearwiseboroughcrimerate.csv', function(error, data) {
    data.forEach(function (d) {
        d.year = +d.year;
        d.variableA = +d.variableA;
        d.variableB = +d.variableB;
        d.variableC = +d.variableC;
        d.variableD = +d.variableD;
        d.variableE = +d.variableE;
    });

    var chart = makeLineChart(data, 'year', {
        'STATEN ISLAND': {column: 'variableA'},
        'QUEENS': {column: 'variableB'},
        'MANHATTAN': {column: 'variableC'},
        'BROOKLYN': {column: 'variableD'},
        'BRONX': {column: 'variableE'}
    }, {xAxis: 'Years', yAxis: 'Crimerate'});
    chart.bind("#chart-line2");
    chart.render();

});
}

function first_line_chart(){

  d3.csv('yearwiseboroughcrimecsv.csv', function(error, data) {
    data.forEach(function (d) {
        d.year = +d.year;
        d.variableA = +d.variableA;
        d.variableB = +d.variableB;
        d.variableC = +d.variableC;
        d.variableD = +d.variableD;
        d.variableE = +d.variableE;
    });

    var chart = makeLineChart(data, 'year', {
        'STATEN ISLAND': {column: 'variableA'},
        'QUEENS': {column: 'variableB'},
        'MANHATTAN': {column: 'variableC'},
        'BROOKLYN': {column: 'variableD'},
        'BRONX': {column: 'variableE'}
    }, {xAxis: 'Years', yAxis: 'Number of Records'});
    chart.bind("#chart-line1");
    chart.render();

});

}

function one_line_chart(){
d3.csv('linedata.csv', function(error, data) {
    data.forEach(function (d) {
        d.year = +d.year;
        d.variableA = +d.variableA;
    });

    var chart = makeLineChart(data, 'year', {
        'Total Number of Crimes': {column: 'variableA'}
    }, {xAxis: 'Years', yAxis: 'Number of Records'});
    chart.bind("#chart-line");
    chart.render();

});
}
function bar_chart(){
var margin = {top: 40, right: 20, bottom: 30, left: 60},
    width = 560 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

var formatPercent = d3.format("");

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(formatPercent);

var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>Records:</strong> <span style='color:white'>" + d.frequency + "</span>";
  })

var svg = d3.select("#bar_div").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.call(tip);

d3.tsv("typesbar.csv", type, function(error, data) {
  x.domain(data.map(function(d) { return d.letter; }));
  y.domain([0, d3.max(data, function(d) { return d.frequency; })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Records");

  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar"+" "+"clickmodal")
      .attr("value", function(d) { return d.letter; })
      .attr("x", function(d) { return x(d.letter)+5; })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.frequency); })
      .attr("height", function(d) { return height - y(d.frequency); })
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)
      .on('click', function(){open_Modal(this);})
});

function type(d) {
  d.frequency = +d.frequency;
  return d;
}
}

function area_chart(file_name){

  var y = d3.selectAll("#chart-container")['0']['0'].childNodes;
console.log("area"+y);
  d3.selectAll(y).remove();

          var margin = {top: 10, right: 40, bottom: 150, left: 60},
        width = 640 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom,
        contextHeight = 50;
        contextWidth = width * .5;
              
        var svg = d3.select("#chart-container").append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", (height + margin.top + margin.bottom));
        var filename =  file_name+'.csv';               
        d3.csv(filename, createChart);
            
        function createChart(data){
            var countries = [];
            var charts = [];
            var maxDataPoint = 0;
              
            /* Loop through first row and get each country 
                and push it into an array to use later */
            for (var prop in data[0]) {
                if (data[0].hasOwnProperty(prop)) {
                    if (prop != 'Year') {
                        countries.push(prop);
                    }
                }
            };
              
            var countriesCount = countries.length;
            var startYear = data[0].Year;
            var endYear = data[data.length - 1].Year;
            var chartHeight = height * (1 / countriesCount);
              
            /* Let's make sure these are all numbers, 
                we don't want javaScript thinking it's text 
              
                Let's also figure out the maximum data point
                We'll use this later to set the Y-Axis scale
            */
          data.forEach(function(d) {
            for (var prop in d) {
              if (d.hasOwnProperty(prop) && prop!="Year") {
                d[prop] = parseFloat(d[prop]);
                
                if (d[prop] > maxDataPoint) {
                  maxDataPoint = d[prop];
                }
              }
              // console.log(maxDataPoint);
            }
            // console.log(countries);
            // D3 needs a date object, let's convert it just one time
            d.Year = new Date(d.Year,0,1);
          });
          
          for(var i = 0; i < countriesCount; i++){
            charts.push(new Chart({
                                  data: data.slice(),
                                  id: i,
                                  name: countries[i],
                                  width: width,
                                  height: height * (1 / countriesCount),
                                  maxDataPoint: maxDataPoint,
                                  svg: svg,
                                  margin: margin,
                                  showBottomAxis: (i == countries.length - 1)
                                }));
            
          }
          
          /* Let's create the context brush that will 
              let us zoom and pan the chart */
          var contextXScale = d3.time.scale()
                                .range([0, contextWidth])
                                .domain(charts[0].xScale.domain()); 
          
          var contextAxis = d3.svg.axis()
                                  .scale(contextXScale)
                                  .tickSize(contextHeight)
                                  .tickPadding(-10)
                                  .orient("bottom");
          
          var contextArea = d3.svg.area()
                                  .interpolate("monotone")
                                  .x(function(d) { return contextXScale(d.date); })
                                  .y0(contextHeight)
                                  .y1(0);
          
          var brush = d3.svg.brush()
                            .x(contextXScale)
                            .on("brush", onBrush);
          
          var context = svg.append("g")
                            .attr("class","context")
                            .attr("transform", "translate(" + (margin.left + width * .25) + "," + (height + margin.top + chartHeight - 10) + ")");
          
          context.append("g")
                            .attr("class", "x axis top")
                            .attr("transform", "translate(0,0)")
                            .call(contextAxis)
                            
          context.append("g")
                            .attr("class", "x brush")
                            .call(brush)
                            .selectAll("rect")
                              .attr("y", 0)
                              .attr("height", contextHeight);
          
          context.append("text")
                    .attr("class","instructions")
                    .attr("transform", "translate(0," + (contextHeight + 20) + ")")
                    .text('Click and drag above to zoom / pan the data');
                    
          function onBrush(){
            /* this will return a date range to pass into the chart object */
            var b = brush.empty() ? contextXScale.domain() : brush.extent();
            for(var i = 0; i < countriesCount; i++){
              charts[i].showOnly(b);
            }
          }
          }
          
          function Chart(options){
          this.chartData = options.data;
          this.width = options.width;
          this.height = options.height;
          this.maxDataPoint = options.maxDataPoint;
          this.svg = options.svg;
          this.id = options.id;
          this.name = options.name;
          this.margin = options.margin;
          this.showBottomAxis = options.showBottomAxis;
          
          var localName = this.name;
          
          /* XScale is time based */
          this.xScale = d3.time.scale()
                                .range([0, this.width])
                                .domain(d3.extent(this.chartData.map(function(d) { return d.Year; })));
          
          /* YScale is linear based on the maxData Point we found earlier */
          this.yScale = d3.scale.linear()
                                .range([this.height,0])
                                .domain([0,this.maxDataPoint]);
          var xS = this.xScale;
          var yS = this.yScale;
          
          /* 
            This is what creates the chart.
            There are a number of interpolation options. 
            'basis' smooths it the most, however, when working with a lot of data, this will slow it down 
          */
          this.area = d3.svg.area()
                                .interpolate("basis")
                                .x(function(d) { return xS(d.Year); })
                                .y0(this.height)
                                .y1(function(d) { return yS(d[localName]); });
          /*
            This isn't required - it simply creates a mask. If this wasn't here,
            when we zoom/panned, we'd see the chart go off to the left under the y-axis 
          */
          this.svg.append("defs").append("clipPath")
                                  .attr("id", "clip-" + this.id)
                                  .append("rect")
                                    .attr("width", this.width)
                                    .attr("height", this.height);
          /*
            Assign it a class so we can assign a fill color
            And position it on the page
          */
          this.chartContainer = svg.append("g")
                                    .attr('class',this.name.toLowerCase())
                                    .attr("transform", "translate(" + this.margin.left + "," + (this.margin.top + (this.height * this.id) + (10 * this.id)) + ")");
          
          /* We've created everything, let's actually add it to the page */
          this.chartContainer.append("path")
                              .data([this.chartData])
                              .attr("class", "chart")
                              .attr("clip-path", "url(#clip-" + this.id + ")")
                              .attr("d", this.area);
                          
          this.xAxisTop = d3.svg.axis().scale(this.xScale).orient("bottom");
          this.xAxisBottom = d3.svg.axis().scale(this.xScale).orient("top");
          /* We only want a top axis if it's the first country */
          if(this.id == 0){
            this.chartContainer.append("g")
                  .attr("class", "x axis top")
                  .attr("transform", "translate(0,0)")
                  .call(this.xAxisTop);
          }
          
          /* Only want a bottom axis on the last country */
          if(this.showBottomAxis){
              this.chartContainer.append("g")
                  .attr("class", "x axis bottom")
                  .attr("transform", "translate(0," + this.height + ")")
                  .call(this.xAxisBottom);
            }  
            
          this.yAxis = d3.svg.axis().scale(this.yScale).orient("left").ticks(5);
            
          this.chartContainer.append("g")
                              .attr("class", "y axis")
                              .attr("transform", "translate(-15,0)")
                              .call(this.yAxis);
                              
          this.chartContainer.append("text")
                              .attr("class","country-title")
                              .attr("transform", "translate(15,30)")
                              .text(this.name);
          
          }
          
          Chart.prototype.showOnly = function(b){
            this.xScale.domain(b);
            this.chartContainer.select("path").data([this.chartData]).attr("d", this.area);
            this.chartContainer.select(".x.axis.top").call(this.xAxisTop);
            this.chartContainer.select(".x.axis.bottom").call(this.xAxisBottom);
          }
}

  function open_Modal(ele){
    
    console.log($(ele)["0"].attributes[1].nodeValue);
    area_chart($(ele)["0"].attributes[1].nodeValue);
    var text_edit = "Examination of number of records for "+$(ele)["0"].attributes[1].nodeValue;
    $('#boroughid').text(text_edit);
    // $('#myModal').modal('show');
}