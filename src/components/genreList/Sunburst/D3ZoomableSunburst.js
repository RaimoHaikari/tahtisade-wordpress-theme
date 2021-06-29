import * as d3 from "d3";

/*
 * Zoomable Sunburst
 * https://observablehq.com/@d3/zoomable-sunburst?collection=@observablehq/data-visualization-for-developers
 */
export const D3ZoomableSunburst = () => {

    let svg;
    let gElem;

    let data;

    let width = 200;
    let height = 200;
    let margin = {top: 10, right: 10, bottom: 10, left: 10};

    let updateData;
    let updateHeight;
    let updateWidth;

    let arc;

    // Breadcrumb dimensions: width, height, spacing, width of tip/tail.
    var b = {
        w: 75, h: 30, s: 3, t: 10
    };

    let color;
    let label;
    let parent;
    let path;
    let radius;

    let root;


    function chart(selection){

        const arcVisible = (d) => {
            return d.y1 <= 3 && d.y0 >= 1 && d.x1 > d.x0;
        }

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


        const clicked = (event, p) => {

            parent.datum(p.parent || root);

            root.each(d => d.target = {
                x0: Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
                x1: Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
                y0: Math.max(0, d.y0 - p.depth),
                y1: Math.max(0, d.y1 - p.depth)
            });

            const t = gElem.transition().duration(750);

            // Transition the data on all arcs, even the ones that aren’t visible,
            // so that if this transition is interrupted, entering arcs will start
            // the next transition from the desired position.
            path
                .transition(t)
                .tween("data", d => {
                    const i = d3.interpolate(d.current, d.target);
                    return t => d.current = i(t);
                })
                .filter(function(d) {
                    return +this.getAttribute("fill-opacity") || arcVisible(d.target);
                })
                .attr("fill-opacity", d => arcVisible(d.target) ? (d.children ? 0.6 : 0.4) : 0)
                .attrTween("d", d => () => arc(d.current));

                
            label
                .filter(function(d) {
                    return +this.getAttribute("fill-opacity") || labelVisible(d.target);
                })
                .transition(t)
                .attr("fill-opacity", d => +labelVisible(d.target))
                .attrTween("transform", d => () => labelTransform(d.current));
                
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

            root = partition(data);
            root.each(d => d.current = d);

radius = width / 6

            arc = d3
                .arc()
                .startAngle(d => d.x0)
                .endAngle(d => d.x1)
                .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
                .padRadius(radius * 1.5)
                .innerRadius(d => d.y0 * radius)
                .outerRadius(d => Math.max(d.y0 * radius, d.y1 * radius - 1))

            color = d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, data.children.length + 1))

        }

        const labelVisible = (d) => {
            return d.y1 <= 3 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03;
        }

        const labelTransform = (d) => {
            const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
            const y = (d.y0 + d.y1) / 2 * radius;
            return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
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
            path
                .selectAll("path")
                .on("mouseover", null);

        }

        // Fade all but the current sequence, and show it in the breadcrumb trail.
        const mouseover = (event, d) => {

            let msgString = `${d.value}`;

            var sequenceArray = d.ancestors().reverse();
            sequenceArray.shift(); // remove root node from the array
            updateBreadcrumbs(sequenceArray, msgString);

        }

        const partition = data => {
			
            // Find the root node of our data, and begin sizing process.
            const root = d3
                .hierarchy(data)
                .sum(d => d.size)
                .sort((a, b) => b.value - a.value);
                
            return d3.partition()
                .size([2 * Math.PI, root.height + 1])
                (root);

        }

        const render = () => {

            path = gElem
                .append("g")
                .selectAll("path")
                .data(root.descendants().slice(1))
                .join("path")
                    .attr("fill", d => { 

                        //while (d.depth > 1) 
                        //    d = d.parent; 

                        return color(d.data.name); 
                    })
                    .attr("fill-opacity", d => arcVisible(d.current) ? (d.children ? 0.6 : 0.4) : 0)
                    .attr("d", d => arc(d.current));

            path
                .filter(d => d.children)
                .style("cursor", "pointer")
                .on("click", clicked)
                .on("mouseover", mouseover);

            
            // Add the mouseleave handler to the bounding circle.
            //gElem
                //.on("mouseleave", mouseleave);
                

            /*
            path
                .append("title")
                .text(d => `${d.ancestors().map(d => d.data.name).reverse().join("/")}\n${format(d.value)}`);
            */
					
            label = gElem
                .append("g")
                    .attr("pointer-events", "none")
                    .attr("text-anchor", "middle")
                    .style("user-select", "none")
                .selectAll("text")
                .data(root.descendants().slice(1))
                .join("text")
                    .attr("dy", "0.35em")
                    .attr("fill-opacity", d => +labelVisible(d.current))
                    .attr("transform", d => labelTransform(d.current))
                .text(d => d.data.name);
					
            parent = gElem
                .append("circle")
                .datum(root)
                    .attr("r", radius)
                    .attr("fill", "none")
                    .attr("pointer-events", "all")
                .on("click", clicked);

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
            let entering = trail
                .enter()
                .append("svg:g");
        

            entering
                .append("svg:polygon")
                    .attr("points", breadcrumbPoints)
                    .attr("fill", d => {
                        return d.parent !== null ? color(d.data.name): 'null'
                    })
        
            entering
                .append("svg:text")
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
            d3
                .select("#trail")
                .select("#endlabel")
                    .attr("x", (nodeArray.length + 0.5) * (b.w + b.s))
                    .attr("y", b.h / 2)
                    .attr("dy", "0.35em")
                    .attr("text-anchor", "middle")
                .text(percentageString);
        
            // Make the breadcrumb trail visible, if it's hidden.
            d3
                .select("#trail")
                .style("visibility", "");
                

        }

        /*
         *
         */
        selection.each(function(){

            initVars();

            initializeBreadcrumbTrail();

console.log(root)


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