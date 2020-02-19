import React from "react";
import ReactDOM from "react-dom";

import PropTypes from "prop-types";

import * as d3 from "d3";

const MARGIN = {
    left: 33,
    top: 10,
    right: 0,
    bottom: 75,
};

const DEFAULT_STROKE_WIDTH = 2;

function randomData() {
    const data = [];

    const baseDate = new Date(2020, 2, 1).valueOf();

    let start = Math.random();
    for (let i = 0; i < 90; i++) {
        start += Math.random() * 0.2 - 0.1;
        data.push({
            date: new Date(baseDate + i * (24 * 3.6e6)),
            value: start,
        });
    }

    return data;
}

export default class TimeSeries extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const svg = d3
            .select(ReactDOM.findDOMNode(this))
            .attr("viewBox", `0 0 ${this.props.width} ${this.props.height}`)

        const data = randomData();

        const x = d3
            .scaleTime()
            .domain(d3.extent(data, d => d.date))
            .range([0, this.props.width - MARGIN.left])

        let y = d3
            .scaleLinear()
            .domain(d3.extent(data, d => d.value))
            .range([this.props.height - MARGIN.bottom, MARGIN.top])

        // Fonction de dessin de la courbe
        // map les points de données dans le plan
        // avec les scales.
        const line = d3.line()
            .curve(d3.curveBasis)
            .defined(d => !isNaN(d.value))
            .x(d => x(d.date))
            .y(d => y(d.value))

        const plot = svg
            .append("g")
            .attr("transform", `translate(${MARGIN.left}, ${MARGIN.top})`)

        const xAxis = g => g
            .attr("transform", `translate(0,${this.props.height - MARGIN.bottom})`)
            .call(d3.axisBottom(x).ticks(10).tickSizeOuter(0))
            .selectAll("text")
            .attr("transform", "translate(13,25) rotate(90)")

        const yAxis = g => g
            .call(d3
                .axisLeft(y)
                .ticks(5)
                .tickSizeOuter(0))

        // Dessin de la courbe
        plot.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", this.props.strokeWidth || DEFAULT_STROKE_WIDTH)
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("d", line)

        plot.append("g").call(xAxis)
        plot.append("g").call(yAxis)
    }

    render() {
        return <svg className={this.props.className || ""}></svg>;
    }
}

TimeSeries.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    data: PropTypes.array.isRequired,
    strokeWidth: PropTypes.number,
    className: PropTypes.string,
};