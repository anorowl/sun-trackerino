import React from "react";
import Layout from "./layout";
import TimeSeries from "./charts/time_series";

export default class TestPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <Layout>
            <TimeSeries
                width="500"
                height="400"
                strokeWidth="3"
                className="time-series" />
        </Layout>;
    }
}