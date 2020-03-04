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

const DEFAULT_STROKE_WIDTH = 1;

export default class TimeSeries extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.DOMNode = ReactDOM.findDOMNode(this);
    }

    renderData() {
        const {
            width,
            height,
            data,
            plots,
            strokeWidth = DEFAULT_STROKE_WIDTH,
        } = this.props;

        const allValues = plots.reduce((arr, item) => [
                ...arr,
                ...data.map(item.accessor),
            ],
            [],
        );

        const svg = d3
            .select(this.DOMNode)
            .attr("viewBox", `0 0 ${width} ${height}`);

        svg
            .selectAll("*")
            .remove();

        const x = d3
            .scaleUtc()
            .domain(d3.extent(data, d => d.date))
            .range([0, width - MARGIN.left]);

        let y = d3
            .scaleLinear()
            .domain([0, d3.max(allValues)])
            .range([height - MARGIN.bottom, MARGIN.top])

        const plotContainer = svg
            .append("g")
            .attr("transform", `translate(${MARGIN.left}, ${MARGIN.top})`);

        const xAxis = g => g
            .attr("transform", `translate(0,${height - MARGIN.bottom})`)
            .call(d3.axisBottom(x).ticks(10).tickSizeOuter(0))
            .selectAll("text")
            .attr("transform", "translate(13,25) rotate(90)");

        const yAxis = g => g
            .call(d3
                .axisLeft(y)
                .ticks(5)
                .tickSizeOuter(0));


        plots.forEach(p => {
            // Fonction de dessin de la courbe
            // map les points de données dans le plan
            // avec les scales.
            const line = d3
                .line()
                .curve(d3.curveBasis)
                .defined(d => !isNaN(p.accessor(d)))
                .x(d => x(d.date))
                .y(d => y(p.accessor(d)));
            
            // Dessin de la courbe
            plotContainer
                .append("path")
                .datum(data)
                .attr("fill", "none")
                .attr("stroke", p.color)
                .attr("stroke-width", strokeWidth)
                .attr("stroke-linejoin", "round")
                .attr("stroke-linecap", "round")
                .attr("d", line);
        });

        plotContainer.append("g").call(xAxis);
        plotContainer.append("g").call(yAxis);
    }

    render() {
        this.renderData();
        return <svg className={this.props.className || ""}></svg>;
    }
}

TimeSeries.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    data: PropTypes.array.isRequired,
    plots: PropTypes.array.isRequired,
    strokeWidth: PropTypes.number,
    className: PropTypes.string,
};