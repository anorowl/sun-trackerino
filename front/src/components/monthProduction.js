import { connect } from "react-redux"
import PropTypes from "prop-types";
import Layout from "./layout";
import React from "react";

import * as actions from "../actions/monthProduction";
import MonthSelect from "./ui/monthselect";
import Heatmap from "./charts/heatmap";

const monthFormat = Intl.DateTimeFormat("fr", {
    month: "long",
    year: "numeric",
})

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
            loading,
            error,
            data,
            setYear,
            setMonth,
            fetchData,
        } = this.props;

        const monthData = data.filter(d => (d._id.month - 1) === month);

        return <article className="dash energy-balance">
            <header>
                Graphe de production sur {monthFormat.format(new Date(year, month))}
            </header>
            <nav>
                <div className="control">
                    <label htmlFor="year">Année</label>
                    <input
                        type="number"
                        name="year"
                        value={year}
                        onChange={e => setYear(parseInt(e.target.value))} />
                </div>

                <button style={{marginRight: "1.5em"}} onClick={() => fetchData(year)}>Charger</button>

                <div className="control">
                    <label htmlFor="month">Mois</label>
                    <MonthSelect value={month} onChange={m => setMonth(m)} />
                </div>
            </nav>
            {
                loading ?
                <h2>Chargement...</h2>
                : <Heatmap cold="white" hot="#ffad33" width={220} height={140} data={monthData} className="heatmap"/>
            }
            {
                error &&
                <h2 className="error">{error}</h2>
            }
        </article>;
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