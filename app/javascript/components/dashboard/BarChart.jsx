import React from 'react'
import * as d3 from 'd3';
import { useD3 } from '../../src/hooks/useD3';

const BarChart = ({ chart_data }) => {
  const height = 450;
  const width = 1100;
  const margin = { top: 20, right: 30, bottom: 30, left: 40 };

  const x = d3
    .scaleBand()
    .domain(chart_data.map((d) => d.month))
    .rangeRound([margin.left, width - margin.right])
    .padding(0.4);

  const y1 = d3
    .scaleLinear()
    .domain([0, d3.max(chart_data, (d) => d.expenditure)])
    .rangeRound([height - margin.bottom, margin.top]);

  const ref = useD3(
    (svg) => {
      const xAxis = (g) =>
        g.attr("transform", `translate(0,${height - margin.bottom})`).call(
          d3
            .axisBottom(x)
        );

      const y1Axis = (g) =>
        g
          .attr("transform", `translate(${margin.left},0)`)
          .style("color", "steelblue")
          .call(d3.axisLeft(y1).ticks(null, "s"))
          .call((g) => g.select(".domain").remove())
          .call((g) =>
            g
              .append("text")
              .attr("x", -margin.left)
              .attr("y", 10)
              .attr("fill", "currentColor")
              .attr("text-anchor", "start")
              .text(chart_data.y1)
          );

      svg.select(".x-axis").call(xAxis);
      svg.select(".y-axis").call(y1Axis);

      svg
        .select(".plot-area")
        .attr("fill", "steelblue")
        .selectAll(".bar")
        .data(chart_data)
        .join("rect")
        .attr("class", "bar")
        .attr("x", (d) => x(d.month))
        .attr("width", x.bandwidth())
        .attr("y", (d) => y1(d.expenditure))
        .attr("height", (d) => y1(0) - y1(d.expenditure))
        .on('mouseover', onMouseOver)
        .on("mouseout", onMouseOut);
    },
    [chart_data.length]
  );

  const onMouseOver = (e, d) => {
    d3.select(e.target)
      .transition()
      .duration(400)
      .attr('fill', 'orange')
      .attr('width', x.bandwidth() + 15)
      .attr("y", () => y1(d.expenditure) - 10)
      .attr("height", () => height - y1(d.expenditure) - 20);
    
    d3.select(e.target.parentNode)
      .append('text')
      .attr('class', 'val') 
      .attr("x", () => x(d.month))
      .attr("y", () => y1(d.expenditure) - 15)
      .text(() => d.expenditure);
  }

  const onMouseOut = (e, d) => {
    d3.select(e.target)
      .attr("fill", "steelblue")
      .attr('class', 'bar')
      .transition()
      .duration(400)
      .attr('width', x.bandwidth())
      .attr("y", () => y1(d.expenditure))
      .attr("height", () => y1(0) - y1(d.expenditure));
    
    d3.selectAll('.val')
      .remove()
  }

  return (
    <svg
      ref={ref}
      style={{
        height: 500,
        width: "100%",
        marginRight: "0px",
        marginLeft: "0px",
      }}
    >
      <g className="plot-area" />
      <g className="x-axis" />
      <g className="y-axis" />
    </svg>
  );
}

export default BarChart
