import React from "react";

import EnergyBalance from "./energyBalance";
import MonthProduction from "./monthProduction";
import Layout from "./layout";

export default function Dashboard() {
    return <article className="dashboard">
        <EnergyBalance/>
        <MonthProduction/>
    </article>;
}