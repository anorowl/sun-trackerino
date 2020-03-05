import { connect } from "react-redux"
import PropTypes from "prop-types";
import Layout from "./layout";
import React from "react";

import * as actions from "../actions/monthProduction";
import MonthSelect from "../actions/ui/monthselect";

class MonthProduction extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchData(this.props.year);
    }

    render() {
        const {
            year,
            month,
            setYear,
            fetchData,
            loading,
            error,
            data,
        } = this.props;

        const dataPerMonth = data.reduce((acc, d) => {
            const month = d._id.month - 1;

            return {
                ...acc,
                [month]: [
                    ...acc[month] || [],
                    d,
                ],
            };
        }, {});

        const monthData = dataPerMonth[month] || [];

        return <Layout>
            <article className="energy-balance">
                <nav>
                    <label htmlFor="year">Année</label>
                    <input
                        type="number"
                        name="year"
                        value={year}
                        onChange={e => setYear(parseInt(e.target.value))} />

                    <label htmlFor="month">Mois</label>
                    <MonthSelect value={month} onChange={m => setMonth(m)} />

                    <button onClick={() => fetchData(year)}>Charger</button>
                </nav>
                {
                    loading ?
                    <h2>Chargement...</h2>
                    : <h2>Données pour: {month}</h2>
                }
                {
                    error &&
                    <h2 className="error">{error}</h2>
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
    month: PropTypes.number.isRequired,

    fetchData: PropTypes.func.isRequired,
    setYear: PropTypes.func.isRequired,
    setMonth: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    const {
        monthProduction: {
            data = [],
            loading = false,
            error,
            year = 2020,
            month = 0,
        } = {},
    } = state;

    return {
        data,
        error,
        loading,
        year,
        month,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchData: (year) => dispatch(actions.fetchData(year)),
        setYear: (year) => dispatch(actions.year(year)),
        setMonth: (month) => dispatch(actions.month(month)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MonthProduction);