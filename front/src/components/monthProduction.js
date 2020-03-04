import { connect } from "react-redux"
import PropTypes from "prop-types";
import Layout from "./layout";
import React from "react";

import * as actions from "../actions/monthProduction";

class MonthProduction extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchData(this.props.year);
    }

    render() {
        return <Layout>
            <article className="energy-balance">
                <nav>
                    <label htmlFor="start">Année</label>
                    <input
                        type="number"
                        name="start"
                        value={this.props.year}
                        onChange={e => this.props.setYear(parseInt(e.target.value))} />

                    <button onClick={() => this.props.fetchData(this.props.year)}>Charger</button>
                </nav>
                {
                    this.props.loading ?
                    <h2>Chargement...</h2>
                    : <h2>Composant en construction.</h2>
                }
                {
                    this.props.error &&
                    <h2 className="error">{this.props.error}</h2>
                }
            </article>
        </Layout>
    }
}

MonthProduction.propTypes = {
    data: PropTypes.array.isRequired,
    error: PropTypes.string,
    loading: PropTypes.bool,

    year: PropTypes.number.isRequired,

    fetchData: PropTypes.func.isRequired,
    setYear: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    const {
        monthProduction: {
            data = [],
            loading = false,
            error,
            year = 2020,
        } = {},
    } = state;

    return {
        data,
        error,
        loading,
        year,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchData: (year) => dispatch(actions.fetchData(year)),
        setYear: (year) => dispatch(actions.year(year)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MonthProduction);