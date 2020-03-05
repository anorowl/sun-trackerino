import { connect } from "react-redux"
import PropTypes from "prop-types";
import TimeSeries from "./charts/time_series";
import Layout from "./layout";
import React from "react";

import * as actions from "../actions/energyBalance";

class EnergyBalance extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchData(this.props.start, this.props.end);
    }

    render() {
        const plots = [
            {
                accessor: d => d.production,
                color: "#ffad33",
            },
            {
                accessor: d => d.consuption,
                color: "fuchsia",
            }
        ];

        const data = this.props.data.map(d => ({...d, date: new Date(d.date)}));

        return <article className="dash energy-balance">
            <header>
                Production et Consommation
            </header>
            <nav>
                <div className="control">
                    <label htmlFor="start">Début</label>
                    <input
                        type="date"
                        name="start"
                        value={this.props.start}
                        onChange={e => this.props.setStart(e.target.value)} />
                </div>
                <div className="control">
                    <label htmlFor="end">Fin</label>
                    <input
                        type="date"
                        name="end"
                        value={this.props.end}
                        onChange={e => this.props.setEnd(e.target.value)} />
                </div>

                <button onClick={() => this.props.fetchData(this.props.start, this.props.end)}>Charger</button>
            </nav>
            {
                this.props.loading ?
                <h2>Chargement...</h2>
                : <TimeSeries data={data} plots={plots} areaPlots={[[0,1]]} width={300} height={200} strokeWidth={1.3} className="time-series" />
            }
            {
                this.props.error &&
                <h2 className="error">{this.props.error}</h2>
            }
        </article>;
    }
}

EnergyBalance.propTypes = {
    data: PropTypes.array.isRequired,
    error: PropTypes.string,
    loading: PropTypes.bool,

    start: PropTypes.string.isRequired,
    end: PropTypes.string.isRequired,

    fetchData: PropTypes.func.isRequired,
    setStart: PropTypes.func.isRequired,
    setEnd: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    const {
        energyBalance: {
            data = [],
            loading = false,
            error,
            start = "2020-01-01",
            end = "2020-03-01",
        } = {},
    } = state;

    return {
        data,
        error,
        loading,
        start,
        end,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchData: (start, end) => dispatch(actions.fetchData(start, end)),
        setStart: (start) => dispatch(actions.start(start)),
        setEnd: (end) => dispatch(actions.end(end)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EnergyBalance);