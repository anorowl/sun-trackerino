import React from "react";
import ReactDOM from "react-dom";
import moment from "moment";
import _ from "lodash";

import PropTypes from "prop-types";

import * as d3 from "d3";

import Margin from "../ui/margin";

const MARGIN = new Margin({
    left: 10,
    top: 20,
    right: 0,
    bottom: 0,
});

moment.locale("fr")

const WEEKDAYS = [
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
    "Dimanche",
];

export default class Heatmap extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.DOMNode = ReactDOM.findDOMNode(this);
    }

    renderData() {
        let {
            cold,
            hot,
            width,
            height,
            data,
        } = this.props;

        data = data.map(d => {
            const {
                year,
                month,
                day,
            } = d._id;
            return {
                ...d,
                date: moment(new Date(year, month - 1, day)),
            };
        });

        const svg = d3
            .select(this.DOMNode)
            .attr("viewBox", `0 0 ${width + MARGIN.lr} ${height + MARGIN.tb}`);

        svg
            .selectAll("*")
            .remove();

        const x = d3
            .scaleBand()
            .domain(d3.range(7))
            .range([0, width - MARGIN.lr])
            .padding(.1);

        const weekNumbers = _(data)
            .map(d => d.date.week())
            .uniq()
            .sortBy()
            .value();

        const y = d3
            .scaleBand()
            .domain(weekNumbers)
            .range([MARGIN.top, MARGIN.top + height])
            .padding(.05);

        const color = d3
            .scaleSequential(
                [0, d3.max(data, d => d.count)],
                d3.interpolateHsl(cold, hot)
            );

        const weekdaysAxis = d3
            .axisTop(x)
            .tickSize(0)
            .tickFormat(d => WEEKDAYS[d])
            .ticks(7);

        const squares = svg
            .append("g")
                .attr("tranform", `translate(${MARGIN.left}, ${MARGIN.top})`)
            .selectAll("rect")
                .data(data)
            .join("rect")
                .attr("x", d => x(d.date.weekday()))
                .attr("y", d => y(d.date.week()))
                .attr("width", x.bandwidth())
                .attr("height", y.bandwidth())
                .attr("rx", 5)
                .attr("stroke", "none")
                .attr("fill", d => color(d.count));

        svg
            .append("g")
                .attr("transform", `translate(0, ${MARGIN.top})`)
                .attr("class", "weekdays-axis")
                .call(weekdaysAxis)
                .call(g => g.selectAll(".domain").remove())
    }

    render() {
        this.renderData();
        return <svg className={this.props.className || ""}></svg>;
    }
}

Heatmap.propTypes = {
    cold: PropTypes.string.isRequired,
    hot: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    data: PropTypes.array.isRequired,
    className: PropTypes.string,
};