import React from "react";

import Header from "./header";
import Footer from "./footer";

export default class Layout extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <main>
            <Header />
            {this.props.children}
            <Footer />
        </main>;
    }
}