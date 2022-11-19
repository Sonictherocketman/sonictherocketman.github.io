slug: reading-report
published: Sat, 05 Nov 2022 at 04:52 AM
updated: Sat, 19 Nov 2022 23:42:05 
title: Books & Reading Statistics
author: Brian Schrader
status: publish
hidden: true
tags: reading, books

This page tracks my current reading statistics. Charts on this page are updated semi-frequently and irregularly. All data is exported from the excellent app [Book Tracker](https://booktrack.app). For more info on the app and my recent reading, check out [this post from 2022](/archive/reading-milestones-attention-spans-and-cool-charts/). If you're interested in books I recommend, then please check out [my recommendations page](/archive/bookshelf).

This page serves partly as a cool place to show off some data as well as a way to motivate myself to read more and more consistently. Enjoy!


## Book Collection

<div style="display: flex; justify-content: space-around; align-items: stretch; gap: 1rem; text-align: center;">

    <div style="border: 1px solid #ccc; border-radius: 3px; padding: 1rem;">
        <h3 id="books-collection">?</h3>
        <b>Books in Collection</b>
    </div>

    <div style="border: 1px solid #ccc; border-radius: 3px; padding: 1rem;">
        <h3 id="books-read">?</h3>
        <b>Books Actually Read</b>
    </div>

    <div style="border: 1px solid #ccc; border-radius: 3px; padding: 1rem;">
        <h3 id="percentage">?</h3>
        <b>Percent Completion</b>
    </div>

</div>


### Books Read By Year

<div id="year-by-year" class="hide"></div>


<small id="last-updated"></small>

<script src="/bin/d3.js"></script>
<noscript>Sorry, you'll need JS enabled in order to view the cool charts I made for this page.</noscript>
<script>
(async () => {
    const r = await fetch('https://home.brianschrader.com/datasets/reading.json');
    const data = await r.json();
    const filteredDates = data.filter(d => (
        d.readingStatus === "read" && !!d.finishedReading
    )).map(d => (
        (new Date(d.finishedReading)).getFullYear()
    )).reduce((dates, date) => {
        const count = dates[date] || 0;
        dates[date] = count + 1;
        return dates;
    }, {});
    const datesRead = Object.keys(filteredDates).map(
        key => ([key, filteredDates[key]])
    );

    // Generate the Year-By-Year Chart

    const margin = {top: 15, right: 50, bottom: 40, left: 20},
        width = 650 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;

    const svg = d3.select("#year-by-year")
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

      // Add X axis --> it is a date format
      var x = d3.scaleLinear()
        .domain([ d3.min(datesRead, d => d[0]), d3.max(datesRead, d => d[0]) ])
        .range([ 0, width ]);

      // Add Y axis
      var y = d3.scaleLinear()
        .domain([0, d3.max(datesRead, (d) => d[1])])
        .range([ height, 0 ]);

      // Add the area
      svg.append("path")
        .datum(datesRead)
        .attr("fill", "#CAD9F7")
        .attr("stroke", "#4068B8")
        .attr("stroke-width", 1.5)
        .attr("d", d3.area()
          .x(function(d) { return x(d[0]) })
          .y0(y(0))
          .y1(function(d) { return y(d[1]) })
          .curve(d3.curveStep)
        );

      svg.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("y", 6)
        .attr("dy", "0em")
        .attr("transform", "rotate(-90)")
        .text("Books Read (count)");

      const xAxis = d3.axisBottom(x).ticks(null, "f");
      svg.append("g")
        .attr("transform", "translate(0, " + (height + margin.top) + ")")
        .call(xAxis);

      const yAxis = d3.axisRight(y).ticks();
      svg.append("g")
        .attr("id", "yticks")
        .attr("transform", "translate(" + (width + margin.left) +", 0)")
        .call(yAxis);

      // Unhide it.
      document.getElementById('year-by-year').className = 'histogram';

      const lastUpdated = document.querySelector('#last-updated');
      const moreRecent = data.sort((a, b) => (
        (new Date(b.finishedReading)) - (new Date(a.finishedReading))
      ))[0];
      lastUpdated.innerText = "Last Updated: " + (new Date(moreRecent.finishedReading)).toLocaleDateString();

      // Calculate stats

      const collectionSize = data.length;
      const booksRead = data.filter(book => (
        book.readingStatus === "read"
      )).length
      const percentage = Math.round(booksRead / collectionSize * 100);

      document.querySelector('#books-collection').innerText = collectionSize;
      document.querySelector('#books-read').innerText = booksRead;
      document.querySelector('#percentage').innerText = (
        percentage + '%'
      );
})()
</script>
