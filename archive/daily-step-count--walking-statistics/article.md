slug: daily-step-count--walking-statistics
published: Sat, 19 Nov 2022 at 11:40 PM
updated: Sun, 27 Nov 2022 04:42:15 
title: Daily Step Count & Walking Statistics
author: Brian Schrader
tags: fun, programming
status: publish
hidden: true



<div style="display: flex; justify-content: space-around; align-items: stretch; gap: 1rem; text-align: center;">

    <div style="border: 1px solid #ccc; border-radius: 3px; padding: 1rem;">
        <h3 id="steps">?</h3>
        <b>Average Daily Steps</b>
    </div>

    <div style="border: 1px solid #ccc; border-radius: 3px; padding: 1rem;">
        <h3 id="distance">?</h3>
        <b>Total Distance</b>
    </div>

    <div style="border: 1px solid #ccc; border-radius: 3px; padding: 1rem;">
        <h3 id="percentage">?</h3>
        <b>Percent Days Goal Met</b>
    </div>

</div>


### Daily Step Counts (Last 45 Days)

<div id="rolling-steps" class="hide"></div>

<small id="last-updated"></small>

### About This Page

This page tracks my daily step count against my goal for the previous 45 days. It also contains some summary stats about my recent average daily steps, distance, and the percent of those recent days I have met my goal.

This data is dynamic, but may be slightly out of date. Unfortunately, there is no easy way for me to get the data out of my [pedometer app][1] automatically. Instead I periodically import the data for display here.

[1]: https://pedometer.app

This data is provided entirely because I think it's interesting and it allowed me to play with D3 a bit (the charting library). I don't expect much to come of it beyond personal motivation, but that said, if you too find it interesting, then please let me know.

<script src="/bin/d3.js"></script>
<noscript>Sorry, you'll need JS enabled in order to view the cool charts I made for this page.</noscript>
<script>
(async () => {
    const r = await fetch('https://home.brianschrader.com/datasets/steps.json');
    const data = await r.json();

    const stepsByDay = data.slice(0, 100).map(d => (
        {...d, steps: parseInt(d.Steps), date: new Date(d.Date)}
    )).slice(0, 45);

    // Generate the Year-By-Year Chart

    const margin = {top: 15, right: 80, bottom: 80, left: 25},
        width = 680 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    const svg = d3.select("#rolling-steps")
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

      // Add X axis --> it is a date format
      var x = d3.scaleTime()
        .domain(d3.extent(stepsByDay, d => d.date))
        .range([ 0, width ]);

      // Add Y axis
      var y = d3.scaleLinear()
        .domain([0, d3.max(stepsByDay, (d) => d.steps)])
        .range([ height, 0 ]);

      // Add the area
      svg.append("path")
        .datum(stepsByDay)
        .attr("fill", "#CAD9F7")
        .attr("stroke", "#4068B8")
        .attr("stroke-width", 1.5)
        .attr("d", d3.area()
          .x(function(d) { return x(d.date) })
          .y0(y(0))
          .y1(function(d) { return y(d.steps) })
          .curve(d3.curveStep)
        );

      svg.append("path")
        .datum(stepsByDay)
        .attr("fill", "transparent")
        .attr("stroke", "#888")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
          .x(function(d) { return x(d.date) })
          .y(function(d) { return y(6500) })
          .curve(d3.curveStep)
        );

      svg.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("y", 6)
        .attr("dy", "0em")
        .attr("transform", "rotate(-90)")

      const xAxis = (
        d3.axisBottom(x).tickFormat(d3.timeFormat("%m/%d/%Y"))
        .tickValues(stepsByDay.map(function(d) { return d.date}) )
      );

      svg.append("g")
        .attr("transform", "translate(0, " + (height + margin.top) + ")")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)" );

      const yAxis = d3.axisRight(y).ticks(10);
      svg.append("g")
        .attr("id", "yticks")
        .attr("transform", "translate(" + (width + margin.left) +", 0)")
        .call(yAxis);

      // Unhide it.
      document.getElementById('rolling-steps').className = 'histogram';

      const lastUpdated = document.querySelector('#last-updated');
      const moreRecent = stepsByDay[0];
      lastUpdated.innerText = "Last Updated: " + moreRecent.date.toLocaleDateString();

      // Calculate stats

      const avgSteps = stepsByDay.reduce((a, b) => a+b.steps, 0) / stepsByDay.length | 0;
      const distance = stepsByDay.reduce((a, b) => a+parseFloat(b.Distance) | 0, 0);

      const daysMet = stepsByDay.filter(d => d.steps >= 6500).length;
      const percentage = Math.round(daysMet / stepsByDay.length * 100);

      document.querySelector('#steps').innerText = avgSteps.toLocaleString();
      document.querySelector('#distance').innerText = distance.toLocaleString() + ' mi';
      document.querySelector('#percentage').innerText = (
        percentage + '%'
      );
})()
</script>

