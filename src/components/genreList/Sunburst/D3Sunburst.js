import * as d3 from "d3";

/*
 * Sunburst Tutorial (d3 v4), Part 1
 * https://bl.ocks.org/denjn5/e1cdbbe586ac31747b4a304f8f86efa5
 * 
 * Sequences sunburst (d3 v4)
 * https://bl.ocks.org/kerryrodden/766f8f6d31f645c39f488a0befa1e3c8
 */
export const D3Sunburst = () => {

    let svg;
    let gElem;

    let data;

    let width = 200;
    let height = 200;
    let margin = {top: 10, right: 10, bottom: 10, left: 10};

    // Breadcrumb dimensions: width, height, spacing, width of tip/tail.
    var b = {
        w: 75, h: 30, s: 3, t: 10
    };

    // Mapping of step names to colors.
    var colors = {
        "home": "#5687d1",
        "product": "#7b615c",
        "search": "#de783b",
        "account": "#6ab975",
        "other": "#a173d1",
        "end": "#bbbbbb"
    };

    // Data strucure
    let partition;
    let radius;
    let color;
    
    let arc;
    let root;
    let slice;
    

    let updateData;
    let updateHeight;
    let updateWidth;


    function chart(selection){

        /* 
         * Generate a string that describes the points of a breadcrumb polygon.
         */
        const breadcrumbPoints = (d, i) => {

            var points = [];
            points.push("0,0");
            points.push(b.w + ",0");
            points.push(b.w + b.t + "," + (b.h / 2));
            points.push(b.w + "," + b.h);
            points.push("0," + b.h);

            if (i > 0) { // Leftmost breadcrumb; don't include 6th vertex.
                points.push(b.t + "," + (b.h / 2));
            }

            return points.join(" ");

        }

        const initializeBreadcrumbTrail = () => {
            // Add the svg area.
            var trail = d3
                .select("#sequence")
                .append("svg:svg")
                    .attr("width", width)
                    .attr("height", 40)
                    .attr("id", "trail");

            // Add the label at the end, for the percentage.
            trail.append("svg:text")
                .attr("id", "endlabel")
                .style("fill", "#000");
        }

        const initVars = () => {

			radius = Math.min(width, height) / 2;
            color = d3.scaleOrdinal(d3.schemeBlues[9]);

			// Data strucure
			partition = d3.partition()
                .size([2 * Math.PI, radius * 0.9]);

            // Find the root node of our data, and begin sizing process.
            root = d3
                .hierarchy(data)
                .sum(function (d) { return d.size})
                .sort(function(a, b) { return b.value - a.value; });
                
            // Liitetään mukaan solmuille lasketut sijantitiedot
            partition(root); 
        
            arc = d3.arc()
                .startAngle(function (d) { 
                    d.x0s = d.x0; // alku- ja loppukohdat muistiin animointia varte
                    return d.x0 
                })
                .endAngle(function (d) {
                    d.x1s = d.x1	
                    return d.x1 
                })
                .innerRadius(function (d) { return d.y0 })
                .outerRadius(function (d) { return d.y1 });
			            
        }

        /*
        * Restore everything to full opacity when moving off the visualization.
        */
        const mouseleave = (event) => {

            // Hide the breadcrumb trail
            d3
                .select("#trail")
                .style("visibility", "hidden");
        
            // Deactivate all segments during transition.
            slice
                .selectAll("path")
                .on("mouseover", null);

            // Transition each segment to full opacity and then reactivate it.
            slice
                .selectAll("path")
                .transition()
                .duration(200)
                .style("opacity", 1)
                .on("end", function() {
                    d3.select(this).on("mouseover", mouseover);
                });
        }

        // Fade all but the current sequence, and show it in the breadcrumb trail.
        const mouseover = (event, d) => {

            let msgString = `${d.data.name}: ${d.value}`;

            var sequenceArray = d.ancestors().reverse();
            sequenceArray.shift(); // remove root node from the array
            updateBreadcrumbs(sequenceArray, msgString);

            // Fade all the segments.
            slice
                .selectAll("path")
                .style("opacity", 0.3);

            slice
                .selectAll("path")
                .filter(function(node) {
                        return (sequenceArray.indexOf(node) >= 0);
                        })
                .style("opacity", 1);
        }

        /*
        * Update the breadcrumb trail to show the current sequence and percentage.
        */
        const updateBreadcrumbs = (nodeArray, percentageString) => {

            // Data join; key function combines name and depth (= position in sequence).
            var trail = d3.select("#trail")
                .selectAll("g")
                .data(nodeArray, function(d) { return d.data.name + d.depth; });
        
            // Remove exiting nodes.
            trail.exit().remove();
        
            // Add breadcrumb and label for entering nodes.
            var entering = trail.enter().append("svg:g");
        

            entering.append("svg:polygon")
                .attr("points", breadcrumbPoints)
        
            entering.append("svg:text")
                .attr("x", (b.w + b.t) / 2)
                .attr("y", b.h / 2)
                .attr("dy", "0.35em")
                .attr("text-anchor", "middle")
                .text(function(d) { return d.data.name; });
        
            // Merge enter and update selections; set position for all nodes.
            entering.merge(trail).attr("transform", function(d, i) {
                return "translate(" + i * (b.w + b.s) + ", 0)";
            });
        
            // Now move and update the percentage at the end.
            d3.select("#trail").select("#endlabel")
                .attr("x", (nodeArray.length + 0.5) * (b.w + b.s))
                .attr("y", b.h / 2)
                .attr("dy", "0.35em")
                .attr("text-anchor", "middle")
                .text(percentageString);
        
            // Make the breadcrumb trail visible, if it's hidden.
            d3.select("#trail")
                .style("visibility", "");

        }
  

        const render = () => {

            // Add a <g> element for each node in thd data, then append <path> elements and draw lines based on the arc
            // variable calculations. Last, color the lines and the slices.
            slice = gElem
                .selectAll('g')
                .data(root.descendants())
                .enter()
                .append('g')
                    .attr("class", "node");
                    
            slice
                .append('path')
                    .attr("display", function (d) { return d.depth ? null : "none"; })
                    .attr("d", arc)
                    .style('stroke', '#fff')
                    .style("fill", function (d) { return color((d.children ? d : d.parent).data.name); })
                    .on("mouseover", mouseover);

            // Add the mouseleave handler to the bounding circle.
            gElem
                .on("mouseleave", mouseleave);

/*
var sequenceArray = root.descendants()[7].ancestors().reverse();
sequenceArray.shift(); // remove root node from the array
updateBreadcrumbs(sequenceArray, "joo ei");
*/
    
        }

        /*
         *
         */
        selection.each(function(){

            initVars();

            initializeBreadcrumbTrail();

            svg = d3
                .select(this)
                .attr("class", "coGenreDistribution")
                .attr("viewBox", [0,0, margin.left + width + margin.right, margin.top + height + margin.bottom])

            gElem = svg
                .append('g')
                    .attr('transform', `translate(${margin.left + width/2},${margin.top + height / 2})`)

            render()



            /*
             *
             */
            updateData = function() {}

            updateHeight = function() {}
            
            updateWidth = function() {}

        })
    }

    chart.data = function(val){

        if(!arguments.length) return data;

        data = val;

        if(typeof updateData === 'function')
            updateData();
   
        return chart

    }
    chart.height = function(val){

        if(!arguments.length) return height;

        height = val;

        if(typeof updateHeight === 'function')
            updateHeight();
   
        return chart

    }

    chart.width = function(val){

        if(!arguments.length) return width;

        width = val;

        if(typeof updateWidth === 'function')
            updateWidth();
   
        return chart

    }


    return chart

}