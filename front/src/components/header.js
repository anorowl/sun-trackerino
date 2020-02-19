import React from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
    return <header>
        <h1 className="site-title">Sun Trackerino</h1>
        <nav>
            <NavLink to="/data_overview" activeClassname="current-navlink">
                Data overview
            </NavLink>
            <NavLink to="/data_during_interval" activeClassname="current-navlink">
                Data by interval
            </NavLink>
            <NavLink to="/production_heatmap" activeClassname="current-navlink">
                Production Heatmap
            </NavLink>
        </nav>
    </header>;
}