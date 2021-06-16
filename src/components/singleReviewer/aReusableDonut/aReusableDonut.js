/*
 * A static, reusable donut chart for D3.js v4.
 * https://bl.ocks.org/mbhall88/b2504f8f3e384de4ff2b9dfa60f325e2
 */

import {arc, format, interpolate, pie, scaleOrdinal, schemeAccent, select, selectAll} from "d3";

class ReusableD3Donut {

    containerEl;
    props;
    svg;

    colour = scaleOrdinal(schemeAccent); // colour scheme
    floatFormat = format('.4r');
    percentFormat = format(',.2%');

    margin = {top: 10, right: 10, bottom: 10, left: 10};

    aPie;
    anArc;
    outerArc;
    radius;

    path;

        // function to calculate the tween for an arc's transition.
    // see http://bl.ocks.org/mbostock/5100636 for a thorough explanation.
    arcTween = (d)=> {
        const {anArc} = this;

        var i = interpolate(this._current, d);
        this._current = i(0);
        return function(t) { return anArc(i(t)); };
    }

    /*
     * calculate the points for the polyline to pass through
     */
    calculatePoints = (d) => {

        const {radius} = this;
        const {anArc, midAngle, outerArc} = this;
        
        // see label transform function for explanations of these three lines.
        var pos = outerArc.centroid(d);
        pos[0] = radius * 0.95 * (midAngle(d) < Math.PI ? 1 : -1);
        return [anArc.centroid(d), outerArc.centroid(d), pos]
    }

    // Find the element in data0 that joins the lowest following element in data1.
    findFollowing = (i, data0, data1, key) => {

        var n = data1.length, m = data0.length;

        while (++i < n) {
            var k = key(data1[i]);
            for (var j = 0; j < m; ++j) {
                if (key(data0[j]) === k) return data0[j];
            }
        }

    }

    findNeighborArc = (i, data0, data1, key) =>  {

        const {findPreceding, findFollowing,} = this;

        let d;

        return (d = findPreceding(i, data0, data1, key)) ? {startAngle: d.startAngle, endAngle: d.endAngle}
            : (d = findFollowing(i, data0, data1, key)) ? {startAngle: d.startAngle, endAngle: d.endAngle}
                : null;
    }


    /*
     * Find the element in data0 that joins the highest preceding element in data1.
     */
    findPreceding = (i, data0, data1, key) => {

        var m = data0.length;
        while (--i >= 0) {
            var k = key(data1[i]);
            for (var j = 0; j < m; ++j) {
                if (key(data0[j]) === k) return data0[j];
            }
        }
    }

    /*
     * T Ä N N E   J Ä Ä T I I N
     */ 
    key = (d) => {
        const {category} = this.props;
        return d.data[category];
    }

    
    labelTransform = (d) => {

        const {radius} = this;
        const {midAngle, outerArc} = this;

        // effectively computes the centre of the slice.
        // see https://github.com/d3/d3-shape/blob/master/README.md#arc_centroid
        var pos = outerArc.centroid(d);

        // changes the point to be on left or right depending on where label is.
        pos[0] = radius * 0.95 * (midAngle(d) < Math.PI ? 1 : -1);
        return 'translate(' + pos + ')';
    }

    /*
	 * Calculates the angle for the middle of a slice
	 */
	midAngle = (d) => {
		return d.startAngle + (d.endAngle - d.startAngle) / 2;
    }

	/*
	 * function that creates and adds the tool tip to a selected element
	 */
	toolTip = (selection) => {
		
        const {colour, radius, svg, toolTipHTML} = this;
        const {category} = this.props;

		// add tooltip (svg circle element) when mouse enters label or slice
		selection.on('mouseenter', function (data) {
			
			svg.append('text')
				.attr('class', 'toolCircle')
				.attr('dy', -15) // hard-coded. can adjust this to adjust text vertical alignment in tooltip
				.html(toolTipHTML(data)) // add text to the circle.
				.style('font-size', '.9em')
				.style('text-anchor', 'middle'); // centres text in tooltip

			svg.append('circle')
				.attr('class', 'toolCircle')
				.attr('r', radius * 0.55) // radius of tooltip circle
				.style('fill', colour(data.data[category])) // colour based on category mouse is over
				.style('fill-opacity', 0.35);
				

		});

		// remove the tooltip when mouse leaves the slice/label
		selection.on('mouseout', function () {
			selectAll('.toolCircle').remove();
		});
	}


	/*
	 * function to create the HTML string for the tool tip. Loops through each key in data object
	 * and returns the html string key: value
	 */
	toolTipHTML = (data) => {
		
		const {percentFormat} = this;

		var tip = '',
			i   = 0;

		for (var key in data.data) {

			// if value is a number, format it as a percentage
			var value = (!isNaN(parseFloat(data.data[key]))) ? percentFormat(data.data[key]) : data.data[key];

			// leave off 'dy' attr for first tspan so the 'dy' attr on text element works. The 'dy' attr on
			// tspan effectively imitates a line break.
			if (i === 0) tip += '<tspan x="0">' + key + ': ' + value + '</tspan>';
			else tip += '<tspan x="0" dy="1.2em">' + key + ': ' + value + '</tspan>';
			i++;
		}

		return tip;
    }

    updateData = (updatedData) => {

        console.log("............... updateData  ..................")
        
        const {aPie, anArc, arcTween, colour, findNeighborArc, key, path} = this;
        const {category, transTime} = this.props;

        let updatePath = select('.slices').selectAll('path');
        let updateLines = select('.lines').selectAll('polyline');
        let updateLabels = select('.labelName').selectAll('text');

        let data0 = path.data(); // store the current data before updating to the new
        let data1 = aPie(updatedData);


        /*
         * update data attached to the slices, labels, and polylines. the key function assigns the data to
         * the correct element, rather than in order of how the data appears. This means that if a category
         * already exists in the chart, it will have its data updated rather than removed and re-added.
         */
        updatePath = updatePath.data(data1, key);
        //updateLines = updateLines.data(data1, key);
        //updateLabels = updateLabels.data(data1, key);

        /*
         * adds new slices/lines/labels
         */
        updatePath.enter().append('path')
            .each(function(d, i) { 
                const x = findNeighborArc(i, data0, data1, key) || d;
                this._current = x
             })
            .attr('fill', function(d,i) { 
                return colour(d.data[category]);
            })
            .attr('d', anArc);
        
        
        /*
         * animates the transition from old angle to new angle for slices/lines/labels
         */
        updatePath.transition().duration(transTime)
            .attrTween('d', function(d,i) {
                return arcTween(d)
            });
        

    }
    
    updateLabelText = (d) => {
       
        const {percentFormat} = this;
        const {variable, category} = this.props;

        return d.data[category] + ': <tspan>' + percentFormat(d.data[variable]) + '</tspan>';

    }


    constructor(containerEl, props) {

        console.log(" ......... -  A L U S T E T A A N  - ...............");

		this.containerEl = containerEl;
        this.props = props;

        const {
            cornerRadius,
			height, 
			padAngle,
			variable,
			width
        } = props;

        const {floatFormat, margin, percentFormat} = this;
        const {drawPie} = this;

        const radius = Math.min((width + margin.left + margin.right), (height + margin.top + margin.bottom)) / 2;
        this.radius = radius;

        // creates a new pie generator
        this.aPie = pie()
            .value(function(d) { return floatFormat(d[variable]); })

        /*
		 * Contructs and arc generator. 
		 * This will be used for the donut. The difference between outer and inner
		 * radius will dictate the thickness of the donut
		 */
		this.anArc = arc()
            .outerRadius(radius * 0.8)
            .innerRadius(radius * 0.6)
            .cornerRadius(cornerRadius)
            .padAngle(padAngle);

        /*
		 * this arc is used for aligning the text labels
		 */
		this.outerArc = arc()
            .outerRadius(radius * 0.9)
            .innerRadius(radius * 0.9);
        
        /*
         * append the svg object to the selection
         */    
        this.svg = select(containerEl)
            .append('svg')
                .attr('class', 'D3-donut-svg')
                //.attr('width', width + margin.left + margin.right)
                //.attr('height', height + margin.top + margin.bottom)
				.attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
                .attr("width", "100%")
			.append('g')
                .attr('transform', `translate(${(width + margin.left + margin.right) / 2},${(height + margin.top + margin.bottom) / 2})`);
            
        /* 
		 * g elements to keep elements within svg modular
		 */
		this.svg.append('g').attr('class', 'slices');
		this.svg.append('g').attr('class', 'labelName');
        this.svg.append('g').attr('class', 'lines');
        
       drawPie();

    }

    /*
     * Tulostetaan lähtötilanne
     */ 
    drawPie = () => {

        const {
            aPie, 
            anArc,
            calculatePoints,
            colour, 
            labelTransform,
            midAngle,
            toolTip,
            updateLabelText,
            svg
        } = this;

        const {
            category,
            cornerRadius,
			data,
			height, 
			padAngle,
			variable,
			width
        } = this.props;

		/* 
         * add and colour the donut slices
  var path = svg.select('.slices')
                .selectAll('path')
                .data(pie(data))
              .enter().append('path')
                .attr('fill', function(d) { return colour(d.data[category]); })
                .attr('d', arc);

         */
		
		this.path = svg.select('.slices')
			//.datum(data)
			.selectAll('path')
			.data(aPie(data))
			.enter()
			.append('path')
                //.attr('fill', function(d) { return colour(d.data[category]); })
				.attr('fill', function(d) { 
				
					return colour(d.data[category]);
				})
                .attr('d', anArc);

		/*
		 * add text labels
		 */
        let label = svg.select('.labelName')
            .datum(data)
            .selectAll('text')
            .data(aPie)
            .enter()
            .append('text')
                .attr('dy', '.35em')
                .html(updateLabelText)
                .attr('transform', labelTransform)
                .style('text-anchor', function(d) {
                    // if slice centre is on the left, anchor text to start, otherwise anchor to end
                    return (midAngle(d)) < Math.PI ? 'start' : 'end';
                });

        /*
		 * add lines connecting labels to slice. A polyline creates straight lines connecting several points
		 */
        let polyline = svg.select('.lines')
            .datum(data)
            .selectAll('polyline')
            .data(aPie)
            .enter()
            .append('polyline')
                .attr('points', calculatePoints);

        /* 
        * add tooltip to mouse events on slices and labels
        */
        selectAll('.labelName text, .slices path').call(toolTip);

        
       
        
    }



}


export default ReusableD3Donut;